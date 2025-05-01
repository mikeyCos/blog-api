// Declaration Merging
// https://www.typescriptlang.org/docs/handbook/declaration-merging.html
// https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
declare namespace Express {
  export interface Request {
    user?: object;
    accessToken?: string;
  }
}
