import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavLinks(props) {
    return (
        <>
            <Button color="inherit" sx={{ fontWeight: 600 }}>
                <Link to="/">Home</Link>
            </Button>
            <Button color="inherit" sx={{ fontWeight: 600 }}>
                <Link to="/agenda">Agenda</Link>
            </Button>
            <Button color="inherit" sx={{ fontWeight: 600 }}>
                <Link to="/steun-ons">Steun ons</Link>
            </Button>
        </>
    );
}
