import { Typography, TextField, Button, Alert } from "@mui/material";
import { Box } from "@mui/system";
import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function PersoonlijkeGegevens(props) {
    const [error, setError] = useState();
    const form = useRef(null);

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

        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        // checken of e-mailadres geldig is
        if (!formData["email"].value.match(regex)) {
            setError("Geen geldig e-mailadres");
            return;
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" component={"h2"}>
                Persoonlijke gegevens
            </Typography>
            <Typography variant="body1" component={"p"} sx={{ pb: 2 }}>
                Hier kan je je persoonlijke gegevens aanpassen.
            </Typography>
            <div>
                <form
                    ref={form}
                    style={{
                        width: 300,
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                    }}
                >
                    {error && <Alert severity="error">{error}</Alert>}
                    <TextField
                        name="voornaam"
                        type="text"
                        placeholder="Voornaam"
                        label="Voornaam"
                        defaultValue={props.user.naam}
                    />
                    <TextField
                        name="email"
                        type="email"
                        placeholder="name@mail.com"
                        label="Email"
                        defaultValue={props.user.email}
                    />
                    <TextField
                        name="wachtwoord"
                        type="password"
                        label="Wachtwoord"
                        defaultValue={props.user.email}
                    />
                    <TextField
                        name="herhaalWachtwoord"
                        type="password"
                        label="Herhaal wachtwoord"
                        defaultValue={props.user.email}
                    />
                    <Button variant="contained" color="primary" onClick={onSubmit}>
                        Pas aan
                    </Button>
                </form>
            </div>
        </Box>
    );
}
