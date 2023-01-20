import { Alert, Button, TextField, Typography, Card, Box } from "@mui/material";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Footer from "../../footer/Footer";
import {FormControl} from "@mui/material";
import { useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Input from "@mui/material/Input";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import {InputLabel} from "@mui/material";

import checkLeegVeld from "./Validatie";
import axios from "axios";
import { login } from "./LoginPage";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import config from "../../../config.json";

export default function RegistreerPage() {
    const form = useRef(null);
    const [error, setError] = useState();
    const signIn = useSignIn();
    const navigate = useNavigate();

    const registreer = async () => {
        try {
            const response = await axios
                .post("/api/auth/registreer", {
                    voornaam: form.current["voornaam"].value,
                    achternaam: form.current["achternaam"].value,
                    email: form.current["email"].value,
                    password: form.current["wachtwoord"].value,
                })
                .catch((err) => {
                    console.log("err: ", err);
                    const error = err.response.data.errors[0];
                    console.log("error: ", error);

                    if (error.code === "DuplicateUserName") {
                        setError("E-mailadres is al in gebruik");
                    } else {
                        setError(error.description);
                    }
                });

            if (response && response.status === 201) {
                const email = form.current["email"].value;
                const wachtwoord = form.current["wachtwoord"].value;

                if (login(setError, email, wachtwoord, signIn)) {
                    navigate("/dashboard");
                }
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setError(null);
        const formData = form.current;

        if (checkLeegVeld(form, setError, false)) {
            return;
        }

        // checken of e-mailadres geldig is
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        if (!formData["email"].value.match(regex)) {
            setError("Geen geldig e-mailadres");
            return;
        }

        if (formData["wachtwoord"].value !== formData["herhaalWachtwoord"].value) {
            setError("Wachtwoorden komen niet overeen");
            return;
        }

        registreer();
    };

    document.title = "Registreer" + config.title;
    const [interests, setInterests] = useState([]);
    const [selectedInterests, setSelectedInterests] = useState([]);

    const handleInterestChange = (event) => {
        setSelectedInterests(event.target.value);
    };

useEffect(() => {
    axios.get('/api/interests').then(res => {
        setInterests(res.data);
    });
}, []);

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
                                name="achternaam"
                                type="text"
                                placeholder="Achternaam"
                                label="Achternaam"
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
                            <FormControl>
        <InputLabel id="interesse-label">Interesse</InputLabel>
        <Select
            labelId="interesse-label"
            id="interesse"
            multiple
            value={selectedInterests}
            onChange={handleInterestChange}
        >
            <MenuItem value="none">Geen interesse</MenuItem>
            {interests.map((interest) => (
                <MenuItem key={interest.id} value={interest.name}>
                    {interest.name}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
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

