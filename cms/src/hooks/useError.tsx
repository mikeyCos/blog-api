import { useCallback, useState } from "react";

/* Catching Asynchronous Errors in React using Error Boundaries
 * https://medium.com/trabe/catching-asynchronous-errors-in-react-using-error-boundaries-5e8a5fd7b971
 * Need to try this: https://www.npmjs.com/package/react-error-boundary
 */
const useError = () => {
  const [_, setError] = useState<null>(null);
  return useCallback(
    (e: unknown) => {
      setError(() => {
        throw e;
      });
    },
    [setError]
  );
};

export default useError;
