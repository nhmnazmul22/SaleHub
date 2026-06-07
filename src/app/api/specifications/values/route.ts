import {NextRequest} from "next/server";
import * as SpecificationValueController
    from "@/features/specifications/server/SpecificationValues/specificationValue.controller"

export async function GET() {
    return await SpecificationValueController.getSpecificationsValues()
}

export async function POST(req: NextRequest) {
    return await SpecificationValueController.createSpecificationValue(req);
}
