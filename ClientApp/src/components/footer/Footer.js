import { Button, Container, ListItem, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { blue } from "@mui/material/colors";
import { Link } from "react-router-dom";

export default function Footer(props) {
    return (
        <Box
            bgcolor={blue[700]}
            sx={{ width: "100%", color: "white", overflow: "hidden" }}
        >
            <Container
                maxWidth="xl"
                sx={{
                    display: "flex",
                    flexDirection: { sm: "column", md: "row" },
                    flexWrap: { sm: "wrap", md: "nowrap"},
                    justifyContent: "space-around",
                    p: 3,
                }}
            >
                <Stack>
                        <Typography variant="h6" sx={{ textAlign: "center", pt: 1 }}>Algemeen</Typography>
                        <Button variant="text" color="inherit" component={Link} to="/" sx={{ p: 1.5 }}>
                            Home
                        </Button>
                        <Button variant="text" color="inherit" component={Link} to="/steun-ons" sx={{ p: 1.5 }}>
                            Steun ons
                        </Button>
                        <Button variant="text" color="inherit" component={Link} to="/over-ons" sx={{ p: 1.5 }}>
                            Over ons
                        </Button>
                </Stack>
                <Stack>
                        <Typography variant="h6" sx={{ textAlign: "center", pt: 1 }}>Voorstellingen</Typography>
                        <Button variant="text" color="inherit" component={Link} to="/agenda" sx={{ p: 1.5 }}>
                            Agenda
                        </Button>
                        <Button variant="text" color="inherit" component={Link} to="/winkelwagen" sx={{ p: 1.5 }}>
                            WinkelWagen
                        </Button>
                </Stack>
                <Stack>
                    <Typography variant="h6" sx={{ textAlign: "center", pt: 1 }}>Mijn Theater Laak</Typography>
                        <Button variant="text" color="inherit" component={Link} to="/account" sx={{ p: 1.5 }}>
                            Account
                        </Button>
                        <Button variant="text" color="inherit" component={Link} to="/mijntickets" sx={{ p: 1.5 }}>
                            Mijn tickets
                        </Button>
                        <Button variant="text" color="inherit" component={Link} to="/account/donaties" sx={{ p: 1.5 }}>
                            Mijn donaties
                        </Button>
                </Stack>
                <Stack>
                    <Typography variant="h6" sx={{ textAlign: "center", pt: 1 }}>Aanmelden</Typography>
                        <Button variant="text" color="inherit" component={Link} to="/login" sx={{ p: 1.5 }}>
                            Login
                        </Button>
                        <Button variant="text" color="inherit" component={Link} to="/registreer" sx={{ p: 1.5 }}>
                            Registreer
                        </Button>
                </Stack>
            </Container>
        </Box>
    );
}
