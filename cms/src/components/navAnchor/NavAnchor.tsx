import { Link } from "@tanstack/react-router";

/* interface Props<T = void> {
  pathname: string;
  textContent: string;
  state?: T;
} */
interface Props<T = void> {
  pathname: string;
  textContent: string;
}

/* How to use generics for props in React functional component?
 * https://stackoverflow.com/questions/53958028/how-to-use-generics-in-props-in-react-in-a-functional-component/66052574#66052574
 */
const NavAnchor = <T,>({ pathname, textContent }: Props<T>) => {
  return <Link to={`${pathname}`}>{textContent}</Link>;
};

export default NavAnchor;
