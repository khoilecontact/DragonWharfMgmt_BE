import mongoose from "mongoose"
import ValidateHepler from "../helpers/validate.helper.js";

const reportSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Sender's email is required"],
        validate: [ValidateHepler.validateEmail, "Invalid email"]
    },
    type: {
        type: String,
        enum: ["service", "employee", "tour", "facility", "other"],
        required: [true, "Type of report is required"]
    },
    content: {
        type: String,
        required: [true, "Content is required"]
    },
    rating: {
        type: Number
    }
}, { timestamps: true })

const Report = mongoose.model("Report", reportSchema)
export default Report;