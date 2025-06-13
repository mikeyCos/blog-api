import React from "react";
import { NavLink } from "react-router";

/* interface Props<T = void> {
  pathname: string;
  textContent: string;
  state?: T;
} */
interface Props<T = void> {
  pathname: string;
  textContent: string;
  state?: T;
}

/* How to use generics for props in React functional component?
 * https://stackoverflow.com/a/66052574
 */
const NavAnchor = <T,>({ pathname, textContent, state }: Props<T>) => {
  return (
    <NavLink to={`${pathname}`} state={state}>
      {textContent}
    </NavLink>
  );
};

export default NavAnchor;
