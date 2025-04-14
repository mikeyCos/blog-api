import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Faq from "../pages/faq/Faq";
import Error from "../pages/error/Error";
import Pizza from "../pages/pizza/Pizza";

const routes = [
  {
    id: "root",
    element: <DefaultLayout />,
    errorElement: <Error />,
    children: [
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
      {
        path: "/pizza",
        element: <Pizza />,
      },
    ],
  },
];

export default routes;
