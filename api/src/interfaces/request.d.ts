import { User } from "./user";

// Declaration Merging
// https://www.typescriptlang.org/docs/handbook/declaration-merging.html
// https://stackoverflow.com/questions/71122741/how-do-i-add-custom-property-to-express-request-in-typescript
/* declare namespace Express {
  export interface Request{
    user?: object;
    accessToken?: string;
  }
} */

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
    accessToken?: string;
  }
}
