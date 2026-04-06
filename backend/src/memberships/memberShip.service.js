import userModel from "../modules/user/user.model.js";
import memberShipModel from "./memberShip.model.js"


export const createMember = async ({ userId, tenantId, role, email }) => {
    const memberShip = await memberShipModel.create({ userId, tenantId, role, email });
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
        role: { $ne: 'OWNER' },
    }).populate('userId', 'name')
        .sort({ createdAt: -1 })

    return getMembers;

}

export const updateMemberservice = async ({ tenantId, memberId }) => {
    const member = await memberShipModel.findOne({ _id: memberId, tenantId });
    if (!member) {
        const error = new Error('Member not found!')
        error.statusCode = 404;
        throw error;
    }

    if (member.status === 'active') {
        member.status = 'disabled'
    } else {
        member.status = 'active'
    }

    await member.save();

    return member;
}

export const editMembersService = async ({ tenantId, memberId, role }) => {
    const editMember = await memberShipModel.findOne({ _id: memberId, tenantId })
    if (!editMember) {
        const error = new Error('Member not found!');
        error.statusCode = 400;
        throw error;
    }

    const allowRoles = ['OWNER', 'ADMIN', 'AGENT', 'VIEWER'];
    if (!allowRoles.includes(role)) {
        const error = new Error('This role is not allowed!')
        error.statusCode = 400;
        throw error;
    }

    if(editMember.role === role){
        const error = new Error('This member have already this role');
        error.statusCode = 402;
        throw error;
    }

    editMember.role = role;
    await editMember.save();

    return editMember;

}


export const singleMemberService = async ({ tenantId, memberId }) => {
    const singleMember = await memberShipModel.findOne({ _id: memberId, tenantId });
    if (!singleMember) {
        const error = new Error('Member not found!');
        error.statusCode = 404;
        throw error;
    }

    const email = singleMember.email;
    const role = singleMember.role

    return { email, role }


}