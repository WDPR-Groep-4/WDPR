import { Box } from "@mui/system";
import { Card, Container, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import { useWinkelWagen } from "../../../services/WinkelwagenContext";

export default function BetaalPopup(props) {
    const [html, setHtml] = useState("");
    const [betaal, setBetaal] = useState(false);
    const { state } = useWinkelWagen();
    const totaal = state.winkelwagen.reduce((acc, item) => {
        const prijs = item.voorstelling.prijzenPerRang.find(
            (prijs) => prijs.rang === item.rang
        );
    }, 0);

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
            const backendBetaalResponse = await axios
                .post("https://localhost:5001/api/betaal", {
                    betaalId: betaalId,
                })
                .catch((error) => {
                    console.log(error);
                });
            if (betaalResponse.status === 200 && backendBetaalResponse.status === 200) {
                setBetaal(true);
                setHtml(betaalResponse.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function Body() {
        return (
            <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
                <Container maxWidth="xl">
                    <Card
                        sx={{
                            flexGrow: 1,
                            p: 3,
                            justifyContent: "center",
                            width: { sm: "100%", xs: "100%", md: "10%" },
                        }}
                        variant="outlined"
                    >
                        <Typography
                            variant="h4"
                            component="h3"
                            sx={{ fontSize: 24, fontWeight: 600 }}
                        >
                            Betaal
                        </Typography>
                        <Typography variant="h4" component="h3">
                            Voer uw gegevens in
                        </Typography>
                    </Card>
                </Container>
            </Box>
        );
    }

    return (
        <Box>
            {betaal ? <div dangerouslySetInnerHTML={{ __html: html }}></div> : <Body />}
        </Box>
    );
}
