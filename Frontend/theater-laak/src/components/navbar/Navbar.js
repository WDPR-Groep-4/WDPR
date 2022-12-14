import {
    AppBar,
    Button,
    ClickAwayListener,
    CssBaseline,
    Grow,
    IconButton,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Toolbar,
    Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useRef, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: "bold", flexGrow: 1 }}
                >
                    <Link to="/">Theater Laak</Link>
                </Typography>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="logo"
                    sx={{ display: { sm: "none" } }}
                >
                    <MenuIcon />
                </IconButton>
                <Stack
                    direction={"row"}
                    spacing={1.5}
                    sx={{ display: { xs: "none", sm: "block" } }}
                >
                    <Button color="inherit" sx={{ fontWeight: 600 }}>
                        <Link to="/">Home</Link>
                    </Button>
                    <Button color="inherit" sx={{ fontWeight: 600 }}>
                        <Link to="/agenda">Agenda</Link>
                    </Button>
                    <Button color="inherit" sx={{ fontWeight: 600 }}>
                        <Link to="/steun-ons">Steun ons</Link>
                    </Button>

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
                    <Popper
                        open={openAccount}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        placement="bottom-start"
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === "bottom-start"
                                            ? "left top"
                                            : "left bottom",
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleCloseAccount}>
                                        <MenuList
                                            autoFocusItem={openAccount}
                                            id="composition-button"
                                            onKeyDown={handleListKeyDown}
                                        >
                                            <MenuItem onClick={handleCloseAccount}>
                                                <Link to="/account">Account</Link>
                                            </MenuItem>
                                            <MenuItem onClick={handleCloseAccount}>
                                                <Link to="/account/kaarten">
                                                    Mijn kaartjes
                                                </Link>
                                            </MenuItem>
                                            <MenuItem onClick={handleCloseAccount}>
                                                Uitloggen
                                            </MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
