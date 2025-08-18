const User = require("../models/User");
const Category = require("../models/Category");
const Result = require("../models/Result");
const Subcategory = require("../models/Subcategory");

exports.storeResult = async(req,res) => {
   try{
          console.log("req in result conroller", req?.body);
          const result = req?.body;
         const categoryid = await Category.findOne({ name: result?.category });

         let subcategoryid = null;
           
         if(result?.subcategory)
           subcategoryid = await Subcategory.findOne({ name: result?.subcategory });

          
         const response =  await Result.insertOne({
            category : categoryid,
            subcategory : subcategoryid,
            user : result.user,
            mistakes : result?.mistakes ?? -1,
            timeTaken : result?.timeTaken ?? "N/A",
            score : result?.score ?? -1,
         });

         const userDetails = await User.findByIdAndUpdate( result.user ,
            {
                $push : {result : response._id}
            },
            {new : true}
         );

         console.log("User Details" , userDetails);

         return res.status(200).json({
            success : true,
            message : "Results Stored SuccessFully",
         })
          


   }
   catch(error)
   {
    console.log("error in results controller" , error);
    return res.status(401).json({
        success : false,
        message : "Error in storing results of test"
    });
   }
}
