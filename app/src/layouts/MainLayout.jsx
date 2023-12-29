import React from "react";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <>
      <h1>NavBar Here</h1>
      <main>
        <Outlet />
      </main>
      <h1>Footer Here</h1>
    </>
  );
}
