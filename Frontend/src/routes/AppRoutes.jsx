import React, { useContext, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "../app/layouts/AuthLayout";
import Login from "../features/auth/ui/pages/Login";
import Signup from "../features/auth/ui/pages/Signup";
import PublicProtected from "./PublicProtected";
import MainProtected from "./MainProtected";
import MainLayout from "../app/layouts/MainLayout";
import ImagePage from "../features/image/ui/pages/ImagePage";
import api from "../config/api";
import { AuthContext } from "../features/auth/state/AuthContext";
import HomePage from "../shared/ui/pages/HomePage";
import ImageGenerate from "../features/image/ui/pages/ImageGenerate";
import ImageHistory from "../features/image/ui/pages/ImageHistory";
import ImageHomePage from "../features/image/ui/pages/ImageHomePage";
import Content from "../features/content/ui/pages/Content";
import ContentHome from "../features/content/ui/pages/ContentHome";
import GenerateContent from "../features/content/ui/pages/GenerateContent";
import { ContentProvider } from "../features/content/state/ContentContext";
import ContentHistory from "../features/content/ui/pages/ContentHistory";
import { ImageProvider } from "../features/image/state/ImageContext";
import ContentDetails from "../features/content/ui/pages/ContentDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicProtected />,
    children: [
      {
        path: "",
        element: <AuthLayout />,
        children: [
          {
            path: "",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Signup />,
          },
        ],
      },
    ],
  },
  {
    path: "/main",
    element: <MainProtected />,
    children: [
      {
        path: "",
        element: <MainLayout />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
          {
            path: "image",
            element: <ImageProvider><ImageHomePage /></ImageProvider>,
            children: [
              {
                path: "",
                element: <ImagePage />,
              },
              {
                path: "generate",
                element: <ImageGenerate />,
              },
              {
                path: "history",
                element: <ImageHistory />,
              },
            ],
          },
          {
            path: "content",
            element: (
              <ContentProvider>
                <ContentHome />
              </ContentProvider>
            ),
            children: [
              {
                path: "",
                element: <Content />,
              },
              {
                path: "history",
                element: <ContentHistory />,
              },
              {
                path: "generate/:action",
                element: <GenerateContent />,
              },
              {
                path: "content-details/:id",
                element: <ContentDetails />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

const AppRoutes = () => {
  const { setUser, setIsHydrating } = useContext(AuthContext);

  const hydrate = async () => {
    try {
      setIsHydrating(true);
      const res = await api.get("/v1/auth/get-me");
      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.log("Error in hydrating user", error);
    } finally {
      setIsHydrating(false);
    }
  };

  useEffect(() => {
    hydrate();
  }, []);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
