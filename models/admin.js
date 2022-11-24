import mongoose from "mongoose";
import argon2 from "argon2";

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username is already taken"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
})

adminSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        next()
    this.password = await argon2.hash(this.password)
})

adminSchema.methods.matchPassword = async function (password) {
    return await argon2.verify(this.password, password)
}

const Admin = mongoose.model("Admin", adminSchema)
export default Admin