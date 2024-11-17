import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import App from "./App";
import router from "./routes";

const rootEl = document.getElementById("root");

if (rootEl) {
  const root = createRoot(rootEl);
  root.render(
    <Suspense fallback={<div>Loading..</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
