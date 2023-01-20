import { Box } from "@mui/system";
import { Card, Typography, Alert, TextField, Button } from "@mui/material";
import { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import { useWinkelWagen } from "../../../services/WinkelwagenContext";
import { useAuthUser } from "react-auth-kit";
import config from "../../../config.json";
import FakePayPagina from "./Betaling/FakePayPage";
import { useNavigate } from "react-router-dom";

export default function BetaalPopup(props) {
    const [betaal, setBetaal] = useState(false);
    const [betaalId, setBetaalId] = useState("");
    const { state, totaalWinkelwagen, clearWinkelwagen } = useWinkelWagen();
    const totaal = totaalWinkelwagen();
    const account = useAuthUser();
    const [error, setError] = useState("");
    const form = useRef(null);
    const navigate = useNavigate();

    document.title = "Betalen" + config.title;

    console.log(state.winkelwagen);

    async function handleBetaal(email) {
        try {
            setError(null);

            if (email === "") {
                setError("Vul een emailadres in");
                return;
            }

            const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

            if (!email.match(regex)) {
                setError("Geen geldig e-mailadres");
                return;
            }

            const winkelWagenItems = state.winkelwagen.map((item) => {
                return {
                    VoorstellingEventId: item.voorstellingEvent.id,
                    Aantal: item.aantal,
                    Rang: item.rang,
                };
            });

            const betaalIdResponse = await axios
                .post("/api/betaal/setup", {
                    winkelwagenItems: winkelWagenItems,
                    email: email,
                })
                .catch((error) => {
                    console.log(error);
                });

            if ((await betaalIdResponse.status) !== 200) {
                setError(
                    "Er is iets fout gegaan bij het aanmaken van de betaling, probeer het later opnieuw."
                );
                return;
            }

            if (betaalIdResponse.status === 200) {
                console.log("betaalIdResponse.data: ");
                setBetaal(true);
                setBetaalId(betaalIdResponse.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (account()) {
            console.log("tststts");
            handleBetaal(account().email);
        }
    }, []);

    console.log("betaalId: " + betaalId);

    async function ticketBetaling(formData, succes) {
        const response = await axios
            .post("/api/betaal/verify", {
                reference: betaalId,
                succes: succes,
            })
            .catch((error) => {
                console.log(error);
                if (error.response.data) {
                    setError(error.response.data);
                } else {
                    setError("Er is iets mis gegaan");
                }
            });

        if (response && response.status === 200) {
            navigate("/winkelwagen/bedankt");
            clearWinkelwagen();
        }
    }

    return betaal && betaalId ? (
        <FakePayPagina
            bedrag={totaal}
            betaalId={betaalId}
            handleBetaal={ticketBetaling}
        />
    ) : (
        <Body />
    );

    function Body() {
        return (
            <div
                style={{
                    height: "100vh",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    pt: 10,
                    backgroundColor: "#f5f5f5",
                }}
            >
                <Card variant="outlined">
                    <Box
                        sx={{
                            width: 300,
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            margin: 3,
                        }}
                    >
                        <div>
                            <Typography variant="h5" component="h1">
                                Voer uw e-mailadres in
                            </Typography>
                            <Typography variant="body1" component="p">
                                Voer uw e-mailadres in om verder te gaan met de betaling
                            </Typography>
                        </div>
                        {error && <Alert severity="error">{error}</Alert>}
                        <form
                            onSubmit={(e) => handleBetaal(form.current.email.value)}
                            ref={form}
                            style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                gap: 16,
                            }}
                        >
                            <TextField
                                name="email"
                                type="email"
                                placeholder="name@mail.com"
                                label="Email"
                            />
                        </form>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={(e) => handleBetaal(form.current.email.value, e)}
                        >
                            Verstuur
                        </Button>
                    </Box>
                </Card>
            </div>
        );
    }
}
