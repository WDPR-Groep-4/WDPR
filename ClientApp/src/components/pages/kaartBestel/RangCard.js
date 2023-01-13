import { Card, Typography, FormControlLabel, Radio, useThemeProps } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function RangCard({ rang, children, rangState, setRang }) {
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
                    checked={rangState === rang.rang}
                    onChange={() => setRang(rang.rang)}
                ></FormControlLabel>
                Rang {rang.rang}
            </Typography>
        </Card>
    );
}
