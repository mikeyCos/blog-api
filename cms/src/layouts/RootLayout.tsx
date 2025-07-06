import { Outlet } from "@tanstack/react-router";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const RootLayout = () => {
  console.log("RootLayout running..");

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

export default RootLayout;
