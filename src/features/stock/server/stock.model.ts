import {Schema, model} from "mongoose";

const stockSchema = new Schema(
    {
        productVariantId: {
            type: Schema.Types.ObjectId,
            ref: "product_variants",
            required: true,
            unique: true
        },
        branchId: {
            type: Schema.Types.ObjectId,
            ref: "branches",
            required: true,
        },
        sku: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        invQty: {
            type: Number,
            default: 0,
        },
        reservedQty: {
            type: Number,
            default: 0,
        },
        onOrderQty: {
            type: Number,
            default: 0,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const Stock = model("stocks", stockSchema);