import {Schema, model, models} from "mongoose";

const specificationValueSchema = new Schema(
    {
        value: {
            type: String,
            required: true
        },
        keyId: {
            type: Schema.Types.ObjectId,
            ref: "specification_keys",
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
    },
);

specificationValueSchema.index({keyId: 1, value: 1});

export const SpecificationValueModel =
    models.specification_values || model("specification_values", specificationValueSchema);
