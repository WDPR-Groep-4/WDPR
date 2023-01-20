import { Button, Card, TextField, Typography, Box, Alert } from "@mui/material";
import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useWinkelWagen } from "../../../../services/WinkelwagenContext";
import Footer from "../../../footer/Footer";
import config from "../../../../config.json";

export default function FakePayPagina(props) {
    const form = useRef(null);
    const [error, setError] = useState();
    const navigate = useNavigate();
    const { clearWinkelwagen } = useWinkelWagen();

    document.title = "Betalen" + config.title;

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = form.current;
        setError(null);
        const rekeningNummer = formData["rekeningNummer"].value;

        // check iban nummer format
        if (
            !rekeningNummer.match(
                /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/
            )
        ) {
            setError("Ongeldig rekeningnummer");
            return;
        }

        const succes = isSuccessful(rekeningNummer);

        props.handleBetaal(formData, succes);
    };

    function isSuccessful(rekeningNummer) {
        if (rekeningNummer === "NL55ABNA5660751954") {
            return true;
        }
        if (rekeningNummer === "NL02INGB8635612388") {
            return Math.random() > 0.5;
        }
        return false;
    }

    return (
        <div
            style={{
                height: props.achtergrond ? "100vh" : "auto",
                width: "100%",
                display: "flex",
                justifyContent: props.isDonatie ? "flex-start" : "center",
                alignItems: "center",
                pt: 10,
                backgroundColor: "#f5f5f5",
            }}
        >
            <Card variant="outlined">
                <Box
                    sx={{
                        maxWidth: 400,
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        margin: 3,
                    }}
                >
                    <div>
                        <Typography variant="h5" component="h1">
                            € {props.bedrag} te betalen
                        </Typography>
                        <Typography variant="body1" component="p">
                            Het account{" "}
                            <span style={{ fontWeight: "500" }}>NL55ABNA5660751954</span>{" "}
                            heeft oneindig veel geld.
                        </Typography>
                        <Typography variant="body1" component="p">
                            Het account{" "}
                            <span style={{ fontWeight: "500" }}> NL02INGB8635612388</span>{" "}
                            heeft in 50% van de gevallen genoeg geld.
                        </Typography>
                        <Typography variant="body1" component="p">
                            Alle andere accounts hebben niet genoeg geld.
                        </Typography>
                    </div>
                    {error && <Alert severity="error">{error}</Alert>}
                    <form
                        ref={form}
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                        }}
                        onSubmit={onSubmit}
                    >
                        <TextField
                            id="rekeningNummer"
                            placeholder="NLxxxxxxxxxxxxxx"
                            label="Rekeningnummer"
                        />
                    </form>
                    <Button variant="contained" color="primary" onClick={onSubmit}>
                        Verstuur
                    </Button>
                </Box>
            </Card>
        </div>
    );
}
