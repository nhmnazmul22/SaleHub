import {NextRequest} from "next/server";
import * as SpecificationKeyController
    from "@/features/specifications/server/SpecificationKey/specificationKey.controller"

export async function GET() {
    return await SpecificationKeyController.getSpecificationsKeys()
}

export async function POST(req: NextRequest) {
    return await SpecificationKeyController.createSpecificationKey(req);
}