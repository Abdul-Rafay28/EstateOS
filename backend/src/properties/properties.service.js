import contactModel from "../contacts/contact.model.js";
import propertyModel from "./properties.model.js";

export const addPropertyService = async ({ title, address, listingType, price, description, tenantId, createdBy, ownerContactId }) => {

    const ownerFind = await contactModel.findOne({ _id: ownerContactId, tenantId: tenantId });
    if (!ownerFind) {
        const error = new Error("Contact not found")
        error.statusCode = 404;
        throw error;
    }
    const addProperty = await propertyModel.create({ title, address, listingType, price, description, tenantId, createdBy, ownerContactId: ownerFind._id });

    return addProperty;

}

export const getPropertyService = async ({ tenantId }) => {
    const getPropertyFind = await propertyModel.find({ tenantId }).select('title address listingType price status').populate('ownerContactId', 'fullName').sort({ createdAt: -1 })

    return getPropertyFind;
}

export const propertyByIdService = async ({ tenantId, propertyId }) => {
    const property = await propertyModel.findOne({ _id: propertyId, tenantId }).populate('ownerContactId', 'fullName email phone')
    if (!property) {
        const error = new Error("Property not found");
        error.statusCode = 404;
        throw error;
    }
    return property;
}

export const updatePropertyStatusService = async ({ propertyId, tenantId }) => {
    const property = await propertyModel.findOne({ _id: propertyId, tenantId })
    if (!property) {
        const error = new Error('Property not found');
        error.statusCode = 404;
        throw error;
    }

    if (property.status === "AVAILABLE") {
        property.status = "SOLD"
    } else  {
        property.status = "AVAILABLE"
    }

    await property.save();

    return property;

}

export const getSinglePropertyService = async ({ propertyId, tenantId }) => {
    const singleProperty = await propertyModel.findOne({ _id: propertyId, tenantId }).populate('ownerContactId', 'fullName phone')
    if (!singleProperty) {
        const error = new Error('Property not found');
        error.statusCode = 404;
        throw error;
    }

    return singleProperty;


}

export const updateSinglePropertyService = async ({ propertyId, tenantId, propertyData }) => {
    const updateProperty = await propertyModel.findOneAndUpdate({ _id: propertyId, tenantId }, { $set: propertyData }, { new: true });
    if (!updateProperty) {
        const error = new Error('Property not found!');
        error.statusCode = 404;
        throw error;
    }


    return updateProperty;

}