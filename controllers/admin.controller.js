import AdminService from "../services/admin.service.js";

class AdminController {
    static async createAdminAccount(req, res) {
        try {
            const { username, password } = req.body;

            if (!username || !password) return res.status(400).json({
                success: false,
                message: "Vui lòng cung cấp đầy đủ thông tin.",
                data: null
            })

            const result = await AdminService.createAdminAccount(username, password)
            if (result.success) return res.json(result)
            else return res.status(400).json(result)
        } catch(e) {
            if (e.code == 11000) return res.status(400).json({
                success: false,
                message: "Username đã tồn tại. Vui lòng chọn username khác.",
                data: null
            })
            console.log(e.stack)
            return res.status(500).json({
                success: false,
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
                data: null
            })
        }
    }

    static async login(req,res) {
        try {
            const { username, password } = req.body;

            if (!username || !password) return res.status(400).json({
                success: false,
                message: "Vui lòng cung cấp đầy đủ thông tin.",
                data: null
            })

            const result = await AdminService.login(username, password)

            if (result.success) return res.json(result)
            else return res.status(401).json(result)
        } catch (e) {
            console.log(e.stack)
            return res.status(500).json({
                success: false,
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
                data: null
            })
        }
    }
}

export default AdminController;