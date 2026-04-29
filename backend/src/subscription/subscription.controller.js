import { planService } from "./subscription.service.js";


export const upGradePlan = async (req, resp) => {
    try {
        const tenantId = req.tenant._id
        const { plan, billingCycle } = req.body;
        if (!plan || !billingCycle) {
            return resp.status(400).json({
                message: 'All fields are required',
                success: false,
            })
        }

        const planData = await planService({ tenantId, plan, billingCycle });

        resp.status(200).json({
            message: 'Subscription Sucessfully Upgrade',
            success: true,
        })

    } catch (err) {
        resp.status(err.statusCode || 500).json({
            message: err.message || 'Internal server error',
            success: false,
        })
    }
}