import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
// import axios from "axios";

import axios from "../../../config/axios.config";
import { LoginFormError } from "../../../types/errors";
// import config from "../../../config/env.config";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router";

const LoginForm: React.FC = () => {
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

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const input = e.currentTarget;
    const { id, value } = input;
    setFormData({
      ...formData,
      [id]: {
        value,
      },
    });
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log("form submit handler running...");
    const body = new URLSearchParams();

    // '...expression of type string cannot be used to index...'
    // https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
    for (const input of Object.keys(formData)) {
      console.log(formData[input as keyof typeof initialFormData]);
      body.append(input, formData[input as keyof typeof formData].value);
    }

    /* const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const body = new URLSearchParams();

    for (const input of formData) {
      const [key, value] = input;
      // value is type FormDataEntryValue which can be a string or File object
      body.append(key, value as string);
    }*/

    /* await fetch(`${config.blogAPIBase}/auth/login`, {
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
        // console.log("result.data.token:", result.data["access_token"]);
        // login(JSON.stringify(result.data["access_token"]));
        // navigate("/dashboard");

        console.log("result:", result);
        // Store access_token in state
        setFormData(initialFormData);
        setErrors(null);

        // login(JSON.stringify(result.data["access_token"]));
      }
    }); */

    await axios.post("/auth/login", body).then(
      (res) => {
        console.log(res);
        // res.response.data.data["access-token"]
        setFormData(initialFormData);
        setErrors(null);
      },
      (rej) => {
        console.log(rej);
        setErrors(rej.response.data.data);
      }
    );
  };

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  // Do I really need to erase inputs after successful POSt request?
  return (
    <form method="POST" onSubmit={submitHandler}>
      <ul>
        <li>
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={onChangeHandler}
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
            onChange={onChangeHandler}
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
