import userModel from "../modules/user/user.model.js";
import contactModel from "./contact.model.js"

export const contactService = async ({ fullName, email, phone, tenantId }) => {

    const emailFind = await userModel.findOne({ email });
    if (emailFind) {
        const error = new Error('this contact already exist')
        error.statusCode = 403;
        throw error;
    }
    const contact = await contactModel.create({ fullName, email, phone, tenantId });
    return contact;
}

export const getContactService = async ({ tenantId }) => {
    const getContacts = await contactModel.find({ tenantId });
    return getContacts;
}