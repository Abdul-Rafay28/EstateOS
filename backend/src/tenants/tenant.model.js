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
    }
}, {
    timestamps: true,
})

const tenantModel = mongoose.model('tenant', tenantSchema);

export default tenantModel;