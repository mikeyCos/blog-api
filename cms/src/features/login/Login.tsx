import NavAnchor from "../../components/navAnchor/NavAnchor";
import LoginForm from "./components/LoginForm";
import { useAuth } from "../../hooks/useAuth";
import { usePrevLocation } from "../../hooks/usePrevLocation";
import { Navigate, useLocation, useSearch } from "@tanstack/react-router";
import router from "../../config/router.config";

const Login = () => {
  const { accessToken } = useAuth();
  // const location = useLocation();
  const searchParams = useSearch({
    from: "/login",
    select: (params: { redirect?: string }) => params,
  });
  console.group("Login component rendering...");
  // console.log("prevLocation:", prevLocation);
  // If accessToken exists (user is logged in)
  //  Navigate the user to their dashboard or the previous location
  if (accessToken) {
    console.log("[Login component] location:", location);
    console.log("[Login component] searchParams:", searchParams);
    console.log(
      "[Login component] searchParams.redirect:",
      searchParams.redirect
    );
    const redirectTo = searchParams.redirect ?? "/dashboard";
    console.log("redirectTo:", redirectTo);
    // return <Navigate to={"/dashboard"} href={redirectTo} replace={true} />;
  }

  const redirectTo = searchParams.redirect ?? "/dashboard";

  return (
    <section>
      <h2>Sign in</h2>

      <LoginForm redirectTo={redirectTo} />

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
