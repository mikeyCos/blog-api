export interface User {
  id: UserId;
  username: Username;
  email: string;
  password: string;
  role: Role;
  timestamp: Date;
}

// TODO
// For now, this fixes the error for passport.serializeUser; Express.User
declare global {
  namespace Express {
    interface User {
      id: UserId;
      username: Username;
    }
  }
}

type Role = "USER" | "AUTHOR" | "ADMIN";

export interface CreateUser {
  username: string;
  email: string;
  password: string;
}

export interface UserIdParams {
  userId: UserId;
}

export type UserId = string | undefined | null;

export type Username = string | undefined | null;
