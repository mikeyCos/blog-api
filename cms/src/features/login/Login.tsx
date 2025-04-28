import React from "react";

import NavAnchor from "../../components/navAnchor/NavAnchor";
import LoginForm from "./components/LoginForm";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router";

const SignIn: React.FC = () => {
  const { token, isAuthorized } = useAuth();
  console.log(token);
  if (isAuthorized) return <Navigate to="/dashboard" />;

  return (
    <section>
      <h2>Sign in</h2>
      <LoginForm />
      <p>
        <span>New here? </span>
        <NavAnchor pathname="/signup" textContent="Sign up" />
      </p>
    </section>
  );
};

export default SignIn;
