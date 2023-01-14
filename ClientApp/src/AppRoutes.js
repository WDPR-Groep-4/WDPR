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
import EmailVerzondenPage from "./components/pages/authenticatie/EmailVerzondenPage";
import WachtwoordVergetenPage from "./components/pages/authenticatie/wachtwoordvergeten/WachtwoordVergetenPage";
import ResetWachtwoordPagina from "./components/pages/authenticatie/wachtwoordvergeten/WachtwoordResetPagina";
import SuccesResetWachtwoord from "./components/pages/authenticatie/wachtwoordvergeten/SuccesResetWachtwoord";
import SteunOnsPage from "./components/pages/SteunOns/SteunOnsPage";
import Medewerker from "./components/pages/medewerker/MedewerkerPage";
import Agenda from "./components/pages/agenda/AgendaPage";
import BetaalPagina from "./components/pages/winkelwagen/BetaalPagina";
import VerifyPagina from "./components/pages/winkelwagen/VerifyPagina";
import TicketPage from "./components/pages/account/mijntickets/TicketPage";

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
        path: "/voorstelling/:id/bestel",
        element: <KaartBestelPagina />,
    },
    {
        path: "/bevestig/ConfirmEmail",
        element: <BevestigEmailPage />,
    },
    {
        path: "/EmailVerzonden",
        element: <EmailVerzondenPage />,
    },
    {
        path: "/wachtwoordvergeten",
        element: <WachtwoordVergetenPage />,
    },
    {
        path: "/reset/resetwachtwoord",
        element: <ResetWachtwoordPagina />,
    },
    {
        path: "/resetwachtwoordsucces",
        element: <SuccesResetWachtwoord />,
    },
    {
        path: "/steun-ons",
        element: <SteunOnsPage />,
    },
    {
        path: "/betaling",
        element: <BetaalPagina />,
    },
    {
        path: "/api/betaal/verify",
        element: <VerifyPagina />,
    },
    {
        path: "/account/mijntickets",
        element: <TicketPage />,
    },
];

export default AppRoutes;
