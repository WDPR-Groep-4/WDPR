import { Box } from "@mui/system";
import { Card, Container, Typography, Alert, TextField, Button } from "@mui/material";
import { useState, useRef } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import { useWinkelWagen } from "../../../services/WinkelwagenContext";
import { useAuthUser } from "react-auth-kit";

export default function BetaalPopup(props) {
    const [html, setHtml] = useState("");
    const [betaal, setBetaal] = useState(false);
    const { state, totaalWinkelwagen } = useWinkelWagen();
    const totaal = totaalWinkelwagen();
    const account = useAuthUser();
    const [error, setError] = useState("");
    const form = useRef(null);

    async function handleBetaal() {
        try {
            const betaalId = nanoid();
            const betaalResponse = await axios
                .post(
                    "https://fakepay.azurewebsites.net/",
                    new URLSearchParams({
                        amount: totaal,
                        reference: "test",
                        url: "https://localhost:44419/winkelwagen/betaald",
                    })
                )
                .catch((error) => {
                    console.log(error);
                });
            // const backendBetaalResponse = await axios
            //     .post("https://localhost:5001/api/betaal", {
            //         betaalId: betaalId,
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
            if (betaalResponse.status === 200) {
                setBetaal(true);
                setHtml(betaalResponse.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (account()) {
        handleBetaal();

        return (
            <Box>
                {betaal ? (
                    <div dangerouslySetInnerHTML={{ __html: html }}></div>
                ) : (
                    <Typography variant="h4" component="h3">
                        loading..
                    </Typography>
                )}
            </Box>
        );
    } else {
        return (
            <Box>
                {betaal ? (
                    <div dangerouslySetInnerHTML={{ __html: html }}></div>
                ) : (
                    <Body />
                )}
            </Box>
        );
    }

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
                        <Button variant="contained" color="primary">
                            Verstuur
                        </Button>
                    </Box>
                </Card>
            </div>
        );
    }
}
