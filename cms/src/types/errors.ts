export interface LoginFormError {
  username: ValidationError;
  password: ValidationError;
  message?: string;
}

interface ValidationError<InputType = string> {
  location: string;
  msg: string;
  path: string;
  type: string;
  value: InputType;
}
