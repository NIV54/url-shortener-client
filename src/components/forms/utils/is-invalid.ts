import { FieldError } from "react-hook-form";

export const isInvalid = (error: FieldError | undefined) =>
  error ? "is-invalid" : "";
