import {productMinifiedProjectPipeline} from "@/features/product/server/product.pipeline";
import {userMinifiedProjectPipeline} from "@/features/user/server/user.pipeline";

export const productVariantPipeline = (query?: Record<string, unknown>) => {
    return [
        { $match: query || {} },
        {
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "product",
                pipeline: productMinifiedProjectPipeline
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "createdBy",
                foreignField: "_id",
                as: "created",
                pipeline: userMinifiedProjectPipeline
            },
        },
        { $unwind: "$product" },
        { $unwind: "$created" },
        {
            $project: {
                productId: 0,
                deletedAt: 0,
                createdBy: 0,
            },
        },
    ];
};
