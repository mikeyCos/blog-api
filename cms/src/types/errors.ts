export interface LoginFormError {
  username?: ValidationError;
  password?: ValidationError;
  msg?: string;
}

export interface SignUpFormError {
  username?: ValidationError;
  email?: ValidationError;
  password?: ValidationError;
  ["password-confirmation"]?: ValidationError;
  msg?: string;
}

export interface PostFormError {
  title?: ValidationError;
  content?: ValidationError;
}

interface ValidationError<InputType = string> {
  location: string;
  msg: string;
  path: string;
  type: string;
  value: InputType;
}
