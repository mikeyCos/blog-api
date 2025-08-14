import { Outlet } from "@tanstack/react-router";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useAuth } from "../hooks/useAuth";

const RootLayout = () => {
  console.log("[RootLayout] rendering...");
  const auth = useAuth();

  console.log("auth:", auth);

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

// Why does Header component render 4 times in Strict Mode?
