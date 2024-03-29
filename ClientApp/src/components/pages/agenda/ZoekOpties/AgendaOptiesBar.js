import { Box } from "@mui/material";
import FilterSortButton from "./FilterSort/FilterSortButton";
import ZoekBalk from "./ZoekBalk";
import { useState } from "react";
import FilterSorteer from "./FilterSort/FilterSorteer";

export default function AgendaOptiesBar(props) {
    const { zoekInput, setZoekInput, filters, setFilters, sorteren, setSorteren } = props;
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <Box sx={{ display: "flex" }}>
            <FilterSortButton openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}>
                <FilterSorteer
                    filters={filters}
                    setFilters={setFilters}
                    sorteren={sorteren}
                    setSorteren={setSorteren}
                    openDrawer={openDrawer}
                    setOpenDrawer={setOpenDrawer}
                />
            </FilterSortButton>
            <ZoekBalk zoekInput={zoekInput} setZoekInput={setZoekInput} />
        </Box>
    );
}
