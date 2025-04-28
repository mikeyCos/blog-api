import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";

import NavAnchor from "../navAnchor/NavAnchor";
import styles from "./Header.module.css";
import { useAuth } from "../../hooks/useAuth";

const Header: React.FC = () => {
  const { isAuthorized, logout } = useAuth();
  // const navigate = useNavigate();
  const logoutHandler = () => {
    console.log("logoutHandler running...");
    logout();
    // navigate("/");
    console.log("isAuthorized in logoutHandler:", isAuthorized);
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
                {/* <NavAnchor pathname="/logout" textContent="logout" /> */}
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
