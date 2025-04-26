import React, { FormEventHandler, useState } from "react";

import { SignUpFormError } from "../../../types/errors";
import config from "../../../config/env.config";

const SignUpForm: React.FC = () => {
  const [errors, setErrors] = useState<SignUpFormError>();

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
    await fetch(`${config.blogAPIBase}/auth/signup`, {
      method: "POST",
      mode: "cors",
      body,
    }).then(async (res) => {
      const result = await res.json();
      if (!res.ok) {
        setErrors(result.data);
      }

      console.log("res:", res);
      console.log("result:", result);
      // Extract token from result
      // Store token in local storage
      // Redirect user to dashboard
      const { token } = result.data;
      console.log("token:", token);
    });
  };

  return (
    <form
      action={`${config.blogAPIBase}/auth/signup`}
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
          <label htmlFor="email">email</label>
          <input type="email" name="email" id="email" />
          {errors?.email && <p>{errors.email.msg}</p>}
        </li>
        <li>
          <label htmlFor="password">password</label>
          <input type="password" name="password" id="password" />
          {errors?.password && <p>{errors.password.msg}</p>}
        </li>
        <li>
          <label htmlFor="password-confirmation">confirm password</label>
          <input
            type="password"
            name="password-confirmation"
            id="password-confirmation"
          />
          {errors?.["password-confirmation"] && (
            <p>{errors["password-confirmation"].msg}</p>
          )}
        </li>
        <li className="form-controls">
          {errors?.message && <p>{errors.message}</p>}
          <button type="submit">Sign up</button>
        </li>
      </ul>
    </form>
  );
};

export default SignUpForm;
