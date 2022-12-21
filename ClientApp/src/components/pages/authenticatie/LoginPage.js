import { Button, TextField, Typography, Alert, Card, Box } from "@mui/material";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Footer from "../../footer/Footer";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import checkLeegVeld from "./Validatie";

export const login = async (setError, form, signIn, navigate) => {
    try {
        const respone = await axios
            .post("/api/auth/login", {
                email: form.current["email"].value,
                password: form.current["wachtwoord"].value,
            })
            .catch((err) => {
                setError(err.response.data.errors[0].description);
            });

        if (respone.status === 200) {
            if (
                signIn({
                    token: respone.data.token,
                    expiresIn: 3600,
                    tokenType: "Bearer",
                    authState: { email: form.current["email"].value },
                })
            ) {
                navigate("/");
            }
        }
    } catch (error) {
        console.log(error);
        setError(error.message);
    }
};

export default function LoginPage() {
    const form = useRef(null);
    const [error, setError] = useState();
    const signIn = useSignIn();
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = form.current;
        setError(null);

        if (checkLeegVeld(form, setError, true)) {
            return;
        }

        // checken of e-mailadres geldig is
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        if (!formData["email"].value.match(regex)) {
            setError("Geen geldig e-mailadres");
            return;
        }

        login(setError, form, signIn, navigate);
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
                                Login
                            </Typography>
                            <Typography variant="body1" component="p">
                                Log in om door te gaan.
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
                            <TextField
                                name="wachtwoord"
                                type="password"
                                label="Wachtwoord"
                            />
                        </form>
                        <Button variant="contained" color="primary" onClick={onSubmit}>
                            Log in
                        </Button>
                        <Typography fontSize="sm" sx={{ alignSelf: "center" }}>
                            nog geen account?{" "}
                            <Link style={{ color: "#1565c0" }} to="/registreer">
                                Registreer
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </div>
            <Footer />
        </div>
    );
}
