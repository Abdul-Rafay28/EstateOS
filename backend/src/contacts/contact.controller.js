import { contactService, getContactService } from "./contact.service.js";


export const createContact = async (req, resp) => {
    try {
        const { fullName, email, phone, } = req.body;
        if (!fullName || !email || !phone) {
            return resp.status(400).json({
                message: 'All fields required!',
                success: false,
            })
        }
        console.log(fullName, email, phone)
        const tenantId = req.tenant._id;
        const cleanEmail = email.trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(cleanEmail)) {
            return resp.status(400).json({
                message: 'Invalid email format',
                success: false,
            })
        }

        const resultContact = await contactService({ fullName, email: cleanEmail, phone, tenantId });
        return resp.status(201).json({
            message: 'Add contact successfully',
            contact: resultContact,
            success: true,
        })
    } catch (err) {
        resp.status(err.statusCode || 500).json({
            message: err.message || 'Internal server error',
            success: false,
        })
    }
}

export const contactsData = async (req, resp) => {
    try {
        const tenantId = req.tenant._id;
        const getContats = await getContactService({ tenantId });

        return resp.status(200).json({
            contacts: getContats,
            success: true,
        })

    } catch (err) {
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}