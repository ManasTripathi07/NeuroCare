const mongoose = require("mongoose");

// Define the Tags schema
const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: { type: String },
	courses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
		},
	],
	subcategory : [{
		type : mongoose.Schema.Types.ObjectId,
		ref : "Subcategory",
	}]
});

// Export the Tags model
module.exports = mongoose.model("Category", categorySchema);