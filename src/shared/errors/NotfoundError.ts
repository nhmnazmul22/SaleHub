import ResponseStatus from "@/config/status";
import { AppError } from "./AppError";

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, ResponseStatus.NOT_FOUND);
  }
}
