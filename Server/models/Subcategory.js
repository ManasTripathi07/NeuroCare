const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
    name : {
        type : String,
    },
    description : {
        type : String,
    },

});

module.exports = new mongoose.model("Subcategory" , subcategorySchema);