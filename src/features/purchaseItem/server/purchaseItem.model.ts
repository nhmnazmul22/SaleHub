import {Schema, model} from "mongoose";

const purchaseItemSchema = new Schema(
    {
        purchaseId: {
            type: Schema.Types.ObjectId,
            ref: "purchases",
            required: true,
            index: true,
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "products",
            required: true,
        },
        productVariantId: {
            type: Schema.Types.ObjectId,
            ref: "product_variants",
            required: true,
        },
        unitPrice: {
            type: Number,
            default: 0,
        },
        salePrice: {
            type: Number,
            default: 0,
        },
        subTotal: {
            type: Number,
            default: 0,
        },
        grandTotal: {
            type: Number,
            default: 0,
        },
        discount: {
            type: Number,
            default: 0,
        },
        vat: {
            type: Number,
            default: 0,
        },
        receivedQty: {
            type: Number,
            default: 0,
        },
        bonusQty: {
            type: Number,
            default: 0,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export const PurchaseItem = model(
    "purchaseItems",
    purchaseItemSchema
);