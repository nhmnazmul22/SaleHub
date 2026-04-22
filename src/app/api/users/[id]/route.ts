import * as UserController from "@/features/user/server/user.controller";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/users/[id]">,
) {
  return UserController.getUserInfo(req, ctx);
}

export async function PATCH(
  req: NextRequest,
  ctx: RouteContext<"/api/users/[id]">,
) {
  return UserController.updateUserInfo(req, ctx);
}

export async function DELETE(
  req: NextRequest,
  ctx: RouteContext<"/api/users/[id]">,
) {
  return UserController.deleteUserInfo(req, ctx);
}
