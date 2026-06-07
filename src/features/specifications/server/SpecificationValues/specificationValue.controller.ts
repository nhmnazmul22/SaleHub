import {NextRequest, NextResponse} from "next/server";
import {handleError} from "@/helper/error.helper";
import {
    specificationValueInputSchema,
    specificationValueUpdateSchema,
} from "@/features/specifications/shared/specification.validation";
import {ValidationError} from "@/shared/errors/ValidationError";
import z from "zod";
import * as SpecificationValueService from "@/features/specifications/server/SpecificationValues/specificationValue.service"
import ResponseStatus from "@/config/status";

type SpecificationValueRouteContext = {
    params: Promise<{ id: string }>;
};

export const getSpecificationsValues = async () => {
    try {
        const result = await SpecificationValueService.getSpecificationValues();
        return NextResponse.json({
            success: true,
            message: "Specification values retrieved successful",
            data: result
        }, {
            status: ResponseStatus.SUCCESS
        })

    } catch (error) {
        return handleError(error)
    }
}

export const createSpecificationValue = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const validationResult = specificationValueInputSchema.safeParse(body);

        if (!validationResult.success) {
            throw new ValidationError(z.flattenError(validationResult.error).fieldErrors);
        }

        const result = await SpecificationValueService.createSpecificationValue(validationResult.data);
        return NextResponse.json({
            success: true,
            message: "Successfully created specification value",
            data: result
        }, {status: ResponseStatus.CREATED})

    } catch (error) {
        return handleError(error);
    }
}

export const getSpecificationValueById = async (
    ctx: SpecificationValueRouteContext,
) => {
    try {
        const {id} = await ctx.params;
        const result = await SpecificationValueService.getSpecificationValueById(id);

        return NextResponse.json({
            success: true,
            message: "Specification value retrieved successful",
            data: result
        }, {status: ResponseStatus.SUCCESS})
    } catch (error) {
        return handleError(error);
    }
}

export const updateSpecificationValue = async (
    ctx: SpecificationValueRouteContext,
    req: NextRequest,
) => {
    try {
        const {id} = await ctx.params;
        const body = await req.json();
        const validationResult = specificationValueUpdateSchema.safeParse(body);

        if (!validationResult.success) {
            throw new ValidationError(z.flattenError(validationResult.error).fieldErrors);
        }

        const result = await SpecificationValueService.updateSpecificationValue(id, validationResult.data);
        return NextResponse.json({
            success: true,
            message: "Specification value updated successful",
            data: result
        }, {status: ResponseStatus.ACCEPTED})
    } catch (error) {
        return handleError(error);
    }
}

export const deleteSpecificationValue = async (
    ctx: SpecificationValueRouteContext,
) => {
    try {
        const {id} = await ctx.params;
        const result = await SpecificationValueService.deleteSpecificationValue(id);

        return NextResponse.json({
            success: true,
            message: "Specification value deleted successful",
            data: result
        }, {status: ResponseStatus.SUCCESS})
    } catch (error) {
        return handleError(error);
    }
}
