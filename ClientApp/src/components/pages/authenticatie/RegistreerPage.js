import { Alert, Button, TextField, Typography, Card, Box } from "@mui/material";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Footer from "../../footer/Footer";

export default function RegistreerPage() {
    const form = useRef(null);
    const [error, setError] = useState();

    const onSubmit = (e) => {
        e.preventDefault();
        setError(null);
        const formData = form.current;

        // alle velden in een array zetten

        // checken of wachtwoorden overeenkomen
        if (formData["wachtwoord"].value !== formData["herhaalWachtwoord"].value) {
            setError("Wachtwoorden komen niet overeen");
            return;
        }

        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        // checken of e-mailadres geldig is
        if (!formData["email"].value.match(regex)) {
            setError("Geen geldig e-mailadres");
            return;
        }
    };

    return (
        <div>
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
                            m: 3,
                        }}
                    >
                        <div>
                            <Typography variant="h5" component="h1">
                                Registreer
                            </Typography>
                            <Typography variant="body1" component="p">
                                Registreer om door te gaan.
                            </Typography>
                        </div>
                        {error && <Alert severity="error">{error}</Alert>}
                        <form
                            ref={form}
                            style={{
                                width: 300,
                                display: "flex",
                                flexDirection: "column",
                                gap: 16,
                            }}
                        >
                            <TextField
                                name="voornaam"
                                type="text"
                                placeholder="Voornaam"
                                label="Voornaam"
                            />
                            <TextField
                                name="email"
                                type="email"
                                placeholder="name@mail.com"
                                label="Email"
                            />
                            <TextField
                                name="wachtwoord"
                                type="password"
                                label="Wachtwoord"
                            />
                            <TextField
                                name="herhaalWachtwoord"
                                type="password"
                                label="Herhaal wachtwoord"
                            />
                        </form>
                        <Button variant="contained" color="primary" onClick={onSubmit}>
                            Registreer
                        </Button>
                        <Typography fontSize="sm" sx={{ alignSelf: "center" }}>
                            Al een account?{" "}
                            <Link style={{ color: "#1565c0" }} to="/login">
                                Log in
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </div>
            <Footer />
        </div>
    );
}
