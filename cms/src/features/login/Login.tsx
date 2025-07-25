import NavAnchor from "../../components/navAnchor/NavAnchor";
import LoginForm from "./components/LoginForm";
import { useAuth } from "../../hooks/useAuth";
import { usePrevLocation } from "../../hooks/usePrevLocation";
import { Navigate, useLocation } from "@tanstack/react-router";

const Login = () => {
  const { accessToken } = useAuth();
  const location = useLocation();
  const { prevLocation } = usePrevLocation();
  console.group("Login component rendering...");
  // console.log("prevLocation:", prevLocation);
  // If accessToken exists (user is logged in)
  //  Navigate the user to their dashboard or the previous location
  if (accessToken) {
    console.log("[Login component] location:", location);
    console.log("[Login component] preLocation:", prevLocation);
    /* if (location.state?.prevLocation) {
      return <Navigate to={location.state.prevLocation} />;
    } else {
      return (
        <Navigate
          to={
            !prevLocation || prevLocation === "/login"
              ? "/dashboard"
              : prevLocation
          }
        />
      );
    } */

    // return (
    //   <Navigate
    //     to={
    //       !prevLocation || prevLocation === "/login"
    //         ? "/dashboard"
    //         : prevLocation
    //     }
    //   />
    // );

    // return <Navigate to={location.search?.redirect} />;
  }

  return (
    <section>
      <h2>Sign in</h2>

      <LoginForm prevLocation={prevLocation} />

      <p>
        <span>New here? </span>
        <NavAnchor pathname="/signup" textContent="Sign up" />
      </p>

      <p>
        <NavAnchor pathname="/" textContent="Home" />
      </p>
    </section>
  );
};

export default Login;
