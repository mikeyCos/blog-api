# Changelog
<!-- https://medium.com/@dtgasparyan/feature-sliced-design-the-ideal-frontend-architecture-84d701ad44ba -->
---
### 14 APR 2025
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