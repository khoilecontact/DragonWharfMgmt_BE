import mongoose from "mongoose"

const reportSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Sender's email is required"]
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
})

const Report = mongoose.model("Report", reportSchema)
export default Report;