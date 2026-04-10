import {model, models, Schema} from "mongoose";
import {PaymentMethodEnumType, PaymentStatusEnumType} from "@/types/enumType";


const paymentSchema = new Schema(
    {
        saleId: {
            type: Schema.Types.ObjectId,
            ref: "sales",
            required: true,
        },

        invoiceNumber: {
            type: String,
            required: true,
            trim: true,
        },

        paymentMethod: {
            type: String,
            enum: Object.values(PaymentMethodEnumType),
            default: PaymentMethodEnumType.CASH,
        },

        amount: {
            type: Number,
            default: 0,
        },

        totalPaidAmount: {
            type: Number,
            default: 0,
        },

        status: {
            type: String,
            enum: Object.values(PaymentStatusEnumType),
            default: PaymentStatusEnumType.PENDING,
        },

        customerId: {
            type: Schema.Types.ObjectId,
            ref: "customers",
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


paymentSchema.index({saleId: 1});
paymentSchema.index({customerId: 1});

export const PaymentModel = models.payments || model("payments", paymentSchema);
