import React, { FormEventHandler, useState } from "react";

import { LoginFormError } from "../../../types/errors";
import config from "../../../config/env.config";
import { useAuth } from "../../../hooks/useAuth";

const LoginForm: React.FC = () => {
  const [errors, setErrors] = useState<LoginFormError>();
  const { login } = useAuth();

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log("form submit handler running...");
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const body = new URLSearchParams();

    for (const input of formData) {
      const [key, value] = input;
      // value is type FormDataEntryValue which can be a string or File object
      body.append(key, value as string);
    }

    await fetch(`${config.blogAPIBase}/auth/login`, {
      method: "POST",
      mode: "cors",
      body,
    }).then(async (res) => {
      console.log("res:", res);
      const result = await res.json();
      if (!res.ok) {
        setErrors(result.data);
      } else {
        // Extract token from result
        // Store token in local storage
        // Redirect user to dashboard
        console.log("result.data.token:", result.data.token);
        login(JSON.stringify(result.data.token));
      }
    });
  };

  return (
    <form
      action={`${config.blogAPIBase}/auth/login`}
      method="POST"
      onSubmit={submitHandler}
    >
      <ul>
        <li>
          <label htmlFor="username">username</label>
          <input type="text" name="username" id="username" />
          {errors?.username && <p>{errors.username.msg}</p>}
        </li>
        <li>
          <label htmlFor="password">password</label>
          <input type="password" name="password" id="password" />
          {errors?.password && <p>{errors.password.msg}</p>}
        </li>
        <li className="form-controls">
          {errors?.message && <p>{errors.message}</p>}
          <button type="submit">Sign in</button>
        </li>
      </ul>
    </form>
  );
};

export default LoginForm;
