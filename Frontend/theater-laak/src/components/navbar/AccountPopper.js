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

export default function AccountPopper(props) {
    return (
        <Popper
            open={props.openAccount}
            anchorEl={props.anchorRef.current}
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
                            placement === "bottom-start" ? "left top" : "left bottom",
                    }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={props.handleCloseAccount}>
                            <div>
                                <Box sx={{ p: 1 }}>
                                    <Typography variant="h6">
                                        {props.account.naam}
                                    </Typography>
                                    <Typography variant="body2">
                                        {props.account.email}
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
                                        to="/mijn-kaarten"
                                    >
                                        Mijn kaarten
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem
                                        onClick={props.handleCloseAccount}
                                        component={Link}
                                        to="/"
                                    >
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
