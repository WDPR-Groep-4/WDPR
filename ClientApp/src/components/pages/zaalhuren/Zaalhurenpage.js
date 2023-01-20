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
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";

function ZaalhurenPage(props) {
    const [date, setDate] = useState();
    const [error, setError] = useState();
    const [aantalUur, setAantalUur] = useState(1);
    const [zaal, setZaal] = useState("1");
    const auth = useAuthUser();

    function onSubmit(e) {
        e.preventDefault();
    }

    function handleAantalUurChange(e) {
        const uur = e.target.value;
        if (uur >= 1 && uur <= 8) {
            setAantalUur(uur);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        const response = axios.post("/api/zaalhuren", {
            date,
            aantalUur,
            zaal,
        });
    }

    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = yyyy + "-" + mm + "-" + dd + "T00:00";

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
                        defaultValue={formattedToday}
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

                <Button variant="contained" color="primary" onClick={onSubmit}>
                    Verstuur
                </Button>
            </Page>
        );
    }

    return auth() ? <ZaalHuren /> : <NietIngelogd />;
}

export default ZaalhurenPage;
