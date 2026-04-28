import {NextRequest} from "next/server";
import * as AuthController from "@/features/auth/server/auth.controller"

export function POST(req: NextRequest) {
    return AuthController.resetPasswordController(req);
}