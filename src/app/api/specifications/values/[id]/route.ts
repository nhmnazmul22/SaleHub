import {NextRequest} from "next/server";
import * as SpecificationValueController
    from "@/features/specifications/server/SpecificationValues/specificationValue.controller"

type SpecificationValueRouteContext = {
    params: Promise<{ id: string }>;
};

export async function GET(
    req: NextRequest,
    ctx: SpecificationValueRouteContext,
) {
    return SpecificationValueController.getSpecificationValueById(ctx);
}

export async function PATCH(
    req: NextRequest,
    ctx: SpecificationValueRouteContext,
) {
    return SpecificationValueController.updateSpecificationValue(ctx, req);
}

export async function DELETE(
    req: NextRequest,
    ctx: SpecificationValueRouteContext,
) {
    return SpecificationValueController.deleteSpecificationValue(ctx);
}
