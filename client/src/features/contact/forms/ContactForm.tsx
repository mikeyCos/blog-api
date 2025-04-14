import React from "react";

const ContactForm: React.FC = () => {
  return (
    <form action="#" method="POST">
      <ul>
        <li>
          <label htmlFor="first-name">First Name</label>
          <input type="text" name="firstName" id="first-name" />
        </li>
        <li>
          <label htmlFor="last-name">Last Name</label>
          <input type="text" name="lastName" id="last-name" />
        </li>
        <li>
          <label htmlFor="">Email</label>
          <input type="email" name="email" id="email" />
        </li>
        <li>
          <label htmlFor="message">Message</label>
          <textarea name="message" id="message"></textarea>
        </li>
        <li>
          <button type="button">Clear</button>
          <button type="submit">Submit</button>
        </li>
      </ul>
    </form>
  );
};

export default ContactForm;
