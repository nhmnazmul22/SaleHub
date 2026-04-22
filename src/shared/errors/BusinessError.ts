import ResponseStatus from "@/config/status";
import { AppError } from "./AppError";

export class BusinessError extends AppError {
  constructor(
    message: string = "Invalid input provided",
    statusCode: number = ResponseStatus.BAD_REQUEST,
    details?: unknown,
  ) {
    super(message, statusCode, details);
  }
}
