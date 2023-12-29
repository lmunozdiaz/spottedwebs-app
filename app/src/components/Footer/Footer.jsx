import React from "react";
import stylex from "@stylexjs/stylex";
import { Link } from "react-router-dom";
import logo from "@assets/logo.svg";

const footer = stylex.create({
  container: {
    padding: "1rem 6rem",
  },
  group: {
    ":first-child": {
      borderBottom: "1px solid #3B3B3B",
    },
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    padding: "2rem 0",
  },
  logo: {
    display: "block",
    margin: "auto",
    width: "13rem",
  },
  text: {
    fontSize: "1.4rem",
    fontWeight: "300",
  },
});

export function Footer() {
  return (
    <footer {...stylex.props(footer.container)}>
      <div {...stylex.props(footer.group)}>
        <Link to="/">
          <img
            src={logo}
            alt="The website logo"
            {...stylex.props(footer.logo)}
          />
        </Link>
        <div>
          <a href="#">
            <i
              className="fa-brands fa-discord fa-xl"
              style={{ marginRight: "18px" }}
            ></i>
          </a>
          <a href="#">
            <i
              className="fa-brands fa-x-twitter fa-xl"
              style={{ marginRight: "18px" }}
            ></i>
          </a>
          <a href="#">
            <i
              className="fa-brands fa-instagram fa-xl"
              style={{ marginRight: "18px" }}
            ></i>
          </a>
          <a href="#">
            <i
              className="fa-brands fa-github fa-xl"
              style={{ marginRight: "18px" }}
            ></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-linkedin fa-xl"></i>
          </a>
        </div>
      </div>
      <div {...stylex.props(footer.group)}>
        <p {...stylex.props(footer.text)}>Copyright &copy; 2023 SpottedWebs</p>
        <p {...stylex.props(footer.text)}>
          <Link>Terms of Service</Link> | <Link>Privacy Policy</Link>
        </p>
      </div>
    </footer>
  );
}
