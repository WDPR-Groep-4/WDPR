import { Box, TextField, Typography } from "@mui/material";
import { useAuthUser } from "react-auth-kit";
import { useRef, useState } from "react";
import FakePayPagina from "../winkelwagen/Betaling/FakePayPage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function IngelogdEnToken(props) {
    const form = useRef(null);
    const auth = useAuthUser();
    const [error, setError] = useState();
    const [bedrag, setBedrag] = useState(1);
    const navigate = useNavigate();

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

    async function donatieBetaling(formData, succes) {
        const config = {
            headers: { Authorization: `Bearer ${props.token}` },
        };

        const response = await axios.post(
            "https://ikdoneer.azurewebsites.net/api/donatie",
            {
                Doel: "21",
                Hoeveelheid: props.bedrag,
                Tekst: "Dit is een donatie, gefeliciteerd",
            },
            config
        );

        if (response && response.status === 200) {
            navigate("/winkelwagen/bedankt");
        }
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
                handleBetaal={donatieBetaling}
            />
        </Box>
    );
}
