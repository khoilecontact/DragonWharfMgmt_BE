import express from "express"
import AdminController from "../controllers/admin.controller.js"

const AdminRouter = express.Router()

AdminRouter.post("/login", AdminController.login)
AdminRouter.post("/create", AdminController.createAdminAccount)

export default AdminRouter;