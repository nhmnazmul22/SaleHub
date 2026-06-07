import {NextRequest, NextResponse} from "next/server";
import {handleError} from "@/helper/error.helper";
import {specificationKeyInputSchema} from "@/features/specifications/shared/specification.validation";
import {ValidationError} from "@/shared/errors/ValidationError";
import z from "zod";
import * as SpecificationKeyService from "@/features/specifications/server/SpecificationKey/specificationKey.service"
import ResponseStatus from "@/config/status";


export const getSpecificationsKeys = async () => {
    try {
        const result = await SpecificationKeyService.getSpecificationKeys();
        return NextResponse.json({
            success: true,
            message: "Specification keys retrieved successful",
            data: result
        }, {
            status: ResponseStatus.SUCCESS
        })

    } catch (error) {
        return handleError(error)
    }
}

export const createSpecificationKey = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const validationResult = specificationKeyInputSchema.safeParse(body);

        if (!validationResult.success) {
            throw new ValidationError(z.flattenError(validationResult.error).fieldErrors);
        }

        const result = await SpecificationKeyService.createSpecificationKey(body);
        return NextResponse.json({
            success: true,
            message: "Successfully created specification key",
            data: result
        }, {status: ResponseStatus.CREATED})

    } catch (error) {
        return handleError(error);
    }
}