

export const requireSubscription = async (req, resp, next) => {
    try {
        const tenant = req.tenant;
        if (tenant.expiresAt && new Date() > new Date(tenant.expiresAt)) {
            tenant.subscriptionStatus = "inactive";

            return resp.status(403).json({
                message: 'Subscription expired. Please renew.',
                type: 'Subscription_Expired',
                success: false,
            });
        }


        if (tenant.subscriptionStatus !== 'active') {
            return resp.status(403).json({
                message: 'Subscription required. Please choose a plan.',
                type: 'Subscription_Required',
                success: false,
            })
        }
        next();

    } catch (err) {
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}