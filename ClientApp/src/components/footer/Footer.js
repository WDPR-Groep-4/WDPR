import { Button, Container, ListItem, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { blue } from "@mui/material/colors";
import { Link } from "react-router-dom";

export default function Footer(props) {
    return (
        <Box bgcolor={blue[700]} sx={{ width: "100vw", color: "white" }}>
            <Container
                maxWidth="xl"
                sx={{ display: "flex", justifyContent: "space-around", p: 3 }}
            >
                <Stack>
                    <ListItem sx={{ textAlign: "center" }}>
                        <Typography variant="h6">Algemeen</Typography>
                    </ListItem>
                    <ListItem component={Link} to="/">
                        <Button variant="text" color="inherit">
                            Home
                        </Button>
                    </ListItem>
                    <ListItem component={Link} to="/steun-ons">
                        <Button variant="text" color="inherit">
                            Steun ons
                        </Button>
                    </ListItem>
                    <ListItem component={Link} to="/over-ons">
                        <Button variant="text" color="inherit">
                            Over ons
                        </Button>
                    </ListItem>
                </Stack>
                <Stack>
                    <ListItem sx={{ textAlign: "center" }}>
                        <Typography variant="h6">Voorstellingen</Typography>
                    </ListItem>
                    <ListItem component={Link} to="/agenda">
                        <Button variant="text" color="inherit">
                            Agenda
                        </Button>
                    </ListItem>
                    <ListItem component={Link} to="/winkelwagen">
                        <Button variant="text" color="inherit">
                            WinkelWagen
                        </Button>
                    </ListItem>
                </Stack>
                <Stack>
                    <ListItem sx={{ textAlign: "center" }}>
                        <Typography variant="h6">Mijn Theater Laak</Typography>
                    </ListItem>
                    <ListItem component={Link} to="/account">
                        <Button variant="text" color="inherit">
                            Account
                        </Button>
                    </ListItem>
                    <ListItem component={Link} to="/account/kaarten">
                        <Button variant="text" color="inherit">
                            Mijn kaarten
                        </Button>
                    </ListItem>
                    <ListItem component={Link} to="/account/donaties">
                        <Button variant="text" color="inherit">
                            Mijn dontaties
                        </Button>
                    </ListItem>
                </Stack>
                <Stack>
                    <ListItem sx={{ textAlign: "center" }}>
                        <Typography variant="h6">Aanmelden</Typography>
                    </ListItem>
                    <ListItem component={Link} to="/login">
                        <Button variant="text" color="inherit">
                            Login
                        </Button>
                    </ListItem>
                    <ListItem component={Link} to="/registreer">
                        <Button variant="text" color="inherit">
                            Registreer
                        </Button>
                    </ListItem>
                </Stack>
            </Container>
        </Box>
    );
}
