export interface LoginFormError {
  username: ValidationError;
  password: ValidationError;
  message?: string;
}

export interface SignUpFormError {
  username: ValidationError;
  email: ValidationError;
  password: ValidationError;
  ["password-confirmation"]: ValidationError;
  message?: string;
}

interface ValidationError<InputType = string> {
  location: string;
  msg: string;
  path: string;
  type: string;
  value: InputType;
}
