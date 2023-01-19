import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import { useRef, useState } from "react";
import FakePayPagina from "../winkelwagen/Betaling/FakePayPage";

export default function IngelogdEnToken(props) {
    const form = useRef(null);
    const auth = useAuthUser();
    const [error, setError] = useState();
    const [bedrag, setBedrag] = useState(1);

    function handleChange(e) {
        const bedrag = e.target.value;
        if (bedrag >= 1) {
            setBedrag(bedrag);
        }
    }

    async function onSubmit(e) {
        e.preventDefault();
        const formData = form.current;
        setError(null);
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 500 }}>
            <Typography>U kunt hier een donatie doen.</Typography>
            <form ref={form} onSubmit={onSubmit}>
                <TextField
                    label="Bedrag"
                    name="bedrag"
                    type="number"
                    value={bedrag}
                    onChange={handleChange}
                />
            </form>
            <FakePayPagina
                achtergrond={false}
                bedrag={bedrag}
                isDonatie={true}
                token={props.token}
            />
        </Box>
    );
}
