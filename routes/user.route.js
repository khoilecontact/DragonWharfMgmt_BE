import express from "express"
import UserController from "../controllers/user.controller.js"
import AuthMiddleware from "../middlewares/auth.middleware.js"

const UserRouter = express.Router()

UserRouter.post("/register", UserController.register)
UserRouter.post("/login", UserController.login)
UserRouter.get("/", AuthMiddleware.requireUser, UserController.getUserInfo)
UserRouter.post("/", AuthMiddleware.requireUser, UserController.updateUserInfo)
UserRouter.post("/refresh-token", UserController.refreshToken)

export default UserRouter;