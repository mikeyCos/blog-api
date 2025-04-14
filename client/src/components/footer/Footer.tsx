import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles["footer"]}>
      <ul className={styles["footer-main"]}>
        <li>Footer</li>
        <ul>
          <li>
            <a href="https://github.com/mikeyCos" target="_blank">
              GitHub
            </a>
          </li>
        </ul>
      </ul>
    </footer>
  );
};

export default Footer;
