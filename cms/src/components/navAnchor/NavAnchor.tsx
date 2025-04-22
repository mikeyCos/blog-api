import React from "react";
import { NavLink } from "react-router";

interface Props {
  pathname: string;
  textContent: string;
}

const NavAnchor: React.FC<Props> = ({ pathname, textContent }) => {
  return <NavLink to={`${pathname}`}>{textContent}</NavLink>;
};

export default NavAnchor;
