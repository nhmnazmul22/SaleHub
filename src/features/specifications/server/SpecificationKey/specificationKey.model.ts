import { Schema, model, models } from "mongoose";

const specificationKeySchema = new Schema(
    {
       key: {
           type: String,
           required: true
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

specificationKeySchema.index({ key: 1 });

export const SpecificationKeyModel =
    models.specification_keys || model("specification_keys", specificationKeySchema);
