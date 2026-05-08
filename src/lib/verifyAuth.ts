import { UnauthorizedError } from "@/shared/errors/UnauthorizedError";
import { JWTUserPayload } from "@/types";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const verifyAuth = async () => {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    throw new UnauthorizedError(
      "Unauthorized! Please login to access this resource.",
    );
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

  return decodedToken;
};

export const verifyAdminAuth = async () => {
  const decodedToken = (await verifyAuth()) as JWTUserPayload;

  if (decodedToken.role !== "admin") {
    throw new UnauthorizedError(
      "Unauthorized! You do not have permission to access this resource.",
    );
  }

  return decodedToken;
};
