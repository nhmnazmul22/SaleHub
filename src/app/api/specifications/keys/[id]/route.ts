import {NextRequest} from "next/server";
import * as SpecificationKeyController
    from "@/features/specifications/server/SpecificationKey/specificationKey.controller"

type SpecificationKeyRouteContext = {
    params: Promise<{ id: string }>;
};

export async function GET(
    req: NextRequest,
    ctx: SpecificationKeyRouteContext,
) {
    return SpecificationKeyController.getSpecificationKeyById(ctx);
}

export async function PATCH(
    req: NextRequest,
    ctx: SpecificationKeyRouteContext,
) {
    return SpecificationKeyController.updateSpecificationKey(ctx, req);
}

export async function DELETE(
    req: NextRequest,
    ctx: SpecificationKeyRouteContext,
) {
    return SpecificationKeyController.deleteSpecificationKey(ctx);
}
