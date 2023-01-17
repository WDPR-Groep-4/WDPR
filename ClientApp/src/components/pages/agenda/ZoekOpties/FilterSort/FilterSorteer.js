import {
    FormControl,
    Box,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Divider,
} from "@mui/material";
import { useState } from "react";

export default function FilterSorteer() {
    const [sorteren, setSorteren] = useState("datum");
    const [filters, setFilters] = useState({
        genre: "",
    });

    function SorteerSelect() {
        return (
            <>
                <Typography variant="body1" sx={{ fontWeight: "500" }}>
                    Sorteren
                </Typography>
                <FormControl sx={{ width: "100%" }} size="small">
                    <InputLabel id="label-sorteren">Sorteren</InputLabel>
                    <Select
                        labelId="label-sorteren"
                        id="select-sorteren"
                        value={sorteren}
                        label="Sorteren"
                        onChange={(e) => setSorteren(e.target.value)}
                    >
                        <MenuItem value={"datum"}>Datum</MenuItem>
                        <MenuItem value={"naam"}>Populariteit</MenuItem>
                        <MenuItem value={"prijs"}>Prijs</MenuItem>
                    </Select>
                </FormControl>
            </>
        );
    }

    function Filters() {
        return (
            <>
                <Typography variant="body1" sx={{ fontWeight: "500" }}>
                    Filters
                </Typography>
                <FormControl sx={{ width: "100%" }} size="small">
                    <InputLabel id="label-genre">Genre</InputLabel>
                    <Select
                        labelId="label-genre"
                        id="select-genre"
                        value={filters.genre}
                        label="Genre"
                        onChange={(e) =>
                            setFilters({ ...filters, genre: e.target.value })
                        }
                    >
                        <MenuItem value={"comedy"}>Comedy</MenuItem>
                        <MenuItem value={"drama"}>Musical</MenuItem>
                        <MenuItem value={"drama"}>Drama</MenuItem>
                        <MenuItem value={"drama"}>Kinder</MenuItem>
                        <MenuItem value={"drama"}>Klassiek</MenuItem>
                        <MenuItem value={"drama"}>Pop</MenuItem>
                    </Select>
                </FormControl>
            </>
        );
    }

    return (
        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <SorteerSelect />
            <Divider />
            <Filters />
        </Box>
    );
}
