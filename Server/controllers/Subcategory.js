const Subcategory = require("../models/Subcategory")
const Category = require("../models/Category");


exports.createSubcategory = async(req,res) => {
  try{
        const data = req?.body;
        console.log("data in subcategory" , data);
        const response = await Subcategory.create({
          name : data.name ,
          description : data?.description || null

        });
        const categoryid = data?.category;
        const updatedCategory = await Category.findByIdAndUpdate(categoryid,{
          $push : {subcategory : response._id},
        },
        {new : true}
      );
      console.log("upadted Category" , updatedCategory);
      return res.status(200).json({
        success : true,
        message : "SubCategory created Successfully",
      })
  }
  catch(error)
  {
    return res.status(403).json({
      success : false,
      message : "error in creating subcategory",
      error : error
    })
  }
}