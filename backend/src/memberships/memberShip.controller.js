import { addMemberService, getMembersService } from "./membership.service.js";


export const addMember = async (req, resp) => {
    try {
        console.log(req.body)
        const memberShipRole = req.memberShip.role;
        if (memberShipRole !== "OWNER" && memberShipRole !== "ADMIN") {
            return resp.status(403).json({
                message: 'Access denied!',
                success: false,
            })
        }

        const { email, role } = req.body;
        if (!email || !role) {
            return resp.status(400).json({
                message: 'Email & role must required!',
                success: false,
            })
        }

        const cleanEmail = email.trim().toLowerCase();
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexEmail.test(cleanEmail)) {
            return resp.status(400).json({
                message: 'Invalid email format',
                success: false,
            })
        }

        const tenantId = req.tenant._id;

        const memberData = await addMemberService({ email: cleanEmail, role, tenantId });

        resp.status(201).json({
            data: memberData,
            success: true,
            message: 'Add member in workspace successfully!'
        })

    } catch (err) {
        resp.status(500 || err.statusCode).json({
            message: err.message || 'Internal server error',
            success: false,
        })
    }
}

export const getMembers = async (req, resp) => {
    try {
        const tenantId = req.tenant._id;
        const getData = await getMembersService({ tenantId });

        resp.status(200).json({
            memberData: getData,
            success: true,
        })


    } catch (err) {
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}