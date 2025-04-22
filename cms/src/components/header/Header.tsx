import React from "react";
import { Link } from "react-router";
import NavAnchor from "../navAnchor/NavAnchor";
import styles from "./Header.module.css";

const Header: React.FC = () => {
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

          <li>
            <NavAnchor pathname="/pizza" textContent="pizza" />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
