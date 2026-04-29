import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'tenant',
    },

    fullName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        unique: true,
    },

    phone: {
        type: String,
        unique: true,
    },

}, {
    timestamps: true,
});

contactSchema.index({ tenantId: 1, email: 1 }, { unique: true })

const contactModel = mongoose.model('contact', contactSchema);

export default contactModel;