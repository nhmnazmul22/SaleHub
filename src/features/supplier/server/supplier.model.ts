import {Schema, model, models} from "mongoose";

const supplierSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        companyName: {
            type: String,
            default: null,
            trim: true,
            unique: true
        },
        phone: {
            type: String,
            default: null,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        contactPerson: {
            type: String,
            default: null,
            trim: true,
        },
        taxId: {
            type: String,
            default: null,
            trim: true,
            unique: true
        },
        nid: {
            type: String,
            default: null,
            trim: true,
            unique: true
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const SupplierModel = models.suppliers || model("suppliers", supplierSchema);

export default SupplierModel;