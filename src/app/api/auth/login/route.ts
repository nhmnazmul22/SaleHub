import {NextRequest} from "next/server";
import * as AuthController from "@/features/auth/server/auth.controller"


/**
 * User login route
 * @param req NextRequest
 */
export async function POST(req: NextRequest) {
    return await AuthController.loginController(req);
}
