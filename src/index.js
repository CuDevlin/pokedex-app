import * as React from "react";
import App from './App';
import * as ReactDOM from "react-dom/client";
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error-page"
import PokeDetails from "./routes/PokeDetails"

const router = createHashRouter([
  {
    path: "",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "details/:id",
    element: <PokeDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);