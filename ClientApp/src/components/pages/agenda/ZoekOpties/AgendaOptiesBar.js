import { Box } from "@mui/material";
import FilterSortButton from "./FilterSort/FilterSortButton";
import ZoekBalk from "./ZoekBalk";

export default function AgendaOptiesBar() {
    return (
        <Box sx={{ display: "flex" }}>
            <FilterSortButton />
            <ZoekBalk />
        </Box>
    );
}
