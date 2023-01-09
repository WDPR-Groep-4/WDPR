import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";

export default function SuccesResetWachtwoord() {
    const navigate = useNavigate();

    return (
        <div className="container">
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
                    <CheckIcon sx={{ fontSize: 100, margin: -1.5 }} />
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
                        <Typography variant="h5" component={"h1"}>
                            Wachtwoord gewijzigd
                        </Typography>

                        <Typography variant="body1" component={"p"}>
                            Uw wachtwoord is gewijzigd. U kunt nu inloggen met uw nieuwe
                            wachtwoord.
                        </Typography>
                    </Box>
                    <Button onClick={() => navigate("/")} variant="contained">
                        naar Home pagina
                    </Button>
                </Box>
            </Container>
        </div>
    );
}
