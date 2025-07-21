const User = require("../models/User");
const Category = require("../models/Category");
const Result = require("../models/Result");

exports.storeResult = async(req,res) => {
   try{
          console.log("req in result conroller", req?.body);
          const result = req?.body;
         const categoryid = await Category.findOne({ name: "Trail Test" });

          
         const response =  await Result.create({
            category : categoryid,
            user : result.user,
            mistakes : result.mistakes || -1,
            timeTaken : result.timeTaken || "N/A",
            score : result.score || 0,
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
