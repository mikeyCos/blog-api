import { RouterProvider } from "@tanstack/react-router";

import AuthProvider, { useAuth } from "../hooks/useAuth";
import UserProvider from "../hooks/useUser";
import router from "../config/router.config";
import React, { useCallback, useState } from "react";
import AxiosPrivateProvider, {
  useAxiosPrivate,
  useAxiosPrivateConfig,
} from "../hooks/useAxiosPrivate";

const InnerApp = () => {
  console.group("InnerApp running...");
  const auth = useAuth();
  const axiosPrivate = useAxiosPrivate();
  console.log("auth:", auth);
  console.groupEnd();
  if (auth.isLoading) {
    return <p>Loading...</p>;
  }

  return <RouterProvider router={router} context={{ auth, axiosPrivate }} />;
};

const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  console.log("[AppProviders] rendering...");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  // const getAccessToken = useCallback(() => accessToken, [accessToken]);
  const updateAccessToken = useCallback((newAccessToken: string | null) => {
    setAccessToken(newAccessToken);
  }, []);

  const axiosPrivate = useAxiosPrivateConfig({
    accessToken,
    updateAccessToken,
  });

  return (
    <>
      <AuthProvider
        accessToken={accessToken}
        updateAccessToken={updateAccessToken}
        axiosPrivate={axiosPrivate}
      >
        <AxiosPrivateProvider axiosPrivate={axiosPrivate}>
          <UserProvider>{children}</UserProvider>
        </AxiosPrivateProvider>
      </AuthProvider>
    </>
  );
};

const App = () => {
  return (
    <div id="app">
      <AppProviders>
        <InnerApp />
      </AppProviders>
    </div>
  );
};

export default App;
