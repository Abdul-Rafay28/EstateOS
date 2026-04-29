import tenantModel from "../tenants/tenant.model.js";


export const planService = async ({ tenantId, plan, billingCycle }) => {

    const allowPlans = ['BASIC', 'PRO', 'MAX'];
    const allowBilling = ['monthly', 'yearly'];

    if (!allowPlans.includes(plan) || !allowBilling.includes(billingCycle)) {
        const error = new Error('Invalid plan or billing cycle');
        error.statusCode = 404;
        throw error;
    }

    const today = new Date();
    const expiryDate = new Date(today);

    if (billingCycle === 'monthly') {
        expiryDate.setDate(expiryDate.getDate() + 30);
    } else {
        expiryDate.setDate(expiryDate.getDate() + 365);
    }

    const tenant = await tenantModel.findByIdAndUpdate(tenantId, { subscriptionStatus: 'active', plan, billingCycle, expiresAt: expiryDate }, { returnDocument: 'after' })

    if (!tenant) {
        const error = new Error('Invalid Plan or billing cycle');
        error.statusCode = 400;
        throw error;
    }

    return tenant;
}