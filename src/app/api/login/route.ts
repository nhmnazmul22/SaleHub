import {NextRequest} from "next/server";
import * as AuthController from "@/features/auth/server/auth.controller"

export async function POST(req: NextRequest) {
    return await AuthController.loginController(req);
}
