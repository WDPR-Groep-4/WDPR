import { Button, Card, TextField, Typography, Box, Alert } from "@mui/material";
import { useState, useRef } from "react";

export default function FakePayPagina(props) {
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
                        maxWidth: 400,
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        margin: 3,
                    }}
                >
                    <div>
                        <Typography variant="h5" component="h1">
                            u moet {props.bedrag} betalen
                        </Typography>
                        <Typography variant="body1" component="p">
                            Het account NL55ABNA5660751954 heeft oneindig veel geld.
                        </Typography>
                        <Typography variant="body1" component="p">
                            Het account NL02INGB8635612388 heeft in 50% van de gevallen
                            genoeg geld.
                        </Typography>
                        <Typography variant="body1" component="p">
                            Alle andere accounts hebben niet genoeg geld.
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
                        onSubmit={onSubmit}
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
    );
}
