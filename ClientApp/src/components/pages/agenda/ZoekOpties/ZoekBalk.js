import { Box, Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRef } from "react";

export default function ZoekBalk(props) {
    const { setZoekInput } = props;
    const form = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
        const formData = form.current;
        setZoekInput(formData.zoek.value);
    }

    return (
        <Box sx={{ display: "flex", height: "max-content" }}>
            <form ref={form}>
                <TextField
                    name="zoek"
                    type="zoek"
                    placeholder="Zoek voor voorstellingen"
                    label="Zoek"
                    sx={{ width: "100%" }}
                    size="small"
                />
            </form>
            <Button variant="contained" onClick={handleSubmit}>
                <SearchIcon />
            </Button>
        </Box>
    );
}
