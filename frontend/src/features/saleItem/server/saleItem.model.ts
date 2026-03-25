import {Schema, model} from "mongoose";

const saleItemSchema = new Schema(
    {
        saleId: {
            type: Schema.Types.ObjectId,
            ref: "sales",
            required: true,
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

        quantity: {
            type: Number,
            required: true,
            min: 1,
        },

        unitPrice: {
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

        lineTotal: {
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
        versionKey: false
    }
);


saleItemSchema.index({saleId: 1});
saleItemSchema.index({productVariantId: 1});

export const SaleItemModel = model("sale_items", saleItemSchema);