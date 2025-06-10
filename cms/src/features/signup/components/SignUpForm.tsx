import React, { FormEventHandler, useState } from "react";

import { SignUpFormError } from "../../../interfaces/errors";
import config from "../../../config/env.config";
import axios from "../../../config/axios.config";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import {
  AuthSuccessResponse,
  SignupErrorResponse,
} from "../../../interfaces/responses";
import { isAxiosError } from "axios";

const SignUpForm: React.FC = () => {
  // TODO
  // Create state for input
  const [errors, setErrors] = useState<SignUpFormError>();
  const { login } = useAuth();
  const navigate = useNavigate();

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

    try {
      const response = await axios.post<AuthSuccessResponse>(
        "/auth/signup",
        body
      );
      login(response.data.accessToken);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      if (isAxiosError<SignupErrorResponse>(err)) {
        if (err.response) {
          const { data } = err.response;
          return setErrors(data.errors);
        }
        setErrors({ msg: err.message });
      } else {
        console.error(err);
      }
    }
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
          {errors?.msg && <p>{errors.msg}</p>}
          <button type="submit">Sign up</button>
        </li>
      </ul>
    </form>
  );
};

export default SignUpForm;
