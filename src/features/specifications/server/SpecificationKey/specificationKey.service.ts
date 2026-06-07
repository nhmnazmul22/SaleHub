import {SpecificationKeyInputType} from "@/features/specifications/shared/type";
import * as SpecificationKeyRepository from "@/features/specifications/server/SpecificationKey/specificationKey.repository"


export const getSpecificationKeys = async ()=>{
       return SpecificationKeyRepository.findAll();
}

export const createSpecificationKey = async (payload: SpecificationKeyInputType) => {
       return SpecificationKeyRepository.createOne(payload);
}