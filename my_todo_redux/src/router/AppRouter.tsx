import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";
import TodoListPage from "../pages/todo/TodoListPage";
import AddUpdateTodoPage from "../pages/todo/AddUpdateTodoPage";
import Rootlayout from "../core/components/RootLayout";
import ProtectedRoute from "./ProtectedRoute";
import TodoRootLayout from "../core/components/TodoRootLayout";
import TokenManager from "../services/local/TokenManagers";

const AppRouter: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Rootlayout />,
      children: [
        {
          path: "",
          element: TokenManager.hasToken() ? (
            <Navigate to="todo" replace />
          ) : (
            <Navigate to="login" replace />
          ),
        },
        {
          path: "login",
          element: (
            <ProtectedRoute>
              <LoginPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "register",
          element: (
            <ProtectedRoute>
              <RegisterPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "todo",
          element: <TodoRootLayout />,
          children: [
            {
              index: true,
              path: "",
              element: (
                <ProtectedRoute protect={true}>
                  <TodoListPage />
                </ProtectedRoute>
              ),
            },
            {
              path: "new",
              element: (
                <ProtectedRoute protect={true}>
                  <AddUpdateTodoPage />
                </ProtectedRoute>
              ),
            },
            {
              path: "edit/:id",
              element: (
                <ProtectedRoute protect={true}>
                  <AddUpdateTodoPage />
                </ProtectedRoute>
              ),
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
