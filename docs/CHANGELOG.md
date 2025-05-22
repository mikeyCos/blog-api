# Changelog
<!-- https://medium.com/@dtgasparyan/feature-sliced-design-the-ideal-frontend-architecture-84d701ad44ba -->
---
### 21 MAY 2025
- The `authenticateToken` middleware now checks if `user` exists on the `req` object; if `req.user` does not exist, then an err JSON response is sent and request execution ends.
- Added conditional block in `verifyJWT` that checks if `token` is a falsy value.
- Added optional `null` and `undefined` types for `verifyJWT` `token` parameter.
- Temporarily changed `maxAge` for `refreshToken` from 20 seconds to 1 day.
- Removed `cms/public/tinymce` subdirectory from Git repository.
---
### 20 MAY 2025
- Added a title `input` in `PostForm` component.
- Wrapped the `PostEditor` component with a `form` element.
- Defined `editorRef` and `submitPost` in `PostForm` component and pass the reference down to the `PostEditor` component.
- Created `post.validator.ts`, `postinstall.ts`, and `PostForm.tsx` modules.
- In `cms` directory, added `"compilerOptions": { "esModuleInterop": true }` option in `tsconfig.json`.
- In `cms` directory, removed `"type": "module"` option in `package.json`.
---
### 19 MAY 2025
- Created `feature-post` branch from `stable`.
- Created `stable` branch from `main`.
- Merged `cms-feature-sign-up` branch to `main`.
- The `signup` endpoint in `auth.controller` module now attaches a HTTP-only cookie and sends a JSON response to the client.
- When a new user is created, their `accessToken` is stored in state and `refreshToken` is attached to a HTTP-only cookie, and they are redirected to the dashboard page.
- All properties for `LoginFormError` and `SignUpFormError` interfaces are now optional.
- Replaced `fetch` call with `axios.post` call in `SignUpForm` component.
---
### 18 MAY 2025
- Explicitly defined `if...else` conditional block in the `Login` component.
- If a user logs out from a protected route, they will be redirected to the login page, then if they log back in, they will be redirected back to where they logged out from.
- Removed conditional block in `ProtectedLayout` component's `useEffect` hook.
- Moved `AuthProvider` from `App` component to `RootLayout` component.
---
### 16 MAY 2025
- Currently, logging out does not immediately update the `accessToken`.
- When both access and refresh tokens expire, the user will be redirected to the page they were previously on; in other words, if a user is on a protected route (`/comments`), then both tokens expire, the user is redirected to the login page, then the user logs in, and they are redirected back to the comments page.
---
### 14 MAY 2025
- Created `DashboardLayout`, `Comments`, `Posts` and `dashboardNavBar` modules.
- Added `@tinymce/tinymce-react`, `tinymce`, and `fs-extra` packages to dependencies.
- Moved `about`, `dashboard`, `faq`, and `home` subdirectories into `pages` subdirectory.
- Recreated `pages` subdirectory.
---
### 12 MAY 2025
- If a user is on the FAQ page, then they login, they will be redirected back to the FAQ page.
- Restructured `routes` array by defining a `RootLayout`; this allows context providers to be below a router.
- Defined `RouteObject[]` type for `routes` in `routes` module.
- Created `usePrevLocation` module; records and provides `prevLocation` for routes.
---
### 09 MAY 2025
- Logging in will direct user to the dashboard.
- Added `init=true` query parameter to the post request url in `useAuth` module.
- Created `query.validator` module; validates optional `init` query parameter.
- Renamed `axiosPrivate` to `axiosInit` and added `validateStatus` config option.
---
### 08 MAY 2025
- Deleted `useAxiosPrivate` module.
- If `accessToken` is valid , `req.user` will be assigned the `payload.user` value; reuses `accessToken` generated when a user first logged in. 
- The `id` property for `User` object is not optional.
- `Authorization` header added to `axios` instance if `accessToken` exists in `ProtectedLayout` module.
---
### 07 MAY 2025
- Logging out will keep the user on the path where they logged out, expect if they are in a protected/private route.
- Deleted `useLocalStorage` module.
---
### 05 MAY 2025
- If the response `status` equals `"success"`, then the new access token is passed into `setAccessToken()`, otherwise `null` is passed into `setAccessToken()`.
- Temporarily set up `refreshAccessToken` in `auth.controller` module will send a JSON response 
  ```js
  {
    status: "fail",
    code: 401,
    data: { accessToken: null, user: null },
  }
  ```
  if `newAccessToken` is falsy.
- Asserted `User` type for `req.user` in `auth.controller` module's `refreshAccessToken` method.
- Replaced `if...else` block from `refreshAccessToken` in `auth.controller` module with logical `AND (&&)`. 
---
### 02 MAY 2025
- Changed all fle extensions in `interfaces` subdirectory from `.ts` to `.d.ts`.
- The asynchronous function `verifyJWT` can return a `Promise` with object properties `payload` of type `null` or `JwtPayload` and `expired` of type `boolean`.
- The asynchronous function `signJWT` can return a `Promise` with type `string` or `null`.
- Changed `declare namespace Express` to `declare module "express-serve-static-core"` and imported `User` interface in `request` module.
---
### 30 APR 2025
- Created `deserializeUser` middleware; extracts `accessToken` and `refreshToken` and verifies the existing token.
- Removed `serializeUser` and `deserializeUser` from `passport` module.
- Created `request` module in `interfaces` subdirectory; allows optional custom properties on the `req` object.
- Renamed `server` directory to `api`.
---
### 28 APR 2025
- Created `[formData, setFormData]` state in `LoginForm` component.
- Created `axios.config` module.
- Installed `axios` package to dependencies.
---
### 27 APR 2025
- A user can log out but they are currently directed back to `/login` if they are in a protected route.
- Added `[isAuthorized, setIsAuthorized]` state in `AuthProvider` to only provide a read value for protected routes.
---
### 25 APR 2025
- If a user is logged in and tries to go to `/login` or `/signup` they are redirected to `/dashboard`. 
- The resolved object from `res.json()` is stringified into `AuthContext` provider's `login` function.
- Logging in will direct logged in user to the dashboard.
- Signing up with valid form inputs will log in the user and send a JSON response with the following content: `{ status: "success", code: 200, data: { token } }`.
- Added `NavAnchor` component with `pathname="/signup"` prop to `Header` component.
- Added `NavAnchor` component to `SignIn` component; optionally, a user can sign up instead of signing in.
---
### 24 APR 2025 
- Invalid `SignUpForm` `POST` requests will render errors.
- Changed `error` object in the application-level middleware when no routes match;
  
  from

  ```js
  {
    status: 404,
    message: "Resource not found",
  }
  ```

  to
  
  ```js
  {
    status: "fail",
    code: 404,
    data: { message: "Resource not found" },
  }
  ```
- Added `email` field to `User` model.
- Created `SignUp` and `SignUpForm` components.
- Renamed `createUser.validator` to `signup.validator`. 
- Created `cms-feature-sign-up` branch.
- Merged `cms-init` branch to `main`.
- Renamed `config` files to `env.config`.
---
### 23 APR 2025
- Invalid `LoginForm` `POST` requests will render errors.
- Created `config` subdirectory and module.
- Created `errors` module in `types` subdirectory.
- In the backend, validation errors are now passed to the `errorHandler` middleware with  `status`, `code`, and `data` properties.
- Deleted `Main` component module.
- Navigating to an undefined route will render the `errorElement` inside the layout. 
- Added optional `children` prop to `DefaultLayout` component.
---
### 22 APR 2025
- Created `useAuth` and `useLocalStorage` hooks.
- Created `ProtectedRoute` module.
---
### 21 APR 2025
- Created `src` subdirectories and it's children subdirectories in `cms` directory.
- Initialized `React` setup in `cms` directory.
- Created `cms-init` branch.
- Merged `server-authentication` branch to `main`.
- Renamed `auth.validator` module to `login.validator`.
- Moved `jwt.verify` from `auth.controller` to `authenticateToken` module.
- Renamed `verifyToken` module to `authenticateToken`.
- Added `updatedAt` field to `Post` model.
---
### 20 APR 2025
- Included `blog`, `posts` and `comments` for user objects returned from `getUser` and `getUsers` query functions.
- Created `verifyToken` module and middleware.
- User credentials are authenticated with `passport.authenticate`.
---
### 19 APR 2025
- Query function `getUser` will throw a error if both arguments are falsy values.
- Query function `deleteUser` will throw a error if `userId` is a falsy value.
- `UserID` and `Username` types can be `string | undefined | null`.
---
### 18 APR 2025
- Created `passport` module.
- Renamed `login.*` modules to `auth.*`.
- Created `*_added_created_at_field_comment` Prisma migration.
- Installed `passport`, and `passport-local` packages.
---
### 17 APR 2025
- Created `auth.route` module.
- Installed `jsonwebtoken` package.
- Created `server-authentication` branch.
- Merged `server-controllers` branch to `main` branch.
- Created `blog` interface.
- Added `createdAt` field to `Comment` model.
- Added `name` argument to `relation` attribute in `blog.prisma` schema.
- Defined `UserIdParams` interface; this is used as a generic for `matchedData` in `user.controller`.
- Deleted `blog.route` and `blog.controller` modules.
- Changed request parameters on `/user` route from `/:id` to `userId`.
---
### 16 APR 2025
- Defined query functions for blog posts and comments in `services/blog.ts`.
- Added `content` field to `Comment` model.
- Added `title` and `content` fields to `Post` model.
- Created `blog` in `services` subdirectory.
- Created `post.controller` and `post.route` modules.
- Installed `bcryptjs` package.
- Created npm script `clear-db`; this will run `clearDB` function from `seed.db.ts` module.
- Created npm script `seed-db`; this will run `seedDB` function from `seed.db.ts` module.
- A user can be created, read, and deleted.
- Added referential action `onDelete: Cascade` to the `Blog` model.
- Added `.route` suffix to route files.
- Added `.controller` suffix to controller files.
---
### 15 APR 2025
- Added `username` and `timestamp` to `user` model in `user.prisma` schema.
- Created `server-controllers` branch.
- Created `user` and `blog` modules in `routes` subdirectory.
- Created `user.controller` and `blog.controller` modules.
- Created `db`, `interfaces`, and `validators` subdirectories.
- Resolved Prisma `Error code: P1012` by using a relative path, `../generated/prisma`, for the `client` in `schema.prisma`.
- Created enum `Role` in `user.prisma`.
---
### 14 APR 2025
- Changed `Prisma` client output location from `"./prisma/generated"` to `"./generated/client"`.
- Deleted `prisma/migrations` subdirectory.
- Created `prisma` subdirectory and `*.prisma` files.
- Installed `prisma` package to `devDependencies`.
- Installed `@prisma/client` package to `dependencies`.
- Initial commit for `blog-api` project.
- Merged `fix-cannot-find-module` branch with `main`.
- Created boilerplate `Pizza` page in `client` directory; fetches `http://localhost:3000/pizza` and creates a list of pizzas.
- Created boilerplate `pizza` routes and controllers in `server` directory.
- Deleted `nodemon.json`.
- Changed `"type"` value in `server/package.json` from `"module"` to `"commonjs"`; resolves module issues with `nodemon`.
---
### 13 APR 2025
- Created `middleware` subdirectory, `logger.ts` and `errorHandler.ts` middlewares.
- Created `app.ts`; defines and exports `app`.
- Created `nodemon.json` file in `server` directory.
---
### 12 APR 2025
- Defined `React.FC` type for functional components.
- Created `About` and `Contact` functional components.
- Created `about` and `contact` subdirectories.
---
### 11 APR 2025
- Navigating to an invalid route, for example `/abc`, will render the error page.
- Created `app`, `types`, `layouts`, and `pages` subdirectories.
- Created `types` directory and `typings.d.ts` file.
- Created `tsconfig.json` file in `client` directory.
- Installed `react-router` package.
---
### 10 APR 2025
- Initialized npm package with `npm init` for both `client` and `server` directories.
- Created `config`, `controllers`, `routes`, `utils`, `validators`, `src`, `components`, `assets` subdirectories.
- Created `client`, `demo`, `docs`, `server` directories.
- Initialized `express-react-template` repository.