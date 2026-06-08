import {Types, UpdateWriteOpResult} from "mongoose";
import {
    SpecificationValue,
    SpecificationValueInputType,
    SpecificationValueUpdateType,
} from "@/features/specifications/shared/type";
import {SpecificationValueModel} from "@/features/specifications/server/SpecificationValues/specificationValue.model";
import {convertedObjectId} from "@/lib/utils";


export const findAll = async (
    query?: Record<string, string>,
): Promise<SpecificationValue[] | []> => {
    return SpecificationValueModel.find(query || {}).populate({
        path: "keyId",
        select: "_id key",
    });
};

export const findOneByQuery = async (
    query?: Record<string, string>,
): Promise<SpecificationValue | null> => {
    return SpecificationValueModel.findOne(query);
};

export const findById = async (id: string): Promise<SpecificationValue | null> => {
    return SpecificationValueModel.findOne({_id: convertedObjectId(id)}).populate({
        path: "keyId",
        select: "_id key",
    });
};

export const createOne = async (data: SpecificationValueInputType): Promise<SpecificationValue> => {
    return await SpecificationValueModel.create(data);
};

export const updateById = async (
    id: string,
    data: Partial<SpecificationValueUpdateType>,
): Promise<UpdateWriteOpResult> => {
    return SpecificationValueModel.updateOne(
        {_id: convertedObjectId(id)},
        {$set: data},
    );
};

export const deleteById = async (id: string) => {
    return SpecificationValueModel.deleteOne({_id: convertedObjectId(id)});
};
