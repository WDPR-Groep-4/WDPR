import { Alert, Button, TextField, Typography } from "@mui/material";
import { useRef } from "react";
import { Form, Link } from "react-router-dom";
import { useState } from "react";

export default function RegistreerPage() {
    const form = useRef(null);
    const [error, setError] = useState();

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = form.current;
        setError(null);

        // alle velden in een array zetten
        const dataArray = [
            { name: "voornaam", value: formData["voornaam"].value },
            { name: "email", value: formData["email"].value },
            { name: "wachtwoord", value: formData["wachtwoord"].value },
            { name: "herhaalWachtwoord", value: formData["herhaalWachtwoord"].value },
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

        // checken of wachtwoorden overeenkomen
        if (formData["wachtwoord"].value !== formData["herhaalWachtwoord"].value) {
            setError("Wachtwoorden komen niet overeen");
            return;
        }

        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        // checken of e-mailadres geldig is
        if (!formData["email"].value.match(regex)) {
            setError("Geen geldig e-mailadres");
            return;
        }
    };
    return (
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
                style={{ width: 300, display: "flex", flexDirection: "column", gap: 16 }}
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
                    <TextField name="wachtwoord" type="password" label="Wachtwoord" />
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
            </div>
        </div>
    );
}
