import { Box } from "@mui/system";
import { Button, Typography, Container, Divider } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import config from "../../../config.json";
import { useEffect, useState } from "react";
import axios from "axios";
import { useWinkelWagen } from "../../../services/WinkelwagenContext";
import { fetchVoorstelling } from "./FetchVoorstelling";

export default function VoorstellingPage(props) {
    const [voorstellingEvent, setVoorstellingEvent] = useState();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const { setCurrentVoorstelling } = useWinkelWagen();

    

    useEffect(() => {
        fetchVoorstelling(setIsLoading, setError, setVoorstellingEvent, id);
    }, []);

    function handleClick() {
        setCurrentVoorstelling(voorstellingEvent);
    }

    function setTitle() {
        document.title = voorstellingEvent.voorstelling.titel + config.title;
    }

    // function Datum() {
    //     const datums = voorstelling.datumBereiken;
    //     if (datums.length === 1) {
    //         return (
    //             <>
    //                 <Typography variant="h6" component={"h4"}>
    //                     datum:
    //                 </Typography>
    //                 <p>{datums[0].van}</p>
    //             </>
    //         );
    //     }
    //     return (
    //         <>
    //             <Typography variant="h6" component={"h4"}>
    //                 Datums:
    //             </Typography>
    //             {datums.map((datum) => {
    //                 <p>{datum.van}</p>;
    //             })}
    //         </>
    //     );
    // }

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
                {setTitle()}
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
                                {voorstellingEvent.voorstelling.titel}
                            </Typography>
                            <Typography
                                variant="body1"
                                component={"p"}
                                color="white"
                                sx={{ p: 3 }}
                            >
                                {"vanaf: €" +
                                    voorstellingEvent.voorstelling.prijzenPerRang[
                                        voorstellingEvent.voorstelling.prijzenPerRang.length - 1
                                    ].prijs}
                            </Typography>
                            <Button
                                component={Link}
                                to={`/voorstelling/${id}/bestel`}
                                variant="contained"
                                color="primary"
                                onClick={handleClick}
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
                        src={voorstellingEvent.voorstelling.banner}
                        alt=""
                        style={{ height: 400, objectFit: "cover", width: "100%" }}
                    />
                </Box>
                <Container maxWidth="xl">
                    <Box sx={{ m: "auto", maxWidth: 700, py: 3 }}>
                        <Typography variant="h5" component={"h2"} sx={{ pb: 3 }}>
                            {voorstellingEvent.voorstelling.titel}
                        </Typography>
                        <Typography variant="body1" component={"p"}>
                            {voorstellingEvent.voorstelling.beschrijving}
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
                        <p>{voorstellingEvent.zaal}</p>
                        {/* <Datum /> */}
                    </Box>
                </Container>
                <Box sx={{ width: "100%", backgroundColor: "#f5f5f5" }}>
                    <Container maxWidth="xl" sx={{ p: 3, textAlign: "center" }}>
                        <Typography variant="h6" component={"h2"}>
                            Mis het niet
                        </Typography>
                        <Button
                            component={Link}
                            to={`/voorstelling/${voorstellingEvent.id}/bestel`}
                            variant="contained"
                            sx={{ mt: 3 }}
                            onClick={handleClick}
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
