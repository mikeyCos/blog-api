import { Outlet, RouteObject } from "react-router";

import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../features/home/Home";
import About from "../features/about/About";
import Faq from "../features/faq/Faq";
import Error from "../features/error/Error";
import Dashboard from "../features/dashboard/Dashboard";
import Login from "../features/login/Login";
import SignUp from "../features/signup/SignUp";

import ProtectedRoute from "./ProtectedRoute";
import ProtectedLayout from "../layouts/ProtectedLayout";
import PrevLocationProvider from "../hooks/usePrevLocation";

// If no user is logged in
//  Go to home page
//  If user goes to a protected route, they are redirected to the sign in page
// If user is logged in
//  Go to dashboard
//  If user goes to the sign in page, they are redirected to their dashboard

const RootLayout: React.FC = () => {
  return (
    <>
      <PrevLocationProvider>
        <Outlet />
      </PrevLocationProvider>
    </>
  );
};

const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    errorElement: (
      <DefaultLayout>
        <Error />
      </DefaultLayout>
    ),
    children: [
      {
        path: "/",
        element: <DefaultLayout />,
        children: [
          {
            element: <ProtectedLayout />,
            children: [
              {
                path: "/dashboard",
                element: <Dashboard />,
              },
            ],
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
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
