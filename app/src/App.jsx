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
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
