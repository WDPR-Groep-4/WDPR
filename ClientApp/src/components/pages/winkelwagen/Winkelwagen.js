import { Box, Container } from "@mui/system";
import { Card, Divider, Stack, Typography } from "@mui/material";
import Product from "./Product";

//https://reactjs.org/docs/lists-and-keys.html

export default function Winkelwagen(props) {
    return (
        <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <Container maxWidth="xl">
                <Box>
                    <Typography variant="h4" component="h1" sx={{ py: 2 }}>
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
                    <Card
                        sx={{
                            flexGrow: { sm: 1, md: 2 },
                            p: 2,
                        }}
                        variant="outlined"
                    >
                        <h3>Producten</h3>
                        <Divider sx={{ mb: 1 }} />
                        <Stack
                            direction="column"
                            sx={{
                                gap: 2,
                            }}
                        >
                            <Product />
                            <Product />
                            <Product />
                        </Stack>
                    </Card>
                    <Card sx={{ flexGrow: 1, p: 2 }} variant="outlined">
                        <span
                            sx={{
                                fontSize: 24,
                                fontFamily: "Outfit",
                                fontStyle: "SemiBold",
                            }}
                        >
                            Totaal
                        </span>
                        <Divider sx={{ mb: 1 }} />
                    </Card>
                </Box>
            </Container>
        </Box>
    );
}
