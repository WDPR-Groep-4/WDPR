import { Box, Container } from "@mui/system";
import { Typography } from "@mui/material";
import Product from "./Product";

//https://reactjs.org/docs/lists-and-keys.html

export default function Winkelwagen(props) {
    return (
        <Container maxWidth="xl">
            <Box>
                <Typography variant="h4" component="h1" sx={{ my: 2 }}>
                    Winkelwagen
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: { sm: "column", md: "row" },
                }}
            >
                <Box
                    sx={{
                        border: 2,
                        borderColor: "#EBEBEB",
                        flexGrow: { sm: 1, md: 2 },
                    }}
                >
                    <h3>Producten</h3>
                </Box>
                <Box sx={{ border: 2, flexGrow: 1, borderColor: "#EBEBEB" }}>
                    <span
                        sx={{ fontSize: 24, fontFamily: "Outfit", fontStyle: "SemiBold" }}
                    >
                        Totaal
                    </span>
                    <Product />
                </Box>
            </Box>
        </Container>
    );
}
