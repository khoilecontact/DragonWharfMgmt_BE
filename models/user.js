import mongoose from "mongoose"
import argon2 from "argon2"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "User email is required"],
        unique: [true, "Email is already in use"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    name: {
        type: String,
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"]
    },
    dob: {
        type: Date
    },
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        next()
    this.password = await argon2.hash(this.password)
})

userSchema.methods.matchPassword = async function (password) {
    return await argon2.verify(this.password, password)
}

const User = mongoose.model("User", userSchema)
export default User;