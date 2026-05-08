import { UnauthorizedError } from "@/shared/errors/UnauthorizedError";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const verifyAuth = async (req: NextRequest) => {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    throw new UnauthorizedError(
      "Unauthorized! Please login to access this resource.",
    );
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

  return decodedToken;
};
