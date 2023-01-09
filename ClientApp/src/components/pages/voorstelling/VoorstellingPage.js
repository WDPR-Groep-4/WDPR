import { Box } from "@mui/system";
import { Button, Typography, Container, Divider } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import config from "../../../config.json";
import { useEffect, useState } from "react";
import axios from "axios";

export default function VoorstellingPage(props) {
    const [voorstelling, setVoorstelling] = useState();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch();
    }, []);

    async function fetch() {
        try {
            const response = await axios.get(`/api/voorstelling/${id}`).catch((err) => {
                console.log(err);
                setIsLoading(false);
                setError(true);
            });
            console.log(response);
            setVoorstelling(response.data);
            setIsLoading(false);
        } catch {
            console.log("error");
            setIsLoading(false);
            setError(true);
        }
    }

    console.log(voorstelling);

    function Datum() {
        const datums = voorstelling.datumBereiken;
        if (datums.length === 1) {
            return (
                <>
                    <Typography variant="h6" component={"h4"}>
                        datum:
                    </Typography>
                    <p>{datums[0].van}</p>
                </>
            );
        }
        return (
            <>
                <Typography variant="h6" component={"h4"}>
                    Datums:
                </Typography>
                {datums.map((datum) => {
                    <p>{datum.van}</p>;
                })}
            </>
        );
    }

    function Error() {
        return (
            <Box sx={{ textAlign: "center" }}>
                <Typography variant="h4" component={"h2"}>
                    Er is iets fout gegaan
                </Typography>
                <Button component={Link} to="/" variant="contained" sx={{ mt: 3 }}>
                    Ga terug naar de homepagina
                </Button>
            </Box>
        );
    }

    function MainBody() {
        return (
            <div>
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
                                {!isLoading
                                    ? "vanaf: €" + voorstelling.prijzenPerRang[2].prijs
                                    : ""}
                            </Typography>
                            <Button
                                component={Link}
                                to={`/voorstelling/${id}/bestel`}
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
                        src={voorstelling.banner}
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
                        <p>{voorstelling.zaalId}</p>
                        <Datum />
                    </Box>
                </Container>
                <Box sx={{ width: "100%", backgroundColor: "#f5f5f5" }}>
                    <Container maxWidth="xl" sx={{ p: 3, textAlign: "center" }}>
                        <Typography variant="h6" component={"h2"}>
                            Mis het niet
                        </Typography>
                        <Button
                            component={Link}
                            to={`/voorstelling/${voorstelling.voorstellingId}/bestel`}
                            variant="contained"
                            sx={{ mt: 3 }}
                        >
                            Bestel Tickets
                        </Button>
                    </Container>
                </Box>
            </div>
        );
    }

    return <Box>{isLoading ? <div>loading</div> : error ? <Error /> : <MainBody />}</Box>;
}
