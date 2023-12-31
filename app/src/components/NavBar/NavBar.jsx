import React, { useContext, useEffect } from "react";
import stylex from "@stylexjs/stylex";
import logo from "@assets/logo.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

let nav = stylex.create({
  container: {
    backgroundColor: "#080808",
    borderBottom: "1px solid #3b3b3b",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    placeItems: "center",
    padding: "2rem 0",
  },
  linkList: {
    display: "flex",
    gap: "2rem",
  },
  link: {
    ":hover": {
      color: "#f5f5f5",
    },
    fontFamily: "Bebas Neue, sans-serif",
    fontSize: "2rem",
    transition: "all 0.2s",
  },
  button: {
    ":hover": {
      color: "#080808",
      backgroundColor: "#f5f5f5",
      borderColor: "#f5f5f5",
    },
    fontFamily: "Bebas Neue, sans-serif",
    fontSize: "2rem",
    lineHeight: "normal",
    border: "1px solid #b3b3b3",
    borderRadius: "25px",
    padding: "0.6rem 4rem",
    transition: "all 0.2s",
  },
  logo: {
    width: "17rem",
  },
});

export function NavBar() {
  const { isLoggedIn, logout, user } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      console.log(user);
    }, 2000);
  });

  return (
    <nav {...stylex.props(nav.container)}>
      <ul {...stylex.props(nav.linkList)}>
        <li>
          <Link to="/images" {...stylex.props(nav.link)}>
            Images
          </Link>
        </li>
        <li>
          <Link to="/collections" {...stylex.props(nav.link)}>
            Collections
          </Link>
        </li>
        <li>
          <Link to="/images/latest" {...stylex.props(nav.link)}>
            Latest
          </Link>
        </li>
      </ul>
      <Link to="/">
        <img src={logo} alt="The website logo" {...stylex.props(nav.logo)} />
      </Link>
      {isLoggedIn ? (
        <>
          <button {...stylex.props(nav.button)} onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <ul {...stylex.props(nav.linkList)}>
          <li>
            <Link to="/login" {...stylex.props(nav.button)}>
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" {...stylex.props(nav.button)}>
              Register
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
