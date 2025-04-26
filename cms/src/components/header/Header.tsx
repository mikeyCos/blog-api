import React from "react";
import { Link } from "react-router";

import NavAnchor from "../navAnchor/NavAnchor";
import styles from "./Header.module.css";
import { useAuth } from "../../hooks/useAuth";

const Header: React.FC = () => {
  const { token } = useAuth();

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

          {token ? (
            <li>
              <NavAnchor pathname="/logout" textContent="logout" />
            </li>
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
