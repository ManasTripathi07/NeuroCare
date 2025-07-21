const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
   
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
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
