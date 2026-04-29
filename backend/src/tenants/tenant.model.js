import mongoose from "mongoose";

const tenantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    country: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: ['active', 'suspended'],
        default: 'active',
    },

    role: {
        type: String,
        enum: ['OWNER'],
        default: 'OWNER',
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },

        subscriptionStatus: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },


    plan: {
        type: String,
        enum: ['BASIC', 'PRO', 'MAX'],
        default: null,
    },

    billingCycle: {
        type: String,
        enum: ['monthly', 'yearly'],
        default: null
    },

    expiresAt: {
        type: Date,
        default: null,

    },
    

}, {
    timestamps: true,
})

const tenantModel = mongoose.model('tenant', tenantSchema);

export default tenantModel;