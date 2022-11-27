import mongoose from "mongoose"
import argon2 from "argon2"
import jwt from "jsonwebtoken"

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "User email is required"],
        unique: [true, "Email is already in use"],
        validate: [validateEmail, "Invalid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    name: {
        type: String,
        required: [true, "Name is required"]
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

userSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, process.env.SECRET_TOKEN, {
      expiresIn: process.env.EXPIRE_TOKEN,
    });
};

userSchema.methods.getRefreshToken = function () {
    return jwt.sign({ id: this._id }, process.env.SECRET_TOKEN_REFRESH, {
      expiresIn: process.env.EXPIRE_REFRESH_TOKEN,
    });
};

userSchema.methods.verifyRefreshToken = function (refreshToken) {
    return jwt.verify(refreshToken, process.env.SECRET_TOKEN_REFRESH);
}

const User = mongoose.model("User", userSchema)
export default User;