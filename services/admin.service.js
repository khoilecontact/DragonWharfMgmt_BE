import Admin from "../models/admin.model.js"
import JWTHelper from "../helpers/jwt.helper.js";

class AdminService {
    static async login(username, password) {
        const admin = await Admin.findOne({ username });

        if (!admin) return {
            success: false,
            message: "Username không tồn tại.",
            data: null
        }

        const passwordMatch = admin.matchPassword(password)
        if (!passwordMatch) return {
            success: false,
            message: "Sai mật khẩu.",
            data: null
        }

        const accessToken = JWTHelper.getAdminAccessToken(admin._id)
        return {
            success: true,
            message: "Đăng nhập thành công!",
            data: { accessToken }
        }
    }

    static async createAdminAccount(username, password) {
        await Admin.create({ username, password });
        return {
            success: true,
            message: "Tạo tài khoản admin thành công!",
            data: null
        }
    }
}

export default AdminService;