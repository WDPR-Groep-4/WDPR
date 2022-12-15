import { Drawer, List, ListItemButton } from "@mui/material";
import { useState } from "react";

export default function DrawerComp(props) {
    return (
        <>
            <Drawer open={props.openDrawer}>
                <List>
                    {props.navLinks.map((link) => (
                        <ListItemButton
                            onClick={() => props.setOpenDrawer(false)}
                            key={link.name}
                        >
                            {link.name}
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
        </>
    );
}
