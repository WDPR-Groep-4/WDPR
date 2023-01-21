import { IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import { useRef } from "react";
import DrawerCompleet from "./DrawerCompleet";
import FilterSorteer from "./FilterSorteer";

export default function FilterSortButton(props) {
    const { openDrawer, setOpenDrawer } = props;

    function handleClose() {
        setOpenDrawer(false);
    }

    return (
        <>
            <DrawerCompleet
                openDrawer={openDrawer}
                handleClose={handleClose}
                title="Filteren en sorteren"
            >
                {props.children}
            </DrawerCompleet>
            <IconButton sx={{ p: 1 }} onClick={() => setOpenDrawer(!openDrawer)} aria-label="Sorteeropties">
                <FilterListIcon />
            </IconButton>
        </>
    );
}
