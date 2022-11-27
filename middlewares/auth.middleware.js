import jwt from "jsonwebtoken"

class AuthMiddleware {
    static async requireUser(req, res, next) {
        var authHeader = req.headers.authorization;

        if (!authHeader || authHeader.split(' ')[0] !== 'Bearer') return res.status(401).json({
            success: false,
            message: "Authorize Failed",
            data: null
        })

        var token = authHeader.split(' ')[1];
        var decodedToken = null;
        try {

            decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
            if (decodedToken == null) {
                return res.status(401).json({
                    success: false,
                    message: "Authorize Failed",
                    data: null
                })
            }

            req.userId = decodedToken.id
            next();
        } catch (error) {
            //console.log(error)
            return res.status(401).json({
                success: false,
                message: error.message,
                data: null
            })
        }
    }
}

export default AuthMiddleware;