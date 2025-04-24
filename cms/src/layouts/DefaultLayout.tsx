import React from "react";
import { Outlet } from "react-router";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const DefaultLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Header />
      <main>{children ?? <Outlet />}</main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
