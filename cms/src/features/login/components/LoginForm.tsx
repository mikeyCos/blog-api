import React from "react";

const LoginForm: React.FC = () => {
  return (
    <form action="#" method="POST">
      <ul>
        <li>
          <label htmlFor="username">username</label>
          <input type="text" name="username" id="username" />
        </li>
        <li>
          <label htmlFor="password">Last Name</label>
          <input type="text" name="password" id="password" />
        </li>
        <li>
          <button type="submit">Log in</button>
        </li>
      </ul>
    </form>
  );
};

export default LoginForm;
