import { Button, TextField, Typography, Alert, Card, Box } from "@mui/material";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Footer from "../../footer/Footer";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import checkLeegVeld from "./Validatie";
import config from "../../../config.json";

export const login = async (setError, email, wachtwoord, signIn) => {
    try {
        const response = await axios
            .post("/api/auth/login", {
                email: email,
                password: wachtwoord,
            })
            .catch((err) => {
                console.log("err: ", err);
                const error = err.response.statusText;
                if (error === "Unauthorized") {
                    setError("Verkeerde email of wachtwoord");
                }
                return false;
            });

        if (response && response.status === 200) {
            if (
                await signIn({
                    token: response.data.token,
                    expiresIn: 3600,
                    tokenType: "Bearer",
                    authState: { email: email },
                })
            ) {
                return true;
            }
        }
    } catch (error) {
        console.log(error);
        setError(error.message);
        return false;
    }
};

export default function LoginPage() {
    const form = useRef(null);
    const [error, setError] = useState();
    const signIn = useSignIn();
    const navigate = useNavigate();

    const onSubmit = async (e) => {
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

        const email = formData["email"].value;
        const wachtwoord = formData["wachtwoord"].value;

        if (await login(setError, email, wachtwoord, signIn)) {
            navigate("/");
        }
    };

    document.title = "Login" + config.title;

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
                        <Typography sx={{ alignSelf: "start", my: -1 }}>
                            <Link style={{ color: "#1565c0" }} to="/wachtwoordvergeten">
                                Wachtwoord vergeten?
                            </Link>
                        </Typography>

                        <Button variant="contained" color="primary" onClick={onSubmit}>
                            Log in
                        </Button>
                        <Typography fontSize="xs" sx={{ alignSelf: "center" }}>
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
