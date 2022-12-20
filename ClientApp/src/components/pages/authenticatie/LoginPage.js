import { Button, TextField, Typography, Alert } from "@mui/material";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Footer from "../../footer/Footer";
import config from "../../../config.json";

export default function LoginPage() {
    const form = useRef(null);
    const [error, setError] = useState();

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = form.current;
        setError(null);

        // alle velden in een array zetten
        const dataArray = [
            { name: "email", value: formData["email"].value },
            { name: "wachtwoord", value: formData["wachtwoord"].value },
        ];

        // checken of er lege velden zijn
        const emptyFields = dataArray.filter((field) => field.value === "");
        if (emptyFields.length > 1) {
            setError(
                "Vul de volgende velden in: " +
                    emptyFields.map((field) => field.name).join(", ")
            );
            return;
        } else if (emptyFields.length === 1) {
            setError("Vul het volgende veld in: " + emptyFields[0].name);
            return;
        }

        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        // checken of e-mailadres geldig is
        if (!formData["email"].value.match(regex)) {
            setError("Geen geldig e-mailadres");
            return;
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
                }}
            >
                <div
                    style={{
                        width: 300,
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
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
                            width: 300,
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
                        <TextField name="wachtwoord" type="password" label="Wachtwoord" />
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
                </div>
            </div>
            <Footer />
        </div>
    );
}
