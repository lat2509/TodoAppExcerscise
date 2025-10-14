import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Todo from "./Todos/todo.tsx";
import Login from "./Pages/login.tsx";
import Register from "./Pages/register.tsx";
import Home from "./Pages/home.tsx";
import ProtectedRoute from "./Routes/protectedRoute.tsx";
import PublicRoute from "./Routes/publicRoute.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/todo" element={<Todo />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>

  </StrictMode>,
);
