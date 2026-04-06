    import mongoose from "mongoose";

    const propertySchema = mongoose.Schema({
        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'tenant',
            index: true,
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
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ["AVAILABLE", "SOLD"],
            required: true,
            default: "AVAILABLE",
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