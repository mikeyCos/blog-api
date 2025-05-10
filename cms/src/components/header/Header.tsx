import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import NavAnchor from "../navAnchor/NavAnchor";
import styles from "./Header.module.css";
import { useAuth } from "../../hooks/useAuth";

const Header: React.FC = () => {
  const { accessToken, logout } = useAuth();
  const location = useLocation();
  const from = location.pathname;
  const navigate = useNavigate();

  const logoutHandler = async () => {
    console.log("logoutHandler running...");
    // navigate(from, { replace: true });
    await logout();
    // navigate(from, { replace: true });
    // console.log("location:", location);
    // navigate("/login", { state: { from: location }, replace: true });
    // navigate("/");
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

          {accessToken ? (
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
