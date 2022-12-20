import { Box, Button, Typography, Card } from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Divider } from "@mui/material";
import { useState } from "react";
import RangCard from "./RangCard";
import voorstelling from "../voorstelling/voorstelling.json";

export default function KaartBestelPagina(props) {
    const navigate = useNavigate();
    const [rang1, setRang1] = useState(0);
    const [rang2, setRang2] = useState(0);
    const [rang3, setRang3] = useState(0);

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
                <Typography variant="h5" component="h1">
                    Bestellen
                </Typography>
                <Typography variant="body1" component="p" sx={{ maxWidth: 400 }}>
                    De beste stoelen worden uitgekozen wannneer u de bestelling afrond.
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" component="p">
                    <span style={{ fontWeight: 500 }}>Titel:</span> {voorstelling.titel}
                </Typography>
                <Typography variant="body1" component="p">
                    <span style={{ fontWeight: 500 }}>Datum:</span> {voorstelling.datum}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <RangCard
                        rang={voorstelling.prijs[0]}
                        rangAantal={rang1}
                        setRangAantal={setRang1}
                    />
                    <RangCard
                        rang={voorstelling.prijs[1]}
                        rangAantal={rang2}
                        setRangAantal={setRang2}
                    />
                    <RangCard
                        rang={voorstelling.prijs[2]}
                        rangAantal={rang3}
                        setRangAantal={setRang3}
                    />
                </Box>
                <Button variant="contained" color="primary" sx={{ mt: 3 }}>
                    Bestel kaarten
                </Button>
            </Card>
        </Container>
    );
}
