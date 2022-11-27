import express from "express"
import UserController from "../controllers/userController.js"
import AuthMiddleware from "../middlewares/authMiddleware.js"

const UserRouter = express.Router()

UserRouter.post("/register", UserController.register)
UserRouter.post("/login", UserController.login)
UserRouter.get("/", AuthMiddleware.requireUser, UserController.getUserInfo)
UserRouter.post("/", AuthMiddleware.requireUser, UserController.updateUserInfo)

export default UserRouter;