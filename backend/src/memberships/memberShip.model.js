import mongoose from "mongoose";

const memberShipSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        index: true,
    },

    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tenant',
        required: true,
        index: true,
    },

    role: {
        type: String,
        enum: ['OWNER', 'ADMIN', 'AGENT', 'VIEWER'],
        required: true,
        default: 'OWNER',
    },

    email:{   
        type: String, 
        unique: true,
        required: true,
    },

    status: {
        type: String,
        enum: ['active','disabled'],
        default: 'active'
    }
}, {
    timestamps: true,
})

memberShipSchema.index({ tenantId: 1, userId: 1 }, { unique: true, })

const memberShipModel = mongoose.models.membership || mongoose.model("membership", memberShipSchema);

export default memberShipModel;