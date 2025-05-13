import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import PrevLocationProvider from "../hooks/usePrevLocation";

const DefaultLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  console.log("DefaultLayout running..");

  /*  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    console.log("DefaultLayout location:", location);
  }, []); */

  return (
    <>
      <Header />
      <main>{children ?? <Outlet />}</main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
