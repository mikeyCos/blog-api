import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../features/home/Home";
import About from "../features/about/About";
import Faq from "../features/faq/Faq";
import Error from "../features/error/Error";
import Dashboard from "../features/dashboard/Dashboard";
import Login from "../features/login/Login";

import ProtectedRoute from "./ProtectedRoute";

// If no user is logged in
//  Go to home page
//  If user goes to a protected route, they are redirected to the sign in page
// If user is logged in
//  Go to dashboard
//  If user goes to the sign in page, they are redirected to their dashboard

const routes = [
  {
    id: "root",
    path: "/",
    element: <DefaultLayout />,
    errorElement: (
      <DefaultLayout>
        <Error />
      </DefaultLayout>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/home?",
        element: <Home />,
      },
      {
        path: "/About",
        element: <About />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export default routes;
