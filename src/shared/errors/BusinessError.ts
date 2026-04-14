import ResponseStatus from "@/config/status";
import { AppError } from "./AppError";

export class BusinessError extends AppError {
  constructor(message = "Invalid input provided") {
    super(message, ResponseStatus.BAD_REQUEST);
  }
}
