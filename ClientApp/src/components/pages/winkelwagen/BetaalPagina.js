import { Box } from "@mui/system";
import { Card, Typography, Alert, TextField, Button } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useWinkelWagen } from "../../../services/WinkelwagenContext";
import { useAuthUser } from "react-auth-kit";
import config from "../../../config.json";

export default function BetaalPopup(props) {
    const [html, setHtml] = useState("");
    const [betaal, setBetaal] = useState(false);
    const { state, totaalWinkelwagen } = useWinkelWagen();
    const totaal = totaalWinkelwagen();
    const account = useAuthUser();
    const [error, setError] = useState("");
    const form = useRef(null);

    document.title = "Betalen" + config.title;

    console.log(html);

    async function handleBetaal(email) {
        try {
            const winkelWagenItems = state.winkelwagen.map((item) => {
                return {
                    VoorstellingId: item.voorstelling.voorstellingId,
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

            const betaalResponse = await axios
                .post(
                    "https://fakepay.azurewebsites.net/",
                    new URLSearchParams({
                        amount: totaal,
                        reference: await betaalIdResponse.data,
                        url: "/api/betaal/verify",
                    })
                )
                .catch((error) => {
                    console.log(error);
                });

            if (betaalResponse.status === 200) {
                console.log("check");
                setBetaal(true);
                setHtml(betaalResponse.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (account()) {
            handleBetaal(account().email);
        }
    }, []);

    return betaal ? <div dangerouslySetInnerHTML={{ __html: html }} /> : <Body />;

    function Body() {
        return (
            <div
                style={{
                    height: "100vh",
                    width: "100vw",
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
                            onClick={() => handleBetaal(form.current.email.value)}
                        >
                            Verstuur
                        </Button>
                    </Box>
                </Card>
            </div>
        );
    }
}
