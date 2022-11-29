import express from "express"
import ReportController from "../controllers/report.controller.js";

const ReportRouter = express.Router()

ReportRouter.route("/")
    .post(ReportController.submitReport)
    .get(ReportController.getReports)

export default ReportRouter;