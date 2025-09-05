import { Link } from "@tanstack/react-router";
import React from "react";

interface Props {
  pathname: string;
  textContent: string;
}

/* How to use generics for props in React functional component?
 * https://stackoverflow.com/questions/53958028/how-to-use-generics-in-props-in-react-in-a-functional-component/66052574#66052574
 */
const NavAnchor: React.FC<Props> = ({ pathname, textContent }) => {
  return <Link to={pathname}>{textContent}</Link>;
};

export default NavAnchor;
