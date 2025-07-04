import React from "react";
import { Outlet } from "@tanstack/react-router";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
// import PrevLocationProvider from "../hooks/usePrevLocation";

const DefaultLayout = () => {
  console.log("DefaultLayout running..");

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
