import { Card, Typography, Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function RangCard({ rang, rangAantal, setRangAantal }) {
    const handleChange = (action) => {
        switch (action) {
            case "add":
                if (rangAantal < 25) {
                    setRangAantal(rangAantal + 1);
                }
                break;
            case "remove":
                if (rangAantal > 0) {
                    setRangAantal(rangAantal - 1);
                }
                break;
            default:
                break;
        }
    };

    return (
        <Card
            variant="outlined"
            sx={{
                p: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Typography variant="h6" sx={{ height: "min-content" }}>
                Rang {rang.rang}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" sx={{ height: "min-content" }}>
                    €{rang.prijs * rangAantal}
                </Typography>
                <IconButton color="primary" onClick={() => handleChange("add")}>
                    <AddIcon />
                </IconButton>
                <Typography
                    variant="body1"
                    sx={{ backgroundColor: "#f5f5f5", p: 1, borderRadius: 2 }}
                >
                    {rangAantal}
                </Typography>
                <IconButton color="primary" onClick={() => handleChange("remove")}>
                    <RemoveIcon />
                </IconButton>
            </Box>
        </Card>
    );
}
