import { Card, Typography, FormControlLabel, Radio } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function RangCard({ rang, children }) {
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
                <FormControlLabel
                    value={rang.rang}
                    control={<Radio />}
                ></FormControlLabel>
                Rang {rang.rang}
            </Typography>
        </Card>
    );
}
