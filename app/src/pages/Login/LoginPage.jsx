import React, { useState, useContext } from "react";
import stylex from "@stylexjs/stylex";
import loginBackground from "@assets/spiderman04.webp";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const main = stylex.create({
  container: {
    alignItems: "center",
    backgroundColor: "#141414",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    padding: "10rem",
  },
});

const form = stylex.create({
  container: {
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    border: "1px solid #3B3B3B",
    borderRadius: "25px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    justifyContent: "center",
    padding: "5rem",
    boxShadow: "0px 4px 40px 8px rgba(0, 0, 0, 0.5)",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    backgroundColor: "#080808",
    border: "1px solid #3B3B3B",
    borderRadius: "8px",
    color: "#B3B3B3",
    padding: "0.6rem 1rem",
  },
  submitButton: {
    ":hover": {
      color: "#080808",
      backgroundColor: "#f5f5f5",
      borderColor: "#f5f5f5",
    },
    backgroundColor: "#080808",
    border: "1px solid #B3B3B3",
    borderRadius: "25px",
    color: "#B3B3B3",
    cursor: "pointer",
    fontFamily: "Bebas Neue, sans-serif",
    fontSize: "2rem",
    lineHeight: "normal",
    marginTop: "3rem",
    padding: "0.6rem 2rem",
    transition: "all 0.2s",
    width: "150px",
  },
  link: {
    ":hover": {
      textDecoration: "underline",
    },
    fontSize: "1.4rem",
    fontStyle: "italic",
    fontWeight: "300",
  },
});

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div
      {...stylex.props(main.container)}
      style={{ backgroundImage: `url(${loginBackground})` }}
    >
      <form {...stylex.props(form.container)} onSubmit={(e) => handleSubmit(e)}>
        <label {...stylex.props(form.field)} htmlFor="username">
          Username:
          <input
            {...stylex.props(form.input)}
            id="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label {...stylex.props(form.field)} htmlFor="password">
          Password:
          <input
            {...stylex.props(form.input)}
            id="password"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/login" {...stylex.props(form.link)}>
            Forgot your password?
          </Link>
        </label>
        <button
          {...stylex.props(form.submitButton)}
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </button>
        <Link to="/register" {...stylex.props(form.link)}>
          Don&apos;t have an account? Register
        </Link>
      </form>
    </div>
  );
}
