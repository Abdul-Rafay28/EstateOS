import { getDashboardService } from "./dashboard.service.js";


export const getDashboard = async (req, resp) => {
    try {
        const tenantId = req.tenant._id;
        const dashboardStats = await getDashboardService({ tenantId });

        resp.status(200).json({
            success: true,
            stats: dashboardStats,
        })


    } catch (err) {
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}