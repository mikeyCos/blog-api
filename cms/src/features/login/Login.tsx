import NavAnchor from "../../components/navAnchor/NavAnchor";
import LoginForm from "./components/LoginForm";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import { usePrevLocation } from "../../hooks/usePrevLocation";

const SignIn = () => {
  const { accessToken } = useAuth();
  const location = useLocation();
  const { prevLocation } = usePrevLocation();
  console.log("SignIn component");
  console.log("accessToken:", accessToken);
  console.log("prevLocation:", prevLocation);
  // If accessToken exists (user is logged in)
  //  Navigate the user to their dashboard or the previous location
  if (accessToken) {
    console.log("location:", location);
    if (location.state?.prevLocation) {
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
    }
  }

  return (
    <section>
      <h2>Sign in</h2>
      <LoginForm prevLocation={prevLocation} />
      <p>
        <span>New here? </span>
        <NavAnchor pathname="/signup" textContent="Sign up" />
      </p>
    </section>
  );
};

export default SignIn;
