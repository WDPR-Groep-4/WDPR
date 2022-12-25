import { Typography, Card, Box, Alert, TextField, Button } from "@mui/material";
import { useRef } from "react";
import { useState } from "react";
import Footer from "../../../footer/Footer";

export default function WachtwoordVergetenPage() {
    const form = useRef(null);
    const [error, setError] = useState();

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
            <Footer />
        </div>
    );
}
