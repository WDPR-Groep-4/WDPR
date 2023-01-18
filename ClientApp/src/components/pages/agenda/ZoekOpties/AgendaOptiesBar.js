import { Box } from "@mui/material";
import FilterSortButton from "./FilterSort/FilterSortButton";
import ZoekBalk from "./ZoekBalk";
import { useState } from "react";
import FilterSorteer from "./FilterSort/FilterSorteer";

export default function AgendaOptiesBar() {
    const [zoekInput, setZoekInput] = useState("");
    const [filters, setFilters] = useState({
        genre: "",
    });
    const [sorteren, setSorteren] = useState("datum");

    return (
        <Box sx={{ display: "flex" }}>
            <FilterSortButton>
                <FilterSorteer
                    filters={filters}
                    setFilters={setFilters}
                    sorteren={sorteren}
                    setSorteren={setSorteren}
                />
            </FilterSortButton>
            <ZoekBalk zoekInput={zoekInput} setZoekInput={setZoekInput} />
        </Box>
    );
}
