import { RouterProvider } from "@tanstack/react-router";

import AuthProvider, { useAuth } from "../hooks/useAuth";
import UserProvider from "../hooks/useUser";
import router from "../config/router.config";

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
};

export default App;
