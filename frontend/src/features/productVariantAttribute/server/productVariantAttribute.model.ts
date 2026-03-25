import {Schema, model} from "mongoose";

const productVariantAttributeSchema = new Schema(
    {
        key: {
            type: String,
            required: true,
            trim: true,
        },

        values: {
            type: [String],
            required: true,
            default: [],
        },

        productVariantId: {
            type: Schema.Types.ObjectId,
            ref: "product_variants",
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

const ProductVariantAttributeModel = model(
    "product_variant_attributes",
    productVariantAttributeSchema
);

export default ProductVariantAttributeModel;