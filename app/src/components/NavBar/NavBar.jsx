import React from "react";
import stylex from "@stylexjs/stylex";
import logo from "@assets/logo.svg";
import { Link } from "react-router-dom";

let nav = stylex.create({
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    height: "6.4rem",
    placeItems: "center",
  },
  linkList: {
    display: "flex",
    gap: "2rem",
  },
  logo: {
    width: "17rem",
  },
});

export function NavBar() {
  return (
    <nav {...stylex.props(nav.container)}>
      <ul {...stylex.props(nav.linkList)}>
        <li>
          <Link to="/images">Images</Link>
        </li>
        <li>
          <Link to="/collections">Collections</Link>
        </li>
        <li>
          <Link to="/images/latest">Latest</Link>
        </li>
      </ul>
      <Link to="/">
        <img src={logo} alt="The website logo" {...stylex.props(nav.logo)} />
      </Link>
      <ul {...stylex.props(nav.linkList)}>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
}
