import React, {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
// import axios from "axios";

import axiosDefault from "../../../config/axios.config";
import { LoginFormError } from "../../../types/errors";
// import config from "../../../config/env.config";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router";

const LoginForm: React.FC<{ prevLocation: string | null }> = ({
  prevLocation,
}) => {
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
    const from = prevLocation ?? "/dashboard";
    console.log("form submit handler running...");
    console.log("from:", from);
    const body = new URLSearchParams();

    // '...expression of type string cannot be used to index...'
    // https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
    for (const input of Object.keys(formData)) {
      console.log(formData[input as keyof typeof initialFormData]);
      body.append(input, formData[input as keyof typeof formData].value);
    }

    await axiosDefault
      .post("/auth/login", body, { withCredentials: true })
      .then(
        (res) => {
          console.log("res:", res);
          // res.response.data.data["access-token"]
          login(res.data["accessToken"]);
          setFormData(initialFormData);
          setErrors(null);
          console.log("from:", from);
          navigate(from, { replace: true });
        },
        (rej) => {
          console.log("rej:", rej);
          setErrors(rej.response.data.message);
        }
      );
  };

  // console.log("prevLocationRef in LoginForm component:", prevLocationRef);
  useEffect(() => {
    userRef.current?.focus();
    console.log("LoginForm mounted");
    console.log("prevLocation:", prevLocation);
    // console.log("errors:", errors);
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
