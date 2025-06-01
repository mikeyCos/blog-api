import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import NavAnchor from "../navAnchor/NavAnchor";
import styles from "./Header.module.css";
import { useAuth } from "../../hooks/useAuth";
import { usePrevLocation } from "../../hooks/usePrevLocation";

const Header: React.FC = () => {
  const { accessToken, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const from = location.pathname;
  const navigate = useNavigate();
  const { prevLocation } = usePrevLocation();
  console.log("Header component rendering...");
  // console.log("prevLocation in Header component:", prevLocation);
  // console.log("from in Header component:", from);
  // console.log("accessToken in Header component:", accessToken);
  // TODO
  // Should the user be redirected to the home page or the page they are logging out from?
  // Problem
  //  accessToken is not getting updated right away
  //  Cannot redirect user to page they are logging out from
  //  For example,
  //    Logging out from /faq should return the user to /faq, not /login
  const logoutHandler = async () => {
    console.log("logoutHandler running...");
    // const isLogout = await logout();
    await logout();
    console.group();
    console.log("prevLocation:", prevLocation);
    console.log("from:", from);
    console.log("accessToken:", accessToken);
    console.groupEnd();
    // console.log("isLogout:", isLogout);
    // navigate(prevLocation ?? "/");
    navigate(from), { replace: true };
    // navigate("/");
    // logout();
  };

  useEffect(() => {
    console.log("Header component mounted...");
    console.log("isAuthenticated changed");
    console.log("accessToken:", accessToken);
    console.log("isAuthenticated:", isAuthenticated);
  }, [isAuthenticated]);

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
                <button type="button" onClick={logoutHandler}>
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
};

export default Header;

/* 
<ul className={styles["nav-right"]}>
          <li>
            <NavAnchor pathname="/home" textContent="home" />
          </li>

          <li>
            <NavAnchor pathname="/faq" textContent="faq" />
          </li>

          {isAuthorized ? (
            <>
              <li>
                <NavAnchor pathname="/dashboard" textContent="dashboard" />
              </li>

              <li>
                <button type="button" onClick={logoutHandler}>
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
*/
