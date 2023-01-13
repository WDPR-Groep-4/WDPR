import { Typography, Card, Box, Alert, TextField, Button } from "@mui/material";
import { useRef } from "react";
import { useState } from "react";
import Footer from "../../../footer/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function WachtwoordVergetenPage() {
    const form = useRef(null);
    const [error, setError] = useState();
    const navigate = useNavigate();
    const [succes, setSuccess] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = form.current;
        setError(null);

        if (formData.email.value === "") {
            setError("Vul een emailadres in");
            return;
        }

        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        if (!formData["email"].value.match(regex)) {
            setError("Geen geldig e-mailadres");
            return;
        }

        try {
            const response = await axios
                .post("/api/auth/wachtwoordvergeten", {
                    email: formData["email"].value,
                })
                .catch((err) => {
                    console.log("err: ", err);
                    setError("Er is iets misgegaan");
                });

            if (response && response.status === 200) {
                setSuccess(true);
            }
        } catch (error) {
            console.log(error);
            setError("Er is iets misgegaan");
            return;
        }
    };

    function WachtwoordVergetenForm() {
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
                                Wachtwoord vergeten
                            </Typography>
                            <Typography variant="body1" component="p">
                                Vul hieronder uw e-mailadres in om een wachtwoord reset
                                link te ontvangen.
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
                        <Button variant="contained" color="primary" onClick={onSubmit}>
                            Verstuur
                        </Button>
                    </Box>
                </Card>
            </div>
        );
    }

    function EmailVerzonden() {
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
                                Reset link verzonden
                            </Typography>
                            <Typography variant="body1" component="p">
                                Er is een e-mail verzonden naar uw e-mailadres. Klik op de
                                link in de e-mail om uw wachtwoord te resetten.
                            </Typography>
                        </div>
                    </Box>
                </Card>
            </div>
        );
    }

    return (
        <div>
            {succes ? <EmailVerzonden /> : <WachtwoordVergetenForm />}
            <Footer />
        </div>
    );
}
