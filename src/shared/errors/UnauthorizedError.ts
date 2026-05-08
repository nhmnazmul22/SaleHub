import ResponseStatus from "@/config/status";
import { AppError } from "./AppError";

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, ResponseStatus.UNAUTHORIZED);
  }
}
