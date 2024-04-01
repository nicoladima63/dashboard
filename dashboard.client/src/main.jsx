import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Dashboard, {loader as dashboardLoader } from "./pages/dashboard";
import Compiti, { loader as compitiLoader} from "./pages/Compiti";
import Lavorazioni from "./pages/Lavorazioni";
import Grid, { loader as gridLoader} from "./pages/Grid";
import Fornitori, { loader as fornitoriLoader} from "./pages/Fornitori";
import Utenti from "./pages/Utenti";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/pages/dashboard",
                element: <Dashboard />,
                loader: dashboardLoader
            },
            {
                path: "/pages/compiti",
                element: <Compiti />,
                loader: compitiLoader,
            },
            {
                path: "/pages/utenti",
                element: <Utenti />,
            },
            {
                path: "/pages/lavorazioni",
                element: <Lavorazioni />,
            },
            {
                path: "/pages/grid",
                element: <Grid />,
                loader: gridLoader
            },
            {
                path: "/pages/fornitori",
                element: <Fornitori />,
                loader: fornitoriLoader
            },

        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);