import { Drawer, Typography, Divider, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function DrawerCompleet(props) {
    return (
        <Drawer open={props.openDrawer} onBackdropClick={props.handleClose}>
            <Box
                sx={{
                    display: "flex",
                    p: 2,
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h6">{props.title}</Typography>
                <IconButton onClick={props.handleClose}>
                    <CloseIcon sx={{ mx: "auto" }} />
                </IconButton>
            </Box>
            <Divider />
            <Box>{props.children}</Box>
        </Drawer>
    );
}
