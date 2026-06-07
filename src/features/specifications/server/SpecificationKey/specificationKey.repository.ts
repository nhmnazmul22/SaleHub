import {Types, UpdateWriteOpResult} from "mongoose";
import {
    SpecificationKey,
    SpecificationKeyInputType,
    SpecificationKeyUpdateType,
} from "@/features/specifications/shared/type";
import {SpecificationKeyModel} from "@/features/specifications/server/SpecificationKey/specificationKey.model";


export const findAll = async (
    query?: Record<string, string>,
): Promise<SpecificationKey[] | []> => {
    return SpecificationKeyModel.find(query || {});
};

export const findOneByQuery = async (
    query?: Record<string, string>,
): Promise<SpecificationKey | null> => {
    return SpecificationKeyModel.findOne(query);
};

export const findById = async (id: string): Promise<SpecificationKey | null> => {
    return SpecificationKeyModel.findOne({_id: new Types.ObjectId(id)});
};

export const createOne = async (data: SpecificationKeyInputType): Promise<SpecificationKey> => {
    return await SpecificationKeyModel.create(data);
};

export const updateById = async (
    id: string,
    data: Partial<SpecificationKeyUpdateType>,
): Promise<UpdateWriteOpResult> => {
    return SpecificationKeyModel.updateOne(
        {_id: new Types.ObjectId(id)},
        {$set: data},
    );
};

export const deleteById = async (id: string) => {
    return SpecificationKeyModel.deleteOne({_id: new Types.ObjectId(id)});
};
