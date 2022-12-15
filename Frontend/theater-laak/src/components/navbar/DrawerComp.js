import { Drawer, List, ListItemButton } from "@mui/material";

import { Link } from "react-router-dom";

export default function DrawerComp(props) {
    return (
        <>
            <Drawer
                open={props.openDrawer}
                anchorEl={props.anchorRef.current}
                onBackdropClick={props.handleCloseAccount}
            >
                <List>
                    {props.navLinks.map((link) => (
                        <ListItemButton
                            onClick={() => props.setOpenDrawer(false)}
                            key={link.name}
                            component={Link}
                            to={link.path}
                        >
                            {link.name}
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
        </>
    );
}
