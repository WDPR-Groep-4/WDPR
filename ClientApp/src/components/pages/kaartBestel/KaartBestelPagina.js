import {
    Box,
    Button,
    Typography,
    Card,
    IconButton,
    RadioGroup,
    FormControl,
} from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import RangCard from "./RangCard";
import config from "../../../config.json";
import { useWinkelWagen } from "../../../WinkelwagenContext";
import AantalKaarten from "./AantalKaarten";
import { fetchVoorstelling } from "../voorstelling/FetchVoorstelling";
import { useParams } from "react-router-dom";

export default function KaartBestelPagina(props) {
    const { state, addToWinkelwagen, setCurrentVoorstelling } = useWinkelWagen();
    const voorstelling = state.currentVoorstelling;
    const navigate = useNavigate();
    const [aantal, setAantal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const { id } = useParams();
    const [rang, setRang] = useState(1);

    document.title = "Bestel" + config.title;

    useEffect(() => {
        if (!voorstelling) {
            fetchVoorstelling(setIsLoading, setError, setCurrentVoorstelling, id);
            return;
        }
        setIsLoading(false);
    }, []);

    function handleBestel() {
        addToWinkelwagen(id, aantal, rang);
        navigate("/winkelwagen");
    }

    function PrijsCards() {
        const prijzenPerRang = voorstelling.prijzenPerRang;
        const elements = [];

        for (let i = 0; i < prijzenPerRang.length; i++) {
            const rangItem = prijzenPerRang[i];
            elements.push(
                <RangCard
                    key={rangItem.rang}
                    rang={rangItem}
                    setRang={setRang}
                    rangState={rang}
                ></RangCard>
            );
        }

        return elements;
    }

    function MainBody() {
        return (
            <>
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
                        De beste stoelen worden uitgekozen wannneer u de bestelling
                        afrond.
                    </Typography>
                    <Divider sx={{ my: 2 }} />

                    <Typography variant="body1" component="p">
                        <span style={{ fontWeight: 500 }}>Titel:</span>{" "}
                        {voorstelling.titel}
                    </Typography>
                    <Typography variant="body1" component="p">
                        <span style={{ fontWeight: 500 }}>Datum:</span>{" "}
                        {voorstelling.datum}
                    </Typography>
                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <AantalKaarten aantal={aantal} setAantal={setAantal} />

                        <FormControl>
                            <RadioGroup
                                name="rang"
                                defaultValue="1"
                                sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                            >
                                <PrijsCards />
                            </RadioGroup>
                        </FormControl>

                        <Typography variant="body1" component="p">
                            <span style={{ fontWeight: 500 }}>Totaal:</span> €
                            {aantal * voorstelling.prijzenPerRang[rang - 1].prijs}
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3 }}
                        onClick={handleBestel}
                    >
                        Bestel kaarten
                    </Button>
                </Card>
            </>
        );
    }

    return (
        <Container
            maxWidth="xl"
            sx={{ py: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}
        >
            {isLoading ? (
                <Typography variant="h5" component="h1">
                    Laden...
                </Typography>
            ) : error ? (
                <Typography variant="h5" component="h1">
                    Er is iets fout gegaan. Probeer het later opnieuw.
                </Typography>
            ) : (
                <MainBody />
            )}
        </Container>
    );
}
