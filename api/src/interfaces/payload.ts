// import { JwtPayload } from "jsonwebtoken";
import { User } from "./user";

declare module "jsonwebtoken" {
  export interface JwtPayload extends User {}
}
