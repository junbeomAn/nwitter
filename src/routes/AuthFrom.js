import React, { useState } from "react";
import { authService } from "fbase";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = event => {
    const {
      target: { name, value }
    } = event;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const onSubmit = async event => {
    event.preventDefault();
    try {
      if (newAccount) {
        // create account
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        // log in
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAcount = () => setNewAccount(!newAccount);

  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? "Create account" : "Sign In"}
        />
        {error}
      </form>
      <span onClick={toggleAcount}>
        {newAccount ? "Sign In" : "Create account"}
      </span>
    </React.Fragment>
  );
};

export default AuthForm;
