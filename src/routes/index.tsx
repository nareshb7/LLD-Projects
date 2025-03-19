import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { projectsConfig } from "./config";

const projectRoutes = projectsConfig.map(({ path, Component }) => ({
  path,
  Component,
}));

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: projectRoutes,
    },
  ],
  {
    basename: "/LLD-Projects",
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
