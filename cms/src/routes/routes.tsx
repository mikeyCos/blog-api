import { Outlet, RouteObject } from "react-router";

import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Faq from "../pages/faq/Faq";
import Error from "../features/error/Error";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../features/login/Login";
import SignUp from "../features/signup/SignUp";

import ProtectedLayout from "../layouts/ProtectedLayout";
import PrevLocationProvider from "../hooks/usePrevLocation";
import DashboardLayout from "../layouts/DashboardLayout";
import Posts from "../features/posts/Posts";
import Comments from "../features/comments/Comments";
import Post from "../pages/post/Post";
import postLoader from "../pages/post/postLoader";
import EditPost from "../pages/editPost/EditPost";
import editPostLoader from "../pages/editPost/editPostLoader";
import ModalProvider from "../hooks/useModal";

// If no user is logged in
//  Go to home page
//  If user goes to a protected route, they are redirected to the sign in page
// If user is logged in
//  Go to dashboard
//  If user goes to the sign in page, they are redirected to their dashboard

// useLocation hook can be used on all routes
const RootLayout: React.FC = () => {
  return (
    <PrevLocationProvider>
      <ModalProvider>
        <Outlet />
      </ModalProvider>
    </PrevLocationProvider>
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
                element: <DashboardLayout />,
                children: [
                  {
                    path: "/dashboard",
                    element: <Dashboard />,
                  },
                  {
                    path: "/:username/posts",
                    element: <Posts />,
                  },
                  {
                    path: "/:username/comments",
                    element: <Comments />,
                  },
                  {
                    path: "/:username/posts/:postPublicId/:postTitle",
                    element: <Post />,
                    loader: postLoader,
                  },
                  {
                    path: "/:username/posts/:postPublicId/:postTitle/edit",
                    element: <EditPost />,
                    loader: editPostLoader,
                  },
                ],
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

/* /:username/posts
 * How to view any users' posts if the authenticated user is an admin?
 * Or should all paths under /admin be for all admin behaviors?
 */
