import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useRef, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountPopper from "./AccountPopper";
import NavLinks from "./NavLinks";

export default function Navbar(props) {
    const [openAccount, setOpenAccount] = useState(false);
    const anchorRef = useRef(null);

    const handleToggleAccount = () => {
        setOpenAccount((prev) => !prev);
    };

    const handleCloseAccount = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpenAccount(false);
    };

    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpenAccount(false);
        } else if (event.key === "Escape") {
            setOpenAccount(false);
        }
    }

    const prevOpenAccount = useRef(openAccount);
    useEffect(() => {
        if (prevOpenAccount.current === true && openAccount === false) {
            anchorRef.current.focus();
        }

        prevOpenAccount.current = openAccount;
    }, [openAccount]);

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="logo"
                    sx={{ display: { sm: "none" } }}
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
                    <NavLinks />
                </Stack>
                <Stack direction={"row"}>
                    <IconButton
                        color="inherit"
                        sx={{ fontWeight: 600 }}
                        ref={anchorRef}
                        aria-controls={openAccount ? "composition-menu" : undefined}
                        aria-expanded={openAccount ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleToggleAccount}
                    >
                        <PersonIcon />
                    </IconButton>
                    <IconButton color="inherit" sx={{ fontWeight: 600 }}>
                        <Link to="/winkelwagen" style={{ fontSize: 0 }}>
                            <ShoppingCartIcon />
                        </Link>
                    </IconButton>
                    <AccountPopper
                        openAccount={openAccount}
                        anchorRef={anchorRef}
                        handleCloseAccount={handleCloseAccount}
                        handleListKeyDown={handleListKeyDown}
                    />
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
