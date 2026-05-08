import * as AuthController from "@/features/auth/server/auth.controller";

export async function PATCH() {
  return AuthController.logout();
}
