import React from "react";
import { Navigate } from "react-router";

import SignUpForm from "./components/SignUpForm";
import { useAuth } from "../../hooks/useAuth";
import { usePrevLocation } from "../../hooks/usePrevLocation";

const SignUp: React.FC = () => {
  const { accessToken } = useAuth();
  // const { prevLocationRef } = usePrevLocation();
  // console.log("prevLocationRef in SignUp component:", prevLocationRef);
  const { prevLocation } = usePrevLocation();
  console.log("prevLocation:", prevLocation);
  if (accessToken) return <Navigate to={"/dashboard"} />;

  return (
    <section>
      <h2>Sign in</h2>
      <SignUpForm />
    </section>
  );
};

export default SignUp;
