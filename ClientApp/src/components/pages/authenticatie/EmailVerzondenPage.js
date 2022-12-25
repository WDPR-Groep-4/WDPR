import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

export default function EmailVerzondenPage(props) {
    const navigate = useNavigate();
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
                <EmailIcon sx={{ fontSize: 100, margin: -1.5 }} />
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
                        Email bevestiging verzonden
                    </Typography>
                    <Typography variant="body1" component={"p"}>
                        Er is een email verzonden naar uw email adres. Klik op de link in
                        de email om uw account te bevestigen.
                    </Typography>
                </Box>
                <Button onClick={() => navigate("/")} variant="contained">
                    naar Home pagina
                </Button>
            </Box>
        </Container>
    );
}
