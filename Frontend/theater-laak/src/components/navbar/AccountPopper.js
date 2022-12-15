import {
    Popper,
    Grow,
    Paper,
    ClickAwayListener,
    MenuList,
    MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";

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
                                    Mijn kaartjes
                                </MenuItem>
                                <MenuItem
                                    onClick={props.handleCloseAccount}
                                    component={Link}
                                    to="/"
                                >
                                    Uitloggen
                                </MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );
}
