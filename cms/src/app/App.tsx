import { RouterProvider } from "@tanstack/react-router";

import AuthProvider, { useAuth } from "../hooks/useAuth";
import UserProvider, { useUser } from "../hooks/useUser";
import router from "../config/router.config";
import React, { useCallback, useEffect, useState } from "react";
import AxiosPrivateProvider, {
  useAxiosPrivate,
  useAxiosPrivateConfig,
} from "../hooks/useAxiosPrivate";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../config/query.config";

const InnerApp = () => {
  console.group("InnerApp running...");
  const auth = useAuth();
  const user = useUser();
  const axiosPrivate = useAxiosPrivate();
  console.log("auth:", auth);
  console.log("user:", user);
  console.log("axiosPrivate:", axiosPrivate);
  console.groupEnd();
  // if (auth.isLoading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <RouterProvider router={router} context={{ auth, axiosPrivate, user }} />
  );
};

const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  console.log("[AppProviders] rendering...");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const updateAccessToken = useCallback((newAccessToken: string | null) => {
    setAccessToken(newAccessToken);
  }, []);

  const axiosPrivate = useAxiosPrivateConfig({
    accessToken,
    updateAccessToken,
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider
          accessToken={accessToken}
          updateAccessToken={updateAccessToken}
          axiosPrivate={axiosPrivate}
        >
          <AxiosPrivateProvider axiosPrivate={axiosPrivate}>
            <UserProvider>{children}</UserProvider>
          </AxiosPrivateProvider>
        </AuthProvider>
      </QueryClientProvider>
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
