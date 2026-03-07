import {Schema, model} from "mongoose";
import {AdjustmentEnumType} from "@/types/enumType";

const stockTransactionSchema = new Schema(
    {
        stockId: {
            type: Schema.Types.ObjectId,
            ref: "Stock",
            required: true,
            index: true,
        },
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
        },
        beforeQty: {
            type: Number,
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
        },

        invQty: {
            type: Number,
            required: true,
        },

        adjustmentType: {
            type: String,
            enum: Object.values(AdjustmentEnumType),
            required: true,
        },

        reason: {
            type: String,
            default: null,
        },

        note: {
            type: String,
            default: null,
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

export const StockTransaction = model("stock_transactions", stockTransactionSchema);