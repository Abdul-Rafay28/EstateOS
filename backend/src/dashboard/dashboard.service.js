import contactModel from "../contacts/contact.model.js"
import memberShipModel from "../memberships/memberShip.model.js"
import propertyModel from "../properties/properties.model.js"

export const getDashboardService = async ({ tenantId }) => {
    const [
        propertiesTotal,
        contactsTotal,
        membersTotal,
        availableProperties,
        soldProperties
    ] = await Promise.all([
        propertyModel.countDocuments({ tenantId }),
        contactModel.countDocuments({ tenantId }),
        memberShipModel.countDocuments({ tenantId }),
        propertyModel.countDocuments({tenantId, status: 'AVAILABLE'}),
        propertyModel.countDocuments({tenantId, status: 'SOLD'})
    ])

    return {
        propertiesTotal,
        contactsTotal, 
        membersTotal,
        availableProperties,
        soldProperties,
    }
}