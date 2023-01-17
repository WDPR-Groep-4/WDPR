import {
    Popper,
    Grow,
    Paper,
    ClickAwayListener,
    Box,
    Typography,
    Divider,
    MenuList,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

export default function PopperCompleet(props) {
    return (
        <Popper
            open={props.openPopper}
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
                                </Box>
                            </div>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );
}
