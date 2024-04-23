import StatisticalService from "../services/StatisticalService.js";
class StatisticalController {
    async getAllStatistical(req, res) {
        await StatisticalService.getMonthlyStats(res);
    }
}

export default new StatisticalController();
