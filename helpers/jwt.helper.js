import jwt from "jsonwebtoken"

class JWTHelper {
    static verifyRefreshToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.SECRET_TOKEN_REFRESH, (err, payload) => {
                if (err) return reject(err)
                const userId = payload.id
                resolve(userId)
            });
        })
    }

    static verifyAccessToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.SECRET_TOKEN, (err, payload) => {
                if (err) return reject(err)
                const userId = payload.id
                resolve(userId)
            })
        })
    }

    static verifyAdminToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.SECRET_ADMIN_TOKEN, (err, payload) => {
                if (err) return reject(err)
                const adminId = payload.id
                resolve(adminId)
            })
        })
    }

    static getAccessToken(userId) {
        return jwt.sign({ id: userId }, process.env.SECRET_TOKEN, { expiresIn: process.env.EXPIRE_TOKEN })
    }

    static getAdminAccessToken(adminId) {
        return jwt.sign({ id: adminId }, process.env.SECRET_ADMIN_TOKEN, { expiresIn: process.env.EXPIRE_TOKEN })
    }

    static getRefreshToken(userId) {
        return jwt.sign({ id: userId }, process.env.SECRET_TOKEN_REFRESH, { expiresIn: process.env.EXPIRE_REFRESH_TOKEN })
    }
}

JWTHelper.JsonWebTokenError = jwt.JsonWebTokenError

export default JWTHelper;