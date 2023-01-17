import { IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function FilterSortButton() {
    return (
        <IconButton sx={{ p: 2 }}>
            <FilterListIcon />
        </IconButton>
    );
}
