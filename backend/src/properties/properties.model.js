import mongoose from "mongoose";

const propertySchema = mongoose.Schema({
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'tenant',
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },

    title: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    listingType: {
        type: String,
        enum: ["RENT", "SALE"],
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: ["DRAFT", "ACTIVE", "UNDER_OFFER", "SOLD", "ARCHIVED"],
        required: true,
        default: "ACTIVE",
    },

    ownerContactId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'contact',
    },

}, {
    timestamps: true,
}

)

const propertyModel = mongoose.model('property', propertySchema);

export default propertyModel;