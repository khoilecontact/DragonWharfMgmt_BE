import UserService from "../services/user.js";

class UserController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Vui lòng cung cấp đầy đủ thông tin.",
                    data: null
                })
            }
            
            const result = await UserService.login(email, password)
            if (result.success) {
                return res.json(result)
            } else {
                return res.status(401).json(result)
            }
        } catch (e) {
            console.log(e.stack)
            return res.status(500).json({
                success: false,
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
                data: null
            })
        }
    }

    static async register(req, res) {
        try {
            if (
                !req.body.email ||
                !req.body.password ||
                !req.body.name ||
                !req.body.phone
            ) return res.status(400).json({
                success: false,
                message: "Vui lòng cung cấp đầy đủ thông tin.",
                data: null
            })

            const result =await UserService.register(req.body) 
            if (result.success) {
                return res.json(result)
            } else {
                return res.status(400).json(result)
            }

        } catch (e) {
            console.log(e.stack);
            return res.status(500).json({
                success: false,
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
                data: null
            })
        }
    }

    static async getUserInfo(req, res) {
        try {
            const id = req.userId;
            
            const result = await UserService.getUserInfo(id);

            if (result.success) {
                return res.json(result)
            } else {
                return res.status(404).json(result)
            }
        } catch (e) {
            console.log(e.stack);
            return res.status(500).json({
                success: false,
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
                data: null
            })
        }
    }

    static async updateUserInfo(req, res) {
        try {
            const userId = req.userId;
            const data = req.body;

            const result = await UserService.updateUserInfo(userId, data);
            if (result.success) {
                return res.json(result) 
            } else {
                return res.status(400).json(result)
            }
        } catch (e) {
            console.log(e.stack);
            return res.status(500).json({
                success: false,
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
                data: null
            })
        }
    }
}

export default UserController;