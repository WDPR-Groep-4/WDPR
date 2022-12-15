import { Button, FormControl, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";

export default function LoginPage() {
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
                        Login
                    </Typography>
                    <Typography variant="body1" component="p">
                        Log in om door te gaan.
                    </Typography>
                </div>
                <TextField
                    name="email"
                    type="email"
                    placeholder="name@mail.com"
                    label="Email"
                />
                <TextField name="password" type="password" label="Wachtwoord" />
                <Button variant="contained" color="primary">
                    Log in
                </Button>
                <Typography fontSize="sm" sx={{ alignSelf: "center" }}>
                    nog geen account?{" "}
                    <Link style={{ color: "#1565c0" }} to="/registreren">
                        Registreer
                    </Link>
                </Typography>
            </div>
        </div>
    );
}
