import { useAuthUser } from "react-auth-kit";
import { Box, Typography, Button, Link } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DoneerElement(props) {
    const auth = useAuthUser();
    const [gebruikerToken, setGebruikerToken] = useState("");

    useEffect(() => {
        async function fetchToken() {
            const response = await axios.get();
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
        return (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 500 }}>
                <Typography>
                    Om te kunnen doneren heeft u een ikDoneer account nodig en daarna kunt
                    u ons toegang geven tot uw gegevens. <br></br> Hierna kunt u een
                    donatie doen.
                </Typography>
                <Box
                    component={Link}
                    href="https://ikdoneer.azurewebsites.net/Toegang/?url=https%3A%2F%2Fhettheaterlaak.nl%2F"
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
