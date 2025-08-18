const mongoose = require("mongoose");
const Subcategory = require("./Subcategory");

const resultSchema = new mongoose.Schema({
   
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
    },
    subcategory : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Subcategory",
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    mistakes : {
        type : Number,
    },
    timeTaken : {
        type : String
    },
    score : {
        type : Number,
    }
});

module.exports = mongoose.model("Result", resultSchema);
