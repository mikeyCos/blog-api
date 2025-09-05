import React, {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
// import axios from "axios";
import { useNavigate } from "@tanstack/react-router";
import { isAxiosError } from "axios";

import axiosDefault from "../../../config/axios.config";
import { LoginFormError } from "../../../interfaces/errors";
import { useAuth } from "../../../hooks/useAuth";

import {
  AuthSuccessResponse,
  LoginErrorResponse,
} from "../../../interfaces/responses";
import router from "../../../config/router.config";
import { useUser } from "../../../hooks/useUser";

const LoginForm: React.FC = () => {
  console.log("[LoginForm] rendering...");
  const userRef = useRef<HTMLInputElement | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const initialFormData = {
    username: {
      value: "",
    },
    password: {
      value: "",
    },
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<LoginFormError | null>(null);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const input = e.currentTarget;
    const { id, value } = input;
    setFormData({
      ...formData,
      [id]: {
        value,
      },
    });
  };

  const handlerSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log("handlerSubmit running...");
    const body = new URLSearchParams();

    // '...expression of type string cannot be used to index...'
    // https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
    for (const input of Object.keys(formData)) {
      console.log(formData[input as keyof typeof initialFormData]);
      body.append(input, formData[input as keyof typeof formData].value);
    }

    try {
      const response = await axiosDefault.post<AuthSuccessResponse>(
        "/auth/login",
        body,
        { withCredentials: true }
      );

      login(response.data.accessToken);
      setFormData(initialFormData);
      setErrors(null);
    } catch (err) {
      if (isAxiosError<LoginErrorResponse>(err) && err.response) {
        const { data } = err.response;
        setErrors(data.errors || data);
      } else {
        console.error(err);
      }
    }
  };

  // console.log("prevLocationRef in LoginForm component:", prevLocationRef);
  useEffect(() => {
    userRef.current?.focus();
    console.log("LoginForm mounted");
    // console.log("prevLocation:", prevLocation);
    // console.log("errors:", errors);
  }, []);

  // Do I really need to erase inputs after successful POSt request?
  return (
    <form method="POST" onSubmit={handlerSubmit}>
      <ul>
        <li>
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleInputChange}
            value={formData.username.value}
            ref={userRef}
            autoComplete="off"
            // required
          />
          {errors?.username && <p>{errors.username.msg}</p>}
        </li>
        <li>
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleInputChange}
            value={formData.password.value}
            autoComplete="off"
            // required
          />
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
