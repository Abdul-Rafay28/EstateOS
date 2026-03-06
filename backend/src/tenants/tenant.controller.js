import { getTenantsService, tenantService } from "./tenant.service.js";

export const createTenant = async (req, resp) => {
    try {
        const { name, country } = req.body;
        if (!name || !country) {
            return resp.status(400).json({
                message: 'CompanyName & country must enter',
                success: false,
            })
        }

        const userId = req.userId;
        const resultTenant = await tenantService({ name, country, userId });

        resp.status(201).json({
            tenant: resultTenant,
            success: true,
        })
    } catch (err) {
        resp.status(500).json({
            message: err.message,
            success: false,
        })
    }
}

export const getTenants = async (req, resp) => {
    try {
        const userId = req.userId;
        const getTenantsData = await getTenantsService({ userId });

        resp.status(200).json({
            tenantData: getTenantsData,
            success: true,
        })
    } catch (err) {
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}


export const currentTenant = async (req, resp) => {
    try {
        const tenant = req.tenant;

        return resp.status(200).json({
            tenantData: tenant,
            success: true,
        })

    } catch (errr) {
        resp.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}