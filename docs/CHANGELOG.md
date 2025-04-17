# Changelog
<!-- https://medium.com/@dtgasparyan/feature-sliced-design-the-ideal-frontend-architecture-84d701ad44ba -->
---
### 17 APR 2025
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