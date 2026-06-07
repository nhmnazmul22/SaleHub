import {connectDB} from "@/config/database";
import {
    SpecificationValue,
    SpecificationValueInputType,
    SpecificationValueUpdateType,
} from "@/features/specifications/shared/type";
import * as SpecificationValueRepository from "@/features/specifications/server/SpecificationValues/specificationValue.repository"
import * as SpecificationKeyRepository from "@/features/specifications/server/SpecificationKey/specificationKey.repository"
import {BusinessError} from "@/shared/errors/BusinessError";
import ResponseStatus from "@/config/status";
import mongoose from "mongoose";
import {NotFoundError} from "@/shared/errors/NotfoundError";


export const getSpecificationValues = async ()=>{
       await connectDB();
       return SpecificationValueRepository.findAll({});
}

export const createSpecificationValue = async (payload: SpecificationValueInputType) => {
       await connectDB();

       const existingKey = await SpecificationKeyRepository.findById(payload.keyId);
       if (!existingKey) {
              throw new NotFoundError(`Specification key not found with id: ${payload.keyId}`);
       }

       const existingValue: SpecificationValue | null =
           await SpecificationValueRepository.findOneByQuery({
                  keyId: payload.keyId,
                  value: payload.value,
           });

       if (existingValue) {
              throw new BusinessError("Specification value already exists with this key!");
       }

       const newValue = await SpecificationValueRepository.createOne(payload);

       if (!newValue) {
              throw new BusinessError(
                  "Failed to create specification value",
                  ResponseStatus.INTERNAL_SERVER_ERROR,
              );
       }

       return newValue;
}

export const getSpecificationValueById = async (valueId: string) => {
       if (!mongoose.Types.ObjectId.isValid(valueId)) {
              throw new BusinessError("Please, provide valid specification value id!");
       }

       await connectDB();

       const existingValue = await SpecificationValueRepository.findById(valueId);
       if (!existingValue) {
              throw new NotFoundError(`Specification value not found with id: ${valueId}`);
       }

       return existingValue;
}

export const updateSpecificationValue = async (
    valueId: string,
    payload: SpecificationValueUpdateType,
) => {
       if (!mongoose.Types.ObjectId.isValid(valueId)) {
              throw new BusinessError("Please, provide valid specification value id for update!");
       }

       await connectDB();

       const existingValue = await SpecificationValueRepository.findById(valueId);
       if (!existingValue) {
              throw new NotFoundError(`Specification value not found with id: ${valueId}`);
       }

       if (payload.keyId) {
              const existingKey = await SpecificationKeyRepository.findById(payload.keyId);
              if (!existingKey) {
                     throw new NotFoundError(`Specification key not found with id: ${payload.keyId}`);
              }
       }

       return SpecificationValueRepository.updateById(valueId, payload);
}

export const deleteSpecificationValue = async (valueId: string) => {
       if (!mongoose.Types.ObjectId.isValid(valueId)) {
              throw new BusinessError("Please, provide valid specification value id for delete!");
       }

       await connectDB();

       const existingValue = await SpecificationValueRepository.findById(valueId);
       if (!existingValue) {
              throw new NotFoundError(`Specification value not found with id: ${valueId}`);
       }

       return SpecificationValueRepository.deleteById(valueId);
}
