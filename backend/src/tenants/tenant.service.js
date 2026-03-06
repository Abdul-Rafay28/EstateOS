import memberShipModel from "../memberships/membership.model.js";
import { createMember } from "../memberships/membership.service.js";
import tenantModel from "./tenant.model.js"


export const tenantService = async ({ name, country, userId }) => {
    const tenant = await tenantModel.create({ name, country, createdBy: userId, });
    await createMember({ userId, tenantId: tenant._id, role: 'OWNER' });
    return tenant;
}

export const getTenantsService = async ({ userId }) => {
    const memberShip = await memberShipModel.find({ userId: userId, status: 'active' });

    const tenantIdList = memberShip.map(m => m.tenantId);

    const tenants = await tenantModel.find({
        _id: { $in: tenantIdList }
    });

    return tenants;
}

