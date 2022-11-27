import mongoose from "mongoose"

const tourSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"]
    },
    people: {
        type: Number,
        required: [true, "Number of people is required"]
    },
    guider: {
        type: String,
        required: [true, "Name of guider is required"]
    },
    note: {
        type: String
    },
    fee: {
        type: Number,
        required: [true, "Tour fee is required"]
    }
})

const Tour = mongoose.model("Tour", tourSchema)
export default Tour;