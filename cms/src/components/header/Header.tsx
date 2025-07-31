import React, { useEffect } from "react";

import NavAnchor from "../navAnchor/NavAnchor";
import styles from "./Header.module.css";
import { useAuth } from "../../hooks/useAuth";
import { usePrevLocation } from "../../hooks/usePrevLocation";
import { useUserData } from "../../hooks/useUser";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import router from "../../config/router.config";

const Header: React.FC = () => {
  const { accessToken, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const from = location.pathname;
  const navigate = useNavigate();
  console.group("Header component rendering...");
  // console.log("prevLocation in Header component:", prevLocation);
  // console.log("from in Header component:", from);
  console.log("accessToken in Header component:", accessToken);
  console.log("isAuthenticated in Header component:", isAuthenticated);
  console.groupEnd();
  // TODO
  // Should the user be redirected to the home page or the page they are logging out from?
  // Problem
  //  accessToken is not getting updated right away
  //  Cannot redirect user to page they are logging out from
  //  For example,
  //    Logging out from /faq should return the user to /faq, not /login
  const handleLogout = async () => {
    console.group("handleLogout running...");
    console.log("location:", location);
    console.groupEnd();
    await logout();
    router.invalidate();
    navigate({ to: from, replace: true });
  };

  return (
    <header>
      <nav>
        <ul className={styles["nav-left"]}>
          <li>
            <Link to="/">
              <h1>Project Name</h1>
            </Link>
          </li>
        </ul>

        <ul className={styles["nav-right"]}>
          <li>
            <NavAnchor pathname="/" textContent="home" />
          </li>

          <li>
            <NavAnchor pathname="/faq" textContent="faq" />
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <NavAnchor pathname="/dashboard" textContent="dashboard" />
              </li>

              <li>
                <button type="button" onClick={handleLogout}>
                  Log out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavAnchor pathname="/login" textContent="login" />
              </li>

              <li>
                <NavAnchor pathname="/signup" textContent="sign up" />
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
  /* return (
    <header>
      <nav>
        <ul className={styles["nav-left"]}>
          <li>
            <Link to="/">
              <h1>Project Name</h1>
            </Link>
          </li>
        </ul>

        <ul className={styles["nav-right"]}>
          <li>
            <NavAnchor pathname="/" textContent="home" />
          </li>

          <li>
            <NavAnchor pathname="/faq" textContent="faq" />
          </li>

          <li>
            <NavAnchor pathname="/login" textContent="login" />
          </li>

          <li>
            <NavAnchor pathname="/signup" textContent="sign up" />
          </li>
        </ul>
      </nav>
    </header>
  ); */
};

export default Header;
