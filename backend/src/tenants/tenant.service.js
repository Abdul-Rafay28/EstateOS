import memberShipModel from "../memberships/memberShip.model.js";
import { createMember } from "../memberships/membership.service.js";
import userModel from "../modules/user/user.model.js";
import tenantModel from "./tenant.model.js"


export const tenantService = async ({ name, country, userId }) => {
    const tenant = await tenantModel.create({ name, country, createdBy: userId, });

    const user = await userModel.findById(userId);

    await createMember({ userId, tenantId: tenant._id, role: 'OWNER', email: user.email });
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

