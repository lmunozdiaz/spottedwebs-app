import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  NotFoundPage,
  HomePage,
  ImagesPage,
  CollectionsPage,
  LoginPage,
  RegisterPage,
} from "@pages";
import { MainLayout } from "@layouts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="images" element={<ImagesPage />} />
        <Route path="collections" element={<CollectionsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
}

export default App;
