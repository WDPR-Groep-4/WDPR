import {
    Popper,
    Grow,
    Paper,
    ClickAwayListener,
    MenuList,
    MenuItem,
    Typography,
    Divider,
    Box,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSignOut } from "react-auth-kit";
import { useAuthUser } from "react-auth-kit";

export default function AccountPopper(props) {
    const signOut = useSignOut();
    const account = useAuthUser();

    const handleLogout = (e) => {
        signOut();
        props.handleCloseAccount(e);
    };

    return (
        <Popper
            open={props.openAccount}
            anchorEl={props.anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
        >
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin:
                            placement === "bottom-start" ? "left top" : "left bottom",
                    }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={props.handleCloseAccount}>
                            <div>
                                <Box sx={{ p: 1 }}>
                                    <Typography variant="h6">Welkom</Typography>
                                    <Typography variant="body2">
                                        {account() && account().email}
                                    </Typography>
                                </Box>
                                <Divider />

                                <MenuList
                                    autoFocusItem={props.openAccount}
                                    id="composition-button"
                                    onKeyDown={props.handleListKeyDown}
                                >
                                    <MenuItem
                                        onClick={props.handleCloseAccount}
                                        component={Link}
                                        to="/account"
                                    >
                                        Account
                                    </MenuItem>
                                    <MenuItem
                                        onClick={props.handleCloseAccount}
                                        component={Link}
                                        to="/account/mijntickets"
                                    >
                                        Mijn tickets
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleLogout}>
                                        <ListItemIcon>
                                            <LogoutIcon />
                                        </ListItemIcon>
                                        <ListItemText>Uitloggen</ListItemText>
                                    </MenuItem>
                                </MenuList>
                            </div>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );
}
