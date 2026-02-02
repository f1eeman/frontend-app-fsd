import { BrowserRouter, useRoutes } from "react-router";
import { AboutPageAsync } from "@/pages/AboutPage/AboutPage.async";
import { MainPageAsync } from "@/pages/MainPage/MainPage.async";
import type { RouteObject } from "react-router";

const routesConfig: RouteObject[] = [
  {
    element: <MainPageAsync />,
    path: "/",
    children: [
      {
        element: <AboutPageAsync />,
        path: "about",
      },
    ],
  },
];

const AppRoutes = () => {
  const element = useRoutes(routesConfig);
  return element;
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};
