import ReportService from "../services/report.service.js";

class ReportController {
    static async submitReport(req, res) {
        try {
            const { email, type, content, rating } = req.body;

            const result = await ReportService.submitReport(email, type, content, rating);
            if (result.success) {
                return res.json(result)
            } else return res.status(400).json(result)
        } catch(e) {
            console.log(e.stack)
            return res.status(500).json({
                success: false,
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
                data: null
            })
        }
    }

    static async getReports(req, res) {
        try {
            const result = await ReportService.getReports();
            if (result.success) {
                return res.json(result)
            } else return res.status(400).json(result)
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

export default ReportController;