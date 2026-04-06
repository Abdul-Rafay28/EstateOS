import memberShipModel from "../memberships/memberShip.model.js";
import tenantModel from "../tenants/tenant.model.js";

export const requireTenant = async (req, resp, next) => {
    try {
        const tenantId = req.headers['x-tenant-id'];
        if (!tenantId) {
            return resp.status(400).json({
                message: 'Bad Request!',
                success: false,
            })
        }

        const tenant = await tenantModel.findById(tenantId);
        if (!tenant) {
            return resp.status(404).json({
                message: 'Tenant id not found',
                success: false,
            })
        }

        if (tenant.status !== 'active') {
            return resp.status(403).json({
                message: 'Workspace InActive',
                success: false,
            })
        }

        req.tenant = tenant;

        const userId = req.userId;

        const memberShip = await memberShipModel.findOne({ tenantId: tenantId, userId: userId, status: "active" });
        if (!memberShip) {
            return resp.status(403).json({
                message: 'Workspace access denied!',
                success: false,
            })
        }

        req.memberShip = memberShip;
        next();

    } catch (err) {
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}