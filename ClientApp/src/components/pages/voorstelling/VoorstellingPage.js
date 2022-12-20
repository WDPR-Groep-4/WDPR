import voorstelling from "./voorstelling.json";
import { Box } from "@mui/system";
import { Button, Typography, Container, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import config from "../../../config.json";

export default function VoorstellingPage(props) {

    document.title = voorstelling.titel + config.title;

    return (
        <Box>
            <Box sx={{ maxHeight: 400, width: "100%" }}>
                <div
                    style={{
                        position: "absolute",
                        zIndex: 2,
                        width: "100%",
                        height: 400,
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "400px",
                        }}
                    >
                        <Typography variant="h4" component={"h2"} color="white">
                            {voorstelling.titel}
                        </Typography>
                        <Typography
                            variant="body1"
                            component={"p"}
                            color="white"
                            sx={{ p: 3 }}
                        >
                            €{voorstelling.prijs[0].prijs}
                        </Typography>
                        <Button
                            component={Link}
                            to={`/voorstelling/${voorstelling.id}/bestel`}
                            variant="contained"
                            color="primary"
                        >
                            Bestel Tickets
                        </Button>
                    </div>
                </div>
                <div
                    style={{
                        backgroundColor: "black",
                        height: 400,
                        width: "100%",
                        position: "absolute",
                        opacity: 0.6,
                    }}
                ></div>
                <img
                    src={voorstelling.achtergrond}
                    alt=""
                    style={{ height: 400, objectFit: "cover", width: "100%" }}
                />
            </Box>
            <Container maxWidth="xl">
                <Box sx={{ m: "auto", maxWidth: 700, py: 3 }}>
                    <Typography variant="h5" component={"h2"} sx={{ pb: 3 }}>
                        {voorstelling.titel}
                    </Typography>
                    <Typography variant="body1" component={"p"}>
                        {voorstelling.beschrijving}
                    </Typography>
                </Box>
                <Box sx={{ m: "auto", maxWidth: 700 }}>
                    <Divider />
                    <Typography variant="h5" component={"h3"} sx={{ py: 3 }}>
                        Informatie
                    </Typography>
                    <Typography variant="h6" component={"h4"}>
                        Zaal:
                    </Typography>
                    <p>{voorstelling.zaal}</p>
                    <Typography variant="h6" component={"h4"}>
                        Datum:
                    </Typography>
                    <p>{voorstelling.datum}</p>
                </Box>
            </Container>
            <Box sx={{ width: "100%", backgroundColor: "#f5f5f5" }}>
                <Container maxWidth="xl" sx={{ p: 3, textAlign: "center" }}>
                    <Typography variant="h6" component={"h2"}>
                        Mis het niet
                    </Typography>
                    <Button
                        component={Link}
                        to={`/voorstelling/${voorstelling.id}/bestel`}
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3 }}
                    >
                        Bestel Tickets
                    </Button>
                </Container>
            </Box>
        </Box>
    );
}
