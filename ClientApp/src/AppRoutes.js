import { FetchData } from "./components/FetchData";
import HomePage from "./components/pages/home/HomePage";
import Login from "./components/pages/authenticatie/LoginPage";
import Registreer from "./components/pages/authenticatie/RegistreerPage";
import Winkelwagen from "./components/pages/winkelwagen/Winkelwagen";
import VoorstellingPage from "./components/pages/voorstelling/VoorstellingPage";
import AccountPage from "./components/pages/account/AccountPage";
import KaartBestelPagina from "./components/pages/kaartBestel/KaartBestelPagina";

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
        element: <AccountPage />,
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
        path: "/voorstelling/1/bestel",
        element: <KaartBestelPagina />,
    },
];

export default AppRoutes;
