import { Box, Button, Card, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function AgendaItem(props) {
    const voorstelling = props.voorstellingEvent.voorstelling;
    const voorstellingEvent = props.voorstellingEvent;
    const datum = voorstellingEvent.datumBereik.van;

    function GetDatumString(datum) {
        const jaar = datum.split("-")[0];
        const maand = datum.split("-")[1];
        const dag = datum.split("-")[2].split("T")[0];

        const maandString = GetMaandString(maand);

        return dag + " " + maandString;
    }

    function GetMaandString(maand) {
        const maanden = [
            "Jan",
            "Feb",
            "Mrt",
            "Apr",
            "Mei",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Okt",
            "Nov",
            "Dec",
        ];
        return maanden[maand - 1];
    }

    function getTijd(datum) {
        const uur = datum.split("T")[1].split(":")[0];
        const minuten = datum.split("T")[1].split(":")[1];
        return uur + ":" + minuten;
    }

    return (
        <>
            <Container sx={{ py: 2 }}>
                <Card>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            flexDirection: {
                                sm: "column-reverse",
                                md: "row",
                                xs: "column",
                            },
                            alignItems: "flex-start",
                        }}
                    >
                        <Box sx={{ display: "flex" }}>
                            <img
                                src={voorstelling.afbeelding}
                                alt={voorstelling.titel}
                                style={{
                                    maxWidth: "12rem",
                                    maxHeight: "12rem",
                                    height: "20vh",
                                    width: "20vh",
                                }}
                            />
                            <Box>
                                <Box
                                    sx={{
                                        py: 3,
                                        alignContent: "center",
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        m: 1,
                                        fontSize: 40,
                                        height: 75,
                                        width: 150,
                                    }}
                                >
                                    {GetDatumString(datum)}
                                </Box>
                                <Box
                                    sx={{
                                        py: 2,
                                        textAlign: "center",
                                        fontWeight: "medium",
                                        m: 1,
                                        fontSize: 20,
                                        height: 50,
                                    }}
                                >
                                    <Typography
                                        sx={{ fontSize: 20, fontWeight: "regular" }}
                                        color="black"
                                        gutterBottom
                                    >
                                        {getTijd(datum) + " "}
                                        {"zaal: " + voorstellingEvent.zaal}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <Box
                                sx={{
                                    py: 2,
                                    px: 2,
                                    maxHeight: "12rem",
                                    overflow: "hidden",
                                }}
                            >
                                <Typography
                                    sx={{ fontSize: "2vh", fontWeight: "medium" }}
                                    color="black"
                                    gutterBottom
                                >
                                    {voorstelling.titel}
                                </Typography>
                                <Typography
                                    sx={{ fontSize: "1.5vh" }}
                                    maxWidth="500"
                                    maxHeight="100"
                                    color="black"
                                    gutterBottom
                                >
                                    {voorstelling.beschrijving}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Button
                        sx={{ height: 50, fontSize: 20, borderRadius: 0 }}
                        size="large"
                        color="primary"
                        fullWidth={true}
                        variant="contained"
                        component={Link}
                        to={"/voorstelling/" + voorstellingEvent.id}
                    >
                        Tickets
                    </Button>
                </Card>
            </Container>
        </>
    );
}
