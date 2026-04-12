/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppError } from "./AppError";

export class ValidationError extends AppError {
  constructor(details: any) {
    super("Validation failed", 422, details);
  }
}
