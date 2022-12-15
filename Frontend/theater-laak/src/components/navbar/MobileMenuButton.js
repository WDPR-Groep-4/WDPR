import MenuIcon from "@mui/icons-material/Menu";
import { useState, useRef, useEffect } from "react";
import DrawerComp from "./DrawerComp";
import { IconButton } from "@mui/material";

export default function MobileMenuButton(props) {
    const [openDrawer, setOpenDrawer] = useState(false);
    const anchorRef = useRef(null);
    console.log("openDrawer: ", openDrawer);

    const handleToggleAccount = () => {
        setOpenDrawer((prev) => !prev);
    };

    const handleCloseAccount = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpenDrawer(false);
    };

    const prevOpenDrawer = useRef(openDrawer);
    useEffect(() => {
        if (prevOpenDrawer.current === true && openDrawer === false) {
            anchorRef.current.focus();
        }

        prevOpenDrawer.current = openDrawer;
    }, [openDrawer]);

    return (
        <>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="logo"
                sx={{ display: { sm: "none" } }}
                onClick={handleToggleAccount}
            >
                <MenuIcon
                    ref={anchorRef}
                    aria-controls={openDrawer ? "composition-menu" : undefined}
                    aria-expanded={openDrawer ? "true" : undefined}
                    aria-haspopup="true"
                />
            </IconButton>
            <DrawerComp
                navLinks={props.navLinks}
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                anchorRef={anchorRef}
                handleCloseAccount={handleCloseAccount}
            ></DrawerComp>
        </>
    );
}
