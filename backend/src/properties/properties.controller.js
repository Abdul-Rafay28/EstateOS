import { addPropertyService, getPropertyService, getSinglePropertyService, propertyByIdService, updatePropertyStatusService, updateSinglePropertyService } from "./properties.service.js";

export const addProperty = async (req, resp) => {
    try {
        const { title, address, listingType, price, description, ownerContactId } = req.body;
        if (!title || !address || !listingType || !price || !description || !ownerContactId) {
            return resp.status(400).json({
                message: 'All fields are requied!',
                success: false,
            })
        }
        if (listingType !== "RENT" && listingType !== "SALE") {
            return resp.status(400).json({
                message: 'Corrent your listing type',
                success: false,
            })
        }
        const tenantId = req.tenant._id;
        const userId = req.userId;

        const propertyData = await addPropertyService({ title, address, listingType, price, description, tenantId, createdBy: userId, ownerContactId });

        return resp.status(201).json({
            message: 'Add Property Successfull',
            data: propertyData,
            success: true,
        })

    } catch (err) {
        resp.status(500 || err.statusCode).json({
            message: err.message || 'Internal server error',
            success: false,
        })
    }
}

export const authCheck = async (req, resp) => {
    try {
        return resp.status(200).json({
            message: 'Welcome User!',
            success: true,
        })

    } catch (err) {
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}

export const getProperties = async (req, resp) => {
    try {

        const tenantId = req.tenant._id;
        const getPropertyData = await getPropertyService({ tenantId })

        return resp.status(200).json({
            propertyData: getPropertyData,
            success: true,
        })

    } catch (err) {
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}

export const getPropertyById = async (req, resp) => {
    try {
        const tenantId = req.tenant._id;
        const propertyId = req.params.id;

        const propertyById = await propertyByIdService({ tenantId, propertyId });

        resp.status(200).json({
            data: propertyById,
            success: true,
        })

    } catch (err) {
        resp.status(err.statusCode || 500).json({
            message: err.message || 'Internal service error',
            success: false,
        })
    }
}


export const updatePropertyStatus = async (req, resp) => {
    try {
        const tenantId = req.tenant._id;
        const propertyId = req.params.id;
        const property = await updatePropertyStatusService({ propertyId, tenantId });

        return resp.status(200).json({
            success: true,
            data: property,
        })


    } catch (err) {
        resp.status(err.statusCode || 500).json({
            message: err.message || 'Internal server error',
            success: false,
        })
    }
}

export const getSingleProperty = async (req, resp) => {
    try {
        const propertyId = req.params.id;
        const tenantId = req.tenant._id;

        const singleData = await getSinglePropertyService({ propertyId, tenantId });

        resp.status(200).json({
            data: singleData,
            success: true,
        })

    } catch (err) {
        resp.status(err.statusCode || 500).json({
            message: err.message || 'Internal server error',
            success: false,

        })
    }
}


export const updateSingleProperty = async (req, resp) => {
    try {
        const propertyId = req.params.id;
        const tenantId = req.tenant._id;
        const propertyData = req.body;
        const updateData = await updateSinglePropertyService({ propertyId, tenantId, propertyData });

        resp.status(200).json({
            message: 'Property Updated successfully',
            updateData: updateData,
            success: true,
        })


    } catch (err) {
        resp.status(err.statusCode || 500).json({
            message: err.message || 'Internal server error',
            success: false,
        })
    }
}