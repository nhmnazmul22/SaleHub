import {SpecificationKey, SpecificationKeyInputType} from "@/features/specifications/shared/type";
import {SpecificationKeyModel} from "@/features/specifications/server/SpecificationKey/specificationKey.model";


export const findAll = async (
    query?: Record<string, string>,
): Promise<SpecificationKey[] | []> => {
    return SpecificationKeyModel.find(query);
};

export const createOne = async (data: SpecificationKeyInputType): Promise<SpecificationKey> => {
    return await SpecificationKeyModel.create(data);
}