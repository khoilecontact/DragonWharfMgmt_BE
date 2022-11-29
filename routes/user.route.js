import express from "express"
import UserController from "../controllers/user.controller.js"
import AuthMiddleware from "../middlewares/auth.middleware.js"

const UserRouter = express.Router()

UserRouter.post("/register", UserController.register)
UserRouter.post("/login", UserController.login)
UserRouter.route("/")
    .get(AuthMiddleware.requireUser, UserController.getUserInfo)
    .post(AuthMiddleware.requireUser, UserController.updateUserInfo)
UserRouter.post("/refresh-token", UserController.refreshToken)
UserRouter.get("/list", AuthMiddleware.requireAdmin, UserController.getUserList)
UserRouter.get("/profile/:id", AuthMiddleware.requireAdmin, UserController.getUserById)

export default UserRouter;