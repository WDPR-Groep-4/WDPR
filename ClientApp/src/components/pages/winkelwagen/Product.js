import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect } from "react";

export default function Product(props) {
    const { voorstelling, hoeveelheid, rang } = props;
    const prijs = voorstelling.prijzenPerRang.find((item) => item.rang === rang);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { md: "row", sm: "row", xs: "column" },
                backgroundColor: "#FFFFFF",
                border: "1px solid #0000001f",
                width: { xs: "100%", sm: "100%", md: "100%" },
            }}
        >
            <img
                src={voorstelling.afbeelding}
                alt="product"
                style={{
                    maxWidth: "12rem",
                    maxHeight: "12rem",
                    height: "25vw",
                    width: "25vw",
                    borderRight: "1px solid #0000001f",
                }}
            />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, ml: 3 }}>
                <Typography
                    variant="h6"
                    component="h3"
                    sx={{ fontWeight: 300, fontSize: 15, paddingTop: 2 }}
                >
                    Musical
                </Typography>
                <Typography
                    variant="h4"
                    component="h2"
                    sx={{ fontWeight: 500, fontSize: 24, marginTop: -1.5 }}
                >
                    {voorstelling.titel}
                </Typography>
            </Box>
            <Box
                sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "flex-end",
                    flexGrow: 1,
                    gap: 2,
                    pr: 3,
                }}
            >
                <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                        fontWeight: 400,
                        fontSize: 14,
                    }}
                >
                    Aantal: {hoeveelheid} x
                </Typography>
                <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                        fontWeight: 500,
                        fontSize: 20,
                    }}
                >
                    € {prijs.prijs * hoeveelheid}
                </Typography>
            </Box>
        </Box>
    );
}
