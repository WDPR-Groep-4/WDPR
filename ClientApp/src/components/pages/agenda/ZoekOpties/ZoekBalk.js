import { Box, Button, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function ZoekBalk() {
    return (
        <Box sx={{ display: "flex" }}>
            <TextField
                name="email"
                type="email"
                placeholder="Zoek voor voorstellingen"
                label="Zoek"
                sx={{ width: "100%" }}
            />
            <Button variant="contained">
                <SearchIcon />
            </Button>
        </Box>
    );
}
