import { FetchData } from "./components/FetchData";
import HomePage from "./components/pages/home/HomePage";
import Login from "./components/pages/authenticatie/LoginPage";
import Registreer from "./components/pages/authenticatie/RegistreerPage";
import Winkelwagen from "./components/pages/winkelwagen/Winkelwagen";
import VoorstellingPage from "./components/pages/voorstelling/VoorstellingPage";
import AccountPage from "./components/pages/account/AccountPage";
import KaartBestelPagina from "./components/pages/kaartBestel/KaartBestelPagina";
import { RequireAuth } from "react-auth-kit";
import BevestigEmailPage from "./components/pages/authenticatie/BevestigEmailPage";

const AppRoutes = [
    {
        index: true,
        element: <HomePage />,
    },
    {
        path: "/fetch-data",
        element: <FetchData />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/registreer",
        element: <Registreer />,
    },

    {
        path: "/account",
        element: (
            <RequireAuth loginPath={"/login"}>
                <AccountPage />
            </RequireAuth>
        ),
    },
    {
        path: "/winkelwagen",
        element: <Winkelwagen />,
    },
    {
        path: "*",
        element: <HomePage />,
    },
    {
        path: "/voorstelling/:id",
        element: <VoorstellingPage />,
    },
    {
        path: "/bevestig/ConfirmEmail",
        element: <BevestigEmailPage />,
    },
    {
        path: "/voorstelling/1/bestel",
        element: <KaartBestelPagina />,
    },
];

export default AppRoutes;
