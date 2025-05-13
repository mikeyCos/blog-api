import React, { useEffect } from "react";

import NavAnchor from "../../components/navAnchor/NavAnchor";
import LoginForm from "./components/LoginForm";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, useNavigate } from "react-router";
import { usePrevLocation } from "../../hooks/usePrevLocation";

const SignIn = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  // const { prevLocationRef } = usePrevLocation();
  const { prevLocation } = usePrevLocation();
  console.log("SignIn component");
  console.log("accessToken:", accessToken);
  // if (accessToken) return <Navigate to={"/dashboard"} />;
  // console.log("prevLocationRef in SignIn component:", prevLocationRef);

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
