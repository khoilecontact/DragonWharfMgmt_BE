import User from "../models/userModel.js"
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

        const accessToken = await user.getSignedToken()
        const refreshToken =  await user.getRefreshToken()

        return {
            success: true,
            message: "Đăng nhập thành công!",
            data: { ...payload, accessToken, refreshToken }
        }
    }

    static async register(userData) {
        const { email, password, name, phone, dob } = userData;

        const checkEmailExist = await User.exists({ email });
        if (checkEmailExist) {
            return {
                success: false,
                message: "Email đã được đăng ký. Vui lòng sử dụng email khác.",
                data: null
            }
        }

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
}

export default UserService;