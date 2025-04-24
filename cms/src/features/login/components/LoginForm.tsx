import React, { FormEventHandler, useState } from "react";

import { LoginFormError } from "../../../types/errors";
// import config from "../../../config/config";

const LoginForm: React.FC = () => {
  const [errors, setErrors] = useState<LoginFormError>();

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log("form submit handler running...");
    console.log("e.currentTarget:", e.currentTarget);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const body = new URLSearchParams();
    for (const input of formData.entries()) {
      console.log(input);
    }
    for (const input of formData) {
      const [key, value] = input;
      // value is type FormDataEntryValue which can be a string or File object
      body.append(key, value as string);
    }
    await fetch(`${import.meta.env.VITE_BLOG_API_BASE}/auth/login`, {
      method: "POST",
      mode: "cors",
      body,
    }).then(async (res) => {
      console.log("res:", res);
      const result = await res.json();
      if (!res.ok) {
        setErrors(result.data);
        console.log(result.data);
      }
    });
  };

  return (
    <form
      action={`${import.meta.env.VITE_BLOG_API_BASE}/auth/login`}
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
          <input type="text" name="password" id="password" />
          {errors?.password && <p>{errors.password.msg}</p>}
        </li>
        <li>
          {errors?.message && <p>{errors.message}</p>}
          <button type="submit">Log in</button>
        </li>
      </ul>
    </form>
  );
};

export default LoginForm;
