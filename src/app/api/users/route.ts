import { NextRequest } from "next/server";
import * as UserController from "@/features/user/server/user.controller";
/**
 * Get all users
 * @param _req NextResponse
 */
export async function GET() {
  return await UserController.getUsers();
}

/**
 * Create new user with validation
 * @param req NextRequest
 */
export async function POST(req: NextRequest) {
  return await UserController.createUser(req);
}
