import React from "react";
import stylex from "@stylexjs/stylex";
import { Outlet } from "react-router-dom";
import { Footer, NavBar } from "@components";

const main = stylex.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "100vh",
  },
});

export function MainLayout() {
  return (
    <div {...stylex.props(main.container)}>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
