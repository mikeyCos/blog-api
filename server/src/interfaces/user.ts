export interface User {
  id: UserId;
  role: Role;
  timestamp: Date;
  username: Username;
  password: string;
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
  password: string;
}

export interface UserIdParams {
  userId: UserId;
}

export type UserId = string | undefined | null;

export type Username = string | undefined | null;
