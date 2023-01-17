import { IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import { useRef, useEffect } from "react";
import DrawerCompleet from "./DrawerCompleet";

export default function FilterSortButton() {
    const [openDrawer, setOpenDrawer] = useState(false);
    const anchorRef = useRef(null);

    function handleClose() {
        setOpenDrawer(false);
    }

    return (
        <>
            <DrawerCompleet
                openDrawer={openDrawer}
                handleClose={handleClose}
                anchorRef={anchorRef}
                title="Filteren en sorteren"
            ></DrawerCompleet>
            <IconButton sx={{ p: 2 }} onClick={() => setOpenDrawer(!openDrawer)}>
                <FilterListIcon />
            </IconButton>
        </>
    );
}
