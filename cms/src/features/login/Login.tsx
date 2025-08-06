import NavAnchor from "../../components/navAnchor/NavAnchor";
import LoginForm from "./components/LoginForm";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, useSearch } from "@tanstack/react-router";

const Login = () => {
  const { accessToken, isAuthenticated } = useAuth();
  // const location = useLocation();
  const searchParams = useSearch({
    from: "/login",
    select: (params: { redirect?: string }) => params,
  });
  console.group("Login component rendering...");
  console.log("accessToken:", accessToken);
  console.log("isAuthenticated:", isAuthenticated);
  // console.log("prevLocation:", prevLocation);
  // If accessToken exists (user is logged in)
  //  Navigate the user to their dashboard or the previous location
  if (accessToken) {
    console.log("[Login component] searchParams:", searchParams);
    console.log(
      "[Login component] searchParams.redirect:",
      searchParams.redirect
    );
    const redirectTo = searchParams.redirect ?? "/dashboard";
    console.log("redirectTo:", redirectTo);
    return <Navigate to={"/dashboard"} href={redirectTo} replace={true} />;
  }

  return (
    <section>
      <h2>Login</h2>

      <LoginForm />

      <p>
        <span>New here? </span>
        <NavAnchor pathname="/signup" textContent="Create account" />
      </p>

      <p>
        <NavAnchor pathname="/" textContent="Home" />
      </p>
    </section>
  );
};

export default Login;
