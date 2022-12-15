import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useRef, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountPopper from "./AccountPopper";

import DrawerComp from "./DrawerComp";
import AccountButton from "./AccountButton";
export default function Navbar(props) {
    const [openDrawer, setOpenDrawer] = useState(false);
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Agenda", path: "/agenda" },
        { name: "Steun ons", path: "/steun-ons" },
    ];

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="logo"
                    sx={{ display: { sm: "none" } }}
                    onClick={() => setOpenDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: "bold", flexGrow: 1 }}
                >
                    <Link to="/">Theater Laak</Link>
                </Typography>
                <Stack
                    direction={"row"}
                    spacing={1.5}
                    sx={{ display: { xs: "none", sm: "block" } }}
                >
                    {navLinks.map((link) => (
                        <Button key={link.path} color="inherit" sx={{ fontWeight: 600 }}>
                            <Link to={link.path}>{link.name}</Link>
                        </Button>
                    ))}
                </Stack>

                <Stack direction={"row"}>
                    <AccountButton>
                        <PersonIcon />
                    </AccountButton>
                    <IconButton color="inherit" sx={{ fontWeight: 600 }}>
                        <Link to="/winkelwagen" style={{ fontSize: 0 }}>
                            <ShoppingCartIcon />
                        </Link>
                    </IconButton>
                </Stack>
                <DrawerComp
                    navLinks={navLinks}
                    openDrawer={openDrawer}
                    setOpenDrawer={setOpenDrawer}
                ></DrawerComp>
            </Toolbar>
        </AppBar>
    );
}
