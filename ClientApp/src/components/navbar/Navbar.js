import {
    AppBar,
    Box,
    Button,
    IconButton,
    ListItem,
    Toolbar,
    Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountButton from "./AccountButton";
import MobileMenuButton from "./MobileMenuButton";
import account from "./account.json";

export default function Navbar(props) {
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Agenda", path: "/agenda" },
        { name: "Steun ons", path: "/steun-ons" },
    ];

    return (
        <AppBar position="static">
            <Toolbar sx={{ width: "100%", maxWidth: 1536, mx: "auto" }}>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: "bold", flexGrow: 1, fontSize: 24 }}
                >
                    <Link to="/">Theater Laak</Link>
                </Typography>

                <Stack
                    direction={"row"}
                    spacing={1.5}
                    sx={{ display: { xs: "none", sm: "block" } }}
                >
                    {navLinks.map((link) => (
                        <Box
                            key={link.name}
                            component={Link}
                            to={link.path}
                            sx={{ width: "max-content" }}
                        >
                            <Button
                                color="inherit"
                                sx={{
                                    fontWeight: 600,
                                }}
                                variant="text"
                            >
                                {link.name}
                            </Button>
                        </Box>
                    ))}
                </Stack>

                <Stack direction={"row"}>
                    <AccountButton account={account}>
                        <PersonIcon />
                    </AccountButton>
                    <ListItem component={Link} to="/winkelwagen">
                        <IconButton color="inherit" sx={{ fontWeight: 600 }}>
                            <ShoppingCartIcon />
                        </IconButton>
                    </ListItem>
                    <MobileMenuButton navLinks={navLinks} />
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
