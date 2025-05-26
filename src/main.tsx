import { createRoot } from "react-dom/client";
import { Suspense } from "react";
import "./index.css";
import App from "./App";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<div>Loading..</div>}>
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  </Suspense>
);
