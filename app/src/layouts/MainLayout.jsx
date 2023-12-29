import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, NavBar } from "@components";

export function MainLayout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
