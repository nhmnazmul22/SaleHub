import {connectDB} from "@/config/database";
import {
    SpecificationKey,
    SpecificationKeyInputType,
    SpecificationKeyUpdateType,
} from "@/features/specifications/shared/type";
import * as SpecificationKeyRepository
    from "@/features/specifications/server/SpecificationKey/specificationKey.repository"
import {BusinessError} from "@/shared/errors/BusinessError";
import ResponseStatus from "@/config/status";
import mongoose from "mongoose";
import {NotFoundError} from "@/shared/errors/NotfoundError";


export const getSpecificationKeys = async () => {
    await connectDB();
    return SpecificationKeyRepository.findAll({});
}

export const createSpecificationKey = async (payload: SpecificationKeyInputType) => {
    await connectDB();

    const existingKey: SpecificationKey | null = await SpecificationKeyRepository.findOneByQuery({
        key: payload.key,
    });

    if (existingKey) {
        throw new BusinessError("Specification key already exists!");
    }

    const newKey = await SpecificationKeyRepository.createOne(payload);

    if (!newKey) {
        throw new BusinessError(
            "Failed to create specification key",
            ResponseStatus.INTERNAL_SERVER_ERROR,
        );
    }

    return newKey;
}

export const getSpecificationKeyById = async (keyId: string) => {
    if (!mongoose.Types.ObjectId.isValid(keyId)) {
        throw new BusinessError("Please, provide valid specification key id!");
    }

    await connectDB();

    const existingKey = await SpecificationKeyRepository.findById(keyId);
    if (!existingKey) {
        throw new NotFoundError(`Specification key not found with id: ${keyId}`);
    }

    return existingKey;
}

export const updateSpecificationKey = async (
    keyId: string,
    payload: SpecificationKeyUpdateType,
) => {
    if (!mongoose.Types.ObjectId.isValid(keyId)) {
        throw new BusinessError("Please, provide valid specification key id for update!");
    }

    await connectDB();

    const existingKey = await SpecificationKeyRepository.findById(keyId);
    if (!existingKey) {
        throw new NotFoundError(`Specification key not found with id: ${keyId}`);
    }

    if (payload.key) {
        const existingKey: SpecificationKey | null = await SpecificationKeyRepository.findOneByQuery({
            key: payload.key,
        });

        if (existingKey) {
            throw new BusinessError("Specification key already exists!");
        }
    }

    return SpecificationKeyRepository.updateById(keyId, payload);
}

export const deleteSpecificationKey = async (keyId: string) => {
    if (!mongoose.Types.ObjectId.isValid(keyId)) {
        throw new BusinessError("Please, provide valid specification key id for delete!");
    }

    await connectDB();

    const existingKey = await SpecificationKeyRepository.findById(keyId);
    if (!existingKey) {
        throw new NotFoundError(`Specification key not found with id: ${keyId}`);
    }

    return SpecificationKeyRepository.deleteById(keyId);
}
