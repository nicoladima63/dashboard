import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Dashboard, {loader as dashboardLoader } from "./pages/dashboard";
import Lavorazioni, { loader as lavorazioniLoader } from "./pages/Lavorazioni";
import TipoLavorazioni, { loader as tipoLavorazioniLoader } from "./pages/TipoLavorazione";
import Fasi, { loader as fasiLoader } from "./pages/Fasi";
import FasiTemplate, { loader as fasiTemplateLoader } from "./pages/FasiTemplate";
import Fornitori, { loader as fornitoriLoader} from "./pages/Fornitori";
import Utenti, { loader as userLoader} from "./pages/Utenti";
import Grid, { loader as gridLoader } from "./pages/Grid";

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
                path: "/pages/lavorazioni",
                element: <Lavorazioni />,
                loader: lavorazioniLoader
            },
            {
                path: "/pages/fornitori",
                element: <Fornitori />,
                loader: fornitoriLoader
            },
            {
                path: "/pages/tipolavorazione",
                element: <TipoLavorazioni />,
                loader: tipoLavorazioniLoader,
            },
            {
                path: "/pages/utenti",
                element: <Utenti />,
                loader: userLoader
            },
            {
                path: "/pages/fasi",
                element: <Fasi />,
                loader: fasiLoader
            },
            {
                path: "/pages/fasitemplate",
                element: <FasiTemplate />,
                loader: fasiTemplateLoader
            },
            {
                path: "/pages/grid",
                element: <Grid />,
                loader: gridLoader
            },

        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);