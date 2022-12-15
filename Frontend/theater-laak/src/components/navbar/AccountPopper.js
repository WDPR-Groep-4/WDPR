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
                                <MenuItem onClick={props.handleCloseAccount}>
                                    <Link to="/account">Account</Link>
                                </MenuItem>
                                <MenuItem onClick={props.handleCloseAccount}>
                                    <Link to="/account/kaarten">Mijn kaartjes</Link>
                                </MenuItem>
                                <MenuItem onClick={props.handleCloseAccount}>
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
