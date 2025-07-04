import React from "react";
// import { Navigate } from "react-router";

import SignUpForm from "./components/SignUpForm";
import { useAuth } from "../../hooks/useAuth";
import { usePrevLocation } from "../../hooks/usePrevLocation";

const SignUp = () => {
  // const { accessToken } = useAuth();
  // const { prevLocation } = usePrevLocation();
  // console.log("prevLocation:", prevLocation);
  // if (accessToken) return <Navigate to={"/dashboard"} />;

  return (
    <section>
      <h2>Sign up</h2>
      {/* <SignUpForm /> */}
    </section>
  );
};

export default SignUp;
