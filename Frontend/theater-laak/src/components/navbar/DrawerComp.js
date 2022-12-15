import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";

import { Link } from "react-router-dom";

export default function DrawerComp(props) {
    return (
        <>
            <Drawer
                open={props.openDrawer}
                anchorEl={props.anchorRef.current}
                onBackdropClick={props.handleCloseAccount}
            >
                <Typography variant="h6" sx={{ p: 2 }}>
                    Theather Laak
                </Typography>
                <Divider />
                <Box>
                    <List>
                        {props.navLinks.map((link) => (
                            <ListItem>
                                <ListItemButton
                                    onClick={() => props.setOpenDrawer(false)}
                                    key={link.name}
                                    component={Link}
                                    to={link.path}
                                >
                                    <ListItemText primary={link.name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    );
}
