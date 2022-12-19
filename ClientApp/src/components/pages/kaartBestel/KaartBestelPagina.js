import { Button, Card, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function KaartBestelPagina(props) {
    const navigate = useNavigate();
    return (
        <Container
            maxWidth="xl"
            sx={{ py: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}
        >
            <Button
                startIcon={<ArrowBackIcon />}
                variant="outlined"
                onClick={() => navigate(-1)}
            >
                Terug
            </Button>
            <Card variant="outlined" sx={{ m: 3, maxWidth: 700, mx: "auto", p: 3 }}>
                <Typography variant="h5" component="h1" sx={{ py: 2 }}>
                    Kaart Bestellen
                </Typography>
            </Card>
        </Container>
    );
}
