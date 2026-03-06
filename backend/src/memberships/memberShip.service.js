import userModel from "../modules/user/user.model.js";
import memberShipModel from "./membership.model.js"


export const createMember = async ({ userId, tenantId, role }) => {
    const memberShip = await memberShipModel.create({ userId, tenantId, role });
    return memberShip;
}

export const addMemberService = async ({ email, role, tenantId }) => {
    const findEmail = await userModel.findOne({ email });
    if (!findEmail) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    const memberShipFind = await memberShipModel.findOne({
        userId: findEmail._id,
        tenantId: tenantId,
    });

    if (memberShipFind) {
        const error = new Error('User already a member of this workspace');
        error.statusCode = 409;
        throw error;
    }

    const createMember = await memberShipModel.create({ userId: findEmail._id, email, tenantId, role, status: "active" });

    return createMember;

}

export const getMembersService = async ({ tenantId }) => {
    const getMembers = await memberShipModel.find({
        tenantId,
        status: 'active',
        role: { $ne: 'OWNER' },
    }).populate('userId', 'name')
        .sort({ createdAt: -1 })

    return getMembers;

}