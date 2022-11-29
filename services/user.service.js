import User from "../models/user.model.js"
import JWTHelper from "../helpers/jwt.helper.js";
import mongoose from "mongoose"

class UserService {
    static async login(email, password) {
        const user = await User.findOne({ email }).select("-__v");

        if (!user) return {
            success: false,
            message: "Email không tồn tại.",
            data: null
        }

        const passwordMatch = await user.matchPassword(password);

        if (!passwordMatch) return {
            success: false,
            message: "Sai mật khẩu.",
            data: null
        }

        let payload = user.toJSON()
        delete payload.password

        const accessToken = JWTHelper.getAccessToken(user._id)
        const refreshToken =  JWTHelper.getRefreshToken(user._id)

        return {
            success: true,
            message: "Đăng nhập thành công!",
            data: { ...payload, accessToken, refreshToken }
        }
    }

    static async register(userData) {
        const { email, password, name, phone, dob } = userData;

        const user = await User.create({ email, password, name, phone, dob });

        return {
            success: true,
            message: "Đăng ký thành công!",
            data: user._id
        }
    }

    static async getUserInfo(id) {
        try {
            const userInfo = await User.findById(id).select("-password")

            if (!userInfo) {
                return {
                    success: false,
                    message: "Không tìm thấy người dùng.",
                    data: null
                }
            }
    
            return {
                success: true,
                message: "Lấy thông tin người dùng thành công",
                data: userInfo
            }
        } catch (e) {
            if (e instanceof mongoose.CastError) {
                return {
                    success: false,
                    message: "Không tìm thấy người dùng.",
                    data: null
                }
            } else throw e
        }
    }

    static async updateUserInfo(id, updatedData) {
        try {
            if (updatedData.password != null || updatedData.email != null) {
                return {
                    success: false,
                    message: "Không được phép cập nhật email và mật khẩu thông qua request này!",
                    data: null
                }
            }

            delete updatedData.__v;

            const newData = await User.findByIdAndUpdate(id, updatedData, { returnDocument: "after" })

            if (!newData) {
                return {
                    success: false,
                    message: "Không tìm thấy người dùng.",
                    data: null
                }
            }

            return {
                succes: true,
                message: "Cập nhật thông tin thành công!",
                data: newData
            }
        } catch (e) {
            if (e instanceof mongoose.CastError) {
                return {
                    success: false,
                    message: "Cập nhật thất bại! Vui lòng kiểm tra lại kiểu dữ liệu của payload.",
                    data: null
                }
            } else throw e
        }
    }

    static async refreshToken(token) {
        try {
            const userId = await JWTHelper.verifyRefreshToken(token);

            const accessToken = JWTHelper.getAccessToken(userId)
            const refreshToken =  JWTHelper.getRefreshToken(userId)

            return {
                success: true,
                message: "Đã làm mới token.",
                data: { accessToken, refreshToken }
            }
        } catch(e) {
            if (e instanceof JWTHelper.JsonWebTokenError) return {
                success: false,
                message: "Refresh token không hợp lệ hoặc đã hết hạn.",
                data: null
            } 
            else throw e
        }
    }

    // Admin only
    /////////////////////////////////////////////////////////////////////////////////////////////

    static async getUserList() {
        const users = await User.find().select("-password -__v")

        return {
            success: true,
            message: "Lấy danh sách người dùng thành công!",
            data: users
        }
    }

    static async getUserById(userId) {
        try {
            const user = await User.findById(userId).select("-password -__v")
    
            if (!user) return {
                success: false,
                message: "Không tìm thấy người dùng.",
                data: null
            }
    
            return {
                success: true,
                message: "Lấy dữ liệu người dùng thành công!",
                data: user
            }
        } catch(e) {
            if (e instanceof mongoose.CastError) return {
                success: false,
                message: "ID không hợp lệ.",
                data: null
            }
            throw e
        }
    }
}

export default UserService;