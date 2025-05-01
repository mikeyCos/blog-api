import React from "react";
import { Navigate } from "react-router";

import SignUpForm from "./components/SignUpForm";
import { useAuth } from "../../hooks/useAuth";

const SignUp: React.FC = () => {
  const { accessToken } = useAuth();

  if (accessToken) return <Navigate to={"/dashboard"} />;

  return (
    <section>
      <h2>Sign in</h2>
      <SignUpForm />
    </section>
  );
};

export default SignUp;
