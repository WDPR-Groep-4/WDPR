import {
    FormControl,
    Box,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Divider,
    Button,
} from "@mui/material";

export default function FilterSorteer(props) {
    const { filters, setFilters, sorteren, setSorteren, setOpenDrawer } = props;

    function handleSubmit() {
        setOpenDrawer(false);
    }

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
                        aria-label="Sorteren"
                    >
                        <MenuItem value={"Datum"}>Datum</MenuItem>
                        <MenuItem value={"Titel"}>Titel</MenuItem>
                        <MenuItem value="Prijs asc">Prijs laag - hoog</MenuItem>
                        <MenuItem value="Prijs desc">Prijs hoog - laag</MenuItem>
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
                        <MenuItem value={"Alle"}>Alle</MenuItem>
                        <MenuItem value={"comedy"}>Comedy</MenuItem>
                        <MenuItem value={"musical"}>Musical</MenuItem>
                        <MenuItem value={"drama"}>Drama</MenuItem>
                        <MenuItem value={"kinderen"}>Kinderen</MenuItem>
                        <MenuItem value={"klassiek"}>Klassiek</MenuItem>
                        <MenuItem value={"pop"}>Pop</MenuItem>
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
            <Button variant="contained" sx={{ width: "100%" }} onClick={handleSubmit}>
                Terug
            </Button>
        </Box>
    );
}
