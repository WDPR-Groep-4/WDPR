import { useAuthUser } from "react-auth-kit";
import { Box, Typography, Button, Link } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import IngelogdEnToken from "./IngelogdEnToken";
import { useAuthHeader } from "react-auth-kit";

export default function DoneerElement(props) {
    const auth = useAuthUser();
    const [gebruikerToken, setGebruikerToken] = useState();
    const authHeader = useAuthHeader();

    const yourConfig = {
        headers: {
            Authorization: authHeader(),
        },
    };

    useEffect(() => {
        async function fetchToken() {
            const response = await axios
                .get("/api/donatie/token", yourConfig)
                .catch((err) => {
                    console.log(err);
                });

            if (response && response.data === "null") {
                setGebruikerToken("");
            }
            if (response && response.data) {
                setGebruikerToken(response.data);
            }
        }
        fetchToken();
    }, []);

    function NietIngelogd() {
        return (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography>
                    Om een donatie te kunnen doen moet u ingelogd zijn.
                </Typography>
                <Button variant="contained" sx={{ px: 8, maxWidth: 350 }} disabled>
                    Steun ons
                </Button>
            </Box>
        );
    }

    function Ingelogd() {
        return gebruikerToken ? (
            <IngelogdEnToken token={gebruikerToken} />
        ) : (
            <IngelogdZonderToken />
        );
    }

    function IngelogdZonderToken() {
        return (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 500 }}>
                <Typography>
                    Om te kunnen doneren heeft u een ikDoneer account nodig en daarna kunt
                    u ons toegang geven tot uw gegevens. <br></br> Hierna kunt u een
                    donatie doen.
                </Typography>
                <Box
                    component={Link}
                    href="https://ikdoneer.azurewebsites.net/Toegang/?url=https%3A%2F%2Fhettheaterlaak.nl%2Fapi%2Fdonatie%2Faddtoken"
                    sx={{ display: "flex", flexDirection: "column" }}
                >
                    <Button variant="contained" sx={{ px: 8, maxWidth: 350 }}>
                        IkDoneer
                    </Button>
                </Box>
            </Box>
        );
    }

    return auth() ? <Ingelogd /> : <NietIngelogd />;
}
