import { RouterProvider } from "@tanstack/react-router";

import AuthProvider, { useAuth } from "../hooks/useAuth";
import UserProvider from "../hooks/useUser";
import router from "../config/router.config";
import React, { Children, useCallback, useState } from "react";
import useAxiosPrivateConfig from "../hooks/useAxiosPrivate";

const InnerApp = () => {
  console.group("InnerApp running...");
  const auth = useAuth();
  console.log("auth:", auth);
  console.groupEnd();
  if (auth.isLoading) {
    return <p>Loading...</p>;
  }

  return <RouterProvider router={router} context={{ auth }} />;
};

const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  console.log("[AppProviders] rendering...");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const getAccessToken = useCallback(() => accessToken, [accessToken]);
  const updateAccessToken = useCallback((newAccessToken: string | null) => {
    setAccessToken(newAccessToken);
  }, []);

  const axiosPrivate = useAxiosPrivateConfig({
    accessToken,
    setAccessToken,
    getAccessToken,
    updateAccessToken,
  });

  return (
    <>
      <AuthProvider
        accessToken={accessToken}
        updateAccessToken={updateAccessToken}
        axiosPrivate={axiosPrivate}
      >
        <UserProvider>{children}</UserProvider>
      </AuthProvider>
    </>
  );
};

const App = () => {
  return (
    <div id="app">
      <AuthProvider>
        <UserProvider>
          <InnerApp />
        </UserProvider>
      </AuthProvider>
    </div>
  );

  // return (
  //   <div id="app">
  //     <AppProviders>
  //       <InnerApp />
  //     </AppProviders>
  //   </div>
  // );
};

export default App;
