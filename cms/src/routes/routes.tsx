import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Faq from "../pages/faq/Faq";
import Error from "../pages/error/Error";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/login/Login";

// Go to landing page if user is not logged in
// If user tries to go to a protected route, they are redirected to the sign in page
// If user is logged in and they try to go to the sign in page, they are redirected to their dashboard

const routes = [
  {
    id: "root",
    element: <DefaultLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/dashboard?",
        element: <Dashboard />,
      },
      {
        path: "/home",
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
    path: "login",
    element: <Login />,
  },
];

export default routes;
