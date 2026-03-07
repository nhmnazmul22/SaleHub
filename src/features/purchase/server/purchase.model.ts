import {Schema, model} from "mongoose";
import {PurchaseStatusEnums} from "@/constants/enum";

const purchaseSchema = new Schema(
    {
        invoiceNumber: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        subTotal: {
            type: Number,
            default: 0,
        },
        grandTotal: {
            type: Number,
            default: 0,
        },
        totalDiscount: {
            type: Number,
            default: 0,
        },
        totalVat: {
            type: Number,
            default: 0,
        },
        supplierId: {
            type: Schema.Types.ObjectId,
            ref: "suppliers",
            required: true,
        },
        status: {
            type: String,
            enum: PurchaseStatusEnums,
            default: "ordered",
        },
        purchaseDate: {
            type: Date,
            default: Date.now,
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
        versionKey: false,
    }
);

const PurchaseModel = model("purchases", purchaseSchema);

export default PurchaseModel;