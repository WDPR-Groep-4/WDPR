import { Box } from "@mui/system";
import { Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function AantalKaarten(props) {
    function handleChange(action) {
        switch (action) {
            case "add":
                if (props.aantal > 25) {
                    return;
                }
                props.setAantal((prev) => prev + 1);
                break;
            case "remove":
                if (props.aantal < 1) {
                    return;
                }
                props.setAantal((prev) => prev - 1);
                break;
            default:
                break;
        }
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" component="p" sx={{ my: "auto" }}>
                <span style={{ fontWeight: 500 }}>Aantal kaarten:</span>
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton color="primary" onClick={() => handleChange("add")}>
                    <AddIcon />
                </IconButton>
                <Typography
                    variant="body1"
                    sx={{ backgroundColor: "#f5f5f5", p: 1, borderRadius: 2 }}
                >
                    {props.aantal}
                </Typography>
                <IconButton color="primary" onClick={() => handleChange("remove")}>
                    <RemoveIcon />
                </IconButton>
            </Box>
        </Box>
    );
}
