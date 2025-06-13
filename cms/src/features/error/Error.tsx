import { isRouteErrorResponse, useRouteError } from "react-router";

interface RouterError extends Error {}
interface ParsedRouteError {
  message: string;
  status: number;
}

const isRouterError = (object: any): object is RouterError => {
  return "message" in object;
};

/* useRouteError return type unknown
 * https://github.com/remix-run/react-router/discussions/9628
 * May refactor later
 */
const parseRouteError = (error: unknown): ParsedRouteError => {
  console.log("parseRouteError running...");
  console.log("error:", error);
  if (isRouteErrorResponse(error)) {
    console.log("isRouteErrorResponse(error) is true");
    return { message: error.statusText, status: error.status };
  } else if (error != undefined && isRouterError(error)) {
    return { message: error.message, status: 400 };
  } else if (typeof error === "string") {
    return { message: error, status: 400 };
  } else {
    return { message: "Unknown error", status: 400 };
  }
};

const Error = () => {
  console.log("Error component rendering...");
  const error = parseRouteError(useRouteError());
  return (
    <section>
      <p>{error.status}</p>
      <p>{error.message}</p>
    </section>
  );
};

export default Error;
