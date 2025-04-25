import React from "react";

import NavAnchor from "../../components/navAnchor/NavAnchor";
import LoginForm from "./components/LoginForm";

const SignIn: React.FC = () => {
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
