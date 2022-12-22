import { FetchData } from "./components/FetchData";
import HomePage from "./components/pages/home/HomePage";
import Login from "./components/pages/authenticatie/LoginPage";
import Registreer from "./components/pages/authenticatie/RegistreerPage";
import Agenda from "./components/pages/agenda/AgendaPage";
import Medewerker from "./components/pages/medewerker/MedewerkerPage";

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
        path: "/agenda",
        element: <Agenda />,
    },
    {
        path: "/medewerker",
        element: <Medewerker />,
    },
    {
        path: "*",
        element: <HomePage />,
    },
];

export default AppRoutes;
