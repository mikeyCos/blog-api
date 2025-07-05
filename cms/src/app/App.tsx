import { RouterProvider } from "@tanstack/react-router";

import AuthProvider, { useAuth } from "../hooks/useAuth";
import UserProvider from "../hooks/useUser";
import PrevLocationProvider from "../hooks/usePrevLocation";
import router from "../config/router.config";

const InnerApp = () => {
  const auth = useAuth();
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
