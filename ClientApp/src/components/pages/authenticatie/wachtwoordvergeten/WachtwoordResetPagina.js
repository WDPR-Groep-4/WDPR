import { Typography, Card, Box, Alert, TextField, Button } from "@mui/material";
import { useRef } from "react";
import { useState } from "react";
import Footer from "../../../footer/Footer";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetWachtwoordPagina() {
    const form = useRef(null);
    const [error, setError] = useState();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const email = searchParams.get("email");
    console.log("email: ", email);
    const token = searchParams.get("token");
    console.log("token: ", token);

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = form.current;
        setError(null);

        if (formData.wachtwoord.value === "") {
            setError("Vul een wachtwoord in");
            return;
        }

        if (formData.herhaalWachtwoord.value === "") {
            setError("Herhaal het wachtwoord");
            return;
        }

        if (formData["wachtwoord"].value !== formData["herhaalWachtwoord"].value) {
            setError("Wachtwoorden komen niet overeen");
            return;
        }

        try {
            const response = await axios
                .post("/api/auth/resetwachtwoord", {
                    email: email,
                    token: token,
                    newpassword: formData["wachtwoord"].value,
                })
                .catch((err) => {
                    console.log("err: ", err);
                });

            if (response && response.status === 200) {
                navigate("/");
            }
        } catch (error) {
            console.log(error);
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
                                Reset wachtwoord
                            </Typography>
                            <Typography variant="body1" component="p">
                                Vul hieronder uw nieuwe wachtwoord in.
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
                            wijzigen
                        </Button>
                    </Box>
                </Card>
            </div>
            <Footer />
        </div>
    );
}
