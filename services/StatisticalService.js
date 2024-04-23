import ResponseHandler from "../utils/ResponseHandler.js";
import sequelize from "../connect/ConnectDb.js";
import Order from "../models/entities/Order.js";
import { Op } from "sequelize";

class StatsService {
    async getMonthlyStats(res) {
        try {
            const query = `
            SELECT 
                months.month,
                COALESCE(COUNT(orders.id), 0) AS totalOrders,
                COALESCE(SUM(CASE WHEN orders.status = 2 THEN orders.total ELSE 0 END), 0) AS totalSales,
                COALESCE(SUM(CASE WHEN orders.status = 3 THEN 1 ELSE 0 END), 0) AS cancelledOrders,
                COALESCE(SUM(CASE WHEN orders.status = 1 THEN 1 ELSE 0 END), 0) AS pendingOrders
            FROM (
                SELECT 
                    'Tháng Một' AS month,
                    1 AS month_num
                UNION SELECT 'Tháng Hai', 2
                UNION SELECT 'Tháng Ba', 3
                UNION SELECT 'Tháng Tư', 4
                UNION SELECT 'Tháng Năm', 5
                UNION SELECT 'Tháng Sáu', 6
                UNION SELECT 'Tháng Bảy', 7
                UNION SELECT 'Tháng Tám', 8
                UNION SELECT 'Tháng Chín', 9
                UNION SELECT 'Tháng Mười', 10
                UNION SELECT 'Tháng Mười Một', 11
                UNION SELECT 'Tháng Mười Hai', 12
            ) AS months
            LEFT JOIN (
                SELECT 
                    MONTH(createdAt) AS month_num,
                    id,
                    total,
                    status
                FROM orders 
                WHERE YEAR(CURRENT_DATE()) = :year
            ) AS orders ON months.month_num = orders.month_num
            GROUP BY months.month;`;

            const currentDate = new Date();
            const year = currentDate.getFullYear();

            const stats = await sequelize.query(query, {
                replacements: { year },
                type: sequelize.QueryTypes.SELECT,
            });

            // Chuyển đổi giá trị null thành 0
            const modifiedStats = stats.map((stat) => ({
                ...stat,
                totalOrders: stat.totalOrders !== null ? stat.totalOrders : 0,
                totalSales: stat.totalSales !== null ? stat.totalSales : 0,
                cancelledOrders:
                    stat.cancelledOrders !== null ? stat.cancelledOrders : 0,
                pendingOrders:
                    stat.pendingOrders !== null ? stat.pendingOrders : 0,
            }));

            ResponseHandler.success(res, "Dữ liệu 12 tháng", modifiedStats);
        } catch (error) {
            console.error("Error while getting monthly stats:", error);
            throw error;
        }
    }
}

export default new StatsService();
