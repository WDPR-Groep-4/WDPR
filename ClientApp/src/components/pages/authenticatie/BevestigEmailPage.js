import { Container, Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { Button } from "@mui/material";

import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function BevestigEmailPage(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const userId = searchParams.get("userId");
    const token = searchParams.get("token");

    const bevestigEmail = async () => {
        const response = await axios
            .post("/api/email/bevestig", {
                userId: userId,
                token: token,
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(response);
        setIsLoading(false);
    };

    useEffect(() => {
        bevestigEmail();
    }, []);

    return (
        <Container maxWidth="xl">
            <Box
                sx={{
                    width: "100%",
                    height: "90vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                }}
            >
                <MarkEmailReadIcon sx={{ fontSize: 100, margin: -1.5 }} />
                <Box
                    sx={{
                        maxWidth: 450,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                    }}
                >
                    {isLoading ? (
                        <Typography variant="body1" component={"p"}>
                            Gegevens laden...
                        </Typography>
                    ) : (
                        <Typography variant="h5" component={"h1"}>
                            email bevestigd
                        </Typography>
                    )}
                    <Typography variant="body1" component={"p"}>
                        Uw email is bevestigd. U kunt nu uw account gebruiken.
                    </Typography>
                </Box>
                <Button onClick={() => navigate("/")} variant="contained">
                    naar Home pagina
                </Button>
            </Box>
        </Container>
    );
}
