import { FetchData } from "./components/FetchData";
import HomePage from "./components/pages/home/HomePage";
import Login from "./components/pages/authenticatie/LoginPage";
import Registreer from "./components/pages/authenticatie/RegistreerPage";
import VoorstellingPage from "./components/pages/voorstelling/VoorstellingPage";

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
        path: "*",
        element: <HomePage />,
    },
    {
        path: "/voorstelling/:id",
        element: <VoorstellingPage />,
    },
];

export default AppRoutes;
