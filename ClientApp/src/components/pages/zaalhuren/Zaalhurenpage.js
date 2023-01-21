import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
    Card,
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    FormControl,
    Select,
    MenuItem,
} from "@mui/material";
import Footer from "../../footer/Footer";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";
import { useAuthHeader } from "react-auth-kit";
import FakePayPagina from "../winkelwagen/Betaling/FakePayPage";
import { useNavigate } from "react-router-dom";

function ZaalhurenPage(props) {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = yyyy + "-" + mm + "-" + dd + "T00:00";
    const [date, setDate] = useState(formattedToday);
    const [error, setError] = useState();
    const [aantalUur, setAantalUur] = useState(1);
    const [zaal, setZaal] = useState(1);
    const auth = useAuthUser();
    const authHeader = useAuthHeader();
    const [betaal, setBetaal] = useState(false);
    const navigate = useNavigate();

    function getPrijs(e) {
        return aantalUur * 1000;
    }

    const yourConfig = {
        headers: {
            Authorization: authHeader(),
        },
    };

    function handleAantalUurChange(e) {
        const uur = e.target.value;
        if (uur >= 1 && uur <= 8) {
            setAantalUur(uur);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        const response = await axios
            .get(
                "/api/huurevent",
                {
                    params: {
                        Start: date,
                        AantalUren: aantalUur,
                        ZaalId: zaal,
                    },
                },
                yourConfig
            )
            .catch((err) => {
                setError("Deze zaal is al bezet op deze dag");
                console.log(err);
            });

        if (response && response.status === 200) {
            setBetaal(true);
        }
    }

    async function handleBetaal(formData, succes) {
        if (succes) {
            const response = await axios
                .post(
                    "/api/huurevent",
                    {
                        Start: date,
                        AantalUren: aantalUur,
                        ZaalId: zaal,
                    },
                    yourConfig
                )
                .catch((err) => {
                    console.log(err);
                    setError(err.response.data);
                });

            if (response && response.status === 200) {
                navigate("/winkelwagen/bedankt");
            }
        }
    }

    function Page(props) {
        return (
            <div>
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
                            {props.children}
                        </Box>
                    </Card>
                </div>
                <Footer />
            </div>
        );
    }

    function NietIngelogd() {
        return (
            <Page>
                <Typography variant="h5" component="h1">
                    Zaal huren
                </Typography>
                <Typography variant="body1" component="p">
                    U moet ingelogd zijn om een zaal te kunnen huren
                </Typography>
            </Page>
        );
    }

    function ZaalHuren() {
        return (
            <Page>
                <div>
                    <Typography variant="h5" component="h1">
                        Zaal huren
                    </Typography>
                    <Typography variant="body1" component="p">
                        Vul de gegevens in om een zaal te huren
                    </Typography>
                </div>
                {error && <Alert severity="error">{error}</Alert>}
                <form
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                    }}
                >
                    <TextField
                        id="datetime-local"
                        label="Next appointment"
                        type="datetime-local"
                        onChange={(e) => {
                            setDate(e.target.value);
                        }}
                        value={date}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        name="aantalUur"
                        type="number"
                        label="Aantal uur"
                        value={aantalUur}
                        onChange={handleAantalUurChange}
                    />

                    <Select
                        name="zaal"
                        label="Zaal"
                        value={zaal}
                        onChange={(e) => {
                            setZaal(e.target.value);
                        }}
                    >
                        <MenuItem value="1">Zaal 1</MenuItem>
                        <MenuItem value="2">Zaal 2</MenuItem>
                        <MenuItem value="3">Zaal 3</MenuItem>
                        <MenuItem value="4">Zaal 4</MenuItem>
                    </Select>
                </form>

                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Verstuur
                </Button>
            </Page>
        );
    }

    return auth() ? (
        betaal ? (
            <FakePayPagina bedrag={getPrijs()} handleBetaal={handleBetaal} />
        ) : (
            <ZaalHuren />
        )
    ) : (
        <NietIngelogd />
    );
}

export default ZaalhurenPage;
