import JWTHelper from "../helpers/jwt.helper.js";

class AuthMiddleware {
    static async requireUser(req, res, next) {
        var authHeader = req.headers.authorization;

        if (!authHeader || authHeader.split(' ')[0] !== 'Bearer') return res.status(401).json({
            success: false,
            message: "Thiếu token!",
            data: null
        })

        var token = authHeader.split(' ')[1];
        var decodedToken = null;
        try {

            decodedToken = await JWTHelper.verifyAccessToken(token);
            if (decodedToken == null) {
                return res.status(401).json({
                    success: false,
                    message: "Xác thực thất bại.",
                    data: null
                })
            }

            req.userId = decodedToken.id
            next();
        } catch (error) {
            if (error instanceof JWTHelper.JsonWebTokenError) {                
                return res.status(401).json({
                    success: false,
                    message: "Token không hợp lệ hoặc đã hết hạn.",
                    data: null
                })
            }
            console.log(error.stack)
            return res.status(500).json({
                success: false,
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau."
            })
        }
    }

    static async requireAdmin(req, res, next) {
        var authHeader = req.headers.authorization;

        if (!authHeader || authHeader.split(' ')[0] !== 'Bearer') return res.status(401).json({
            success: false,
            message: "Thiếu token!",
            data: null
        })

        var token = authHeader.split(' ')[1];
        var decodedToken = null;
        try {

            decodedToken = await JWTHelper.verifyAdminToken(token);
            if (decodedToken == null) {
                return res.status(401).json({
                    success: false,
                    message: "Xác thực thất bại.",
                    data: null
                })
            }

            req.userId = decodedToken.id
            next();
        } catch (error) {
            if (error instanceof JWTHelper.JsonWebTokenError) {                
                return res.status(401).json({
                    success: false,
                    message: "Token không hợp lệ hoặc đã hết hạn.",
                    data: null
                })
            }
            console.log(error.stack)
            return res.status(500).json({
                success: false,
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau."
            })
        }
    }
}

export default AuthMiddleware;