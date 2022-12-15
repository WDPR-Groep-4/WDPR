import { Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function RegistreerPage() {
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
                <TextField name="password" type="password" label="Wachtwoord" />
                <TextField name="password" type="password" label="Herhaal wachtwoord" />
                <Button variant="contained" color="primary">
                    Registreer
                </Button>
                <Typography fontSize="sm" sx={{ alignSelf: "center" }}>
                    al een account?{" "}
                    <Link style={{ color: "#1565c0" }} to="/login">
                        Log in
                    </Link>
                </Typography>
            </div>
        </div>
    );
}
