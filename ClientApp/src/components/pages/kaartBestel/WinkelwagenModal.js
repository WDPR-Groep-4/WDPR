import PopupModal from "../../Utility/PopupModal";
import { Button, Typography, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WinkelwagenModal({ open, onClose }) {
    const navigate = useNavigate();

    console.log("modal", open);

    function handleBestel() {
        navigate("/agenda");
        onClose();
    }

    function handleWinkelwagen() {
        navigate("/winkelwagen");
        onClose();
    }

    return (
        <PopupModal open={open} onClose={onClose} aria-labelledby={"Winkelwagen-modal"}>
            <Typography variant="h6" component="h2">
                Wil je doorgaan met bestellen?
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    justifyContent: "center",
                    mt: 2,
                }}
            >
                <Button variant="contained" onClick={handleBestel}>
                    Ja, naar agenda
                </Button>
                <Button variant="contained" onClick={handleWinkelwagen}>
                    nee, naar Winkelwagen
                </Button>
            </Box>
        </PopupModal>
    );
}
