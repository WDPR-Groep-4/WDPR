import { Box, Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function ZoekBalk(props) {
    const { zoekInput, setZoekInput } = props;

    return (
        <Box sx={{ display: "flex", height: "max-content" }}>
            <TextField
                name="email"
                type="email"
                placeholder="Zoek voor voorstellingen"
                label="Zoek"
                sx={{ width: "100%" }}
                size="small"
                value={zoekInput}
                onChange={(e) => setZoekInput(e.target.value)}
            />
            <Button variant="contained">
                <SearchIcon />
            </Button>
        </Box>
    );
}
