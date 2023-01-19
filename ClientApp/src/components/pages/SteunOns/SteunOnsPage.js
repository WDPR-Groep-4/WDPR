import React from "react";
import { Box, Typography, Container } from "@mui/material";
import Footer from "../../footer/Footer";
import config from "../../../config.json";
import DoneerElement from "./DoneerElement";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SteunOnsPage(props) {
    const auth = useAuthUser();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params ? params.get("token") : null;

        async function fetchToken() {
            const response = await axios
                .post("/api/donatie/addtoken", {
                    token: token,
                    email: auth().email,
                })
                .catch((err) => {
                    console.log(err);
                });
            console.log(response.data);
        }
        if (token) {
            fetchToken();
        }
    }, []);

    document.title = "Steun Ons" + config.title;

    return (
        <>
            <Box sx={{ minHeight: "90vh" }}>
                <div style={{ position: "relative", height: 300 }}>
                    <img
                        src="/Theater.png"
                        alt="Theater"
                        width="100%"
                        height="300px"
                        style={{ objectFit: "cover" }}
                    />

                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "300px",
                            color: "white",
                            display: "flex",
                            justifyContent: "center",
                            textAlign: "center",
                            alignItems: "center",
                        }}
                    >
                        <Container maxWidth="xl">
                            <Typography variant="h3" component="h1">
                                Steun Ons
                            </Typography>
                        </Container>
                    </div>
                </div>
                <Container>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: {
                                sm: "column",
                                md: "row",
                                xs: "column",
                            },
                            gap: 2,
                            py: 3,
                        }}
                    >
                        <Box sx={{ flex: 1 }}>
                            <Typography>
                                Wij geloven erin dat cultuur de basis vormt voor een
                                evenwichtige samenleving; een samenleving waar iedereen
                                deel van moet kunnen uitmaken. Waar ieders stem kan worden
                                gehoord en ieders verhaal een podium heeft. Het RWT maakt
                                daarom al meer dan 25 jaar theatervoorstellingen voor en
                                door mensen die voor het eerst kennismaken met theater.
                                Theater prikkelt ons inlevingsvermogen. Theater laat je
                                voelen wat het is om in andermans schoenen te staan.
                            </Typography>
                            <br></br>
                            <Typography>
                                Met een klein team van professionele theatermakers trekken
                                wij de stad in op zoek naar ongehoorde verhalen, naar
                                ongeziene helden, naar onuitgesproken conflicten. De
                                verhalen en ervaringen van de mensen die we ontmoeten
                                brengen wij samen met hen naar het theater. Wij volgen
                                daarmee de hartslag van de stad; onze spelers vormen een
                                afspiegeling van een steeds veranderende, grootstedelijke
                                samenleving. Een mix van culturen en maatschappelijke
                                lagen.
                            </Typography>
                            <br></br>
                            <Typography>
                                Klopt uw hart in hetzelfde ritme als dat van ons? En vindt
                                u ook dat meer mensen de kans moeten krijgen om te ervaren
                                wat theater met je kan doen…. dan kunt u ons helpen.
                            </Typography>
                        </Box>
                        <Box sx={{}}>
                            <img
                                src="/SteunOnsPic.png"
                                alt="SteunOns"
                                style={{
                                    maxWidth: "400px",
                                    width: "100%",
                                }}
                            />
                        </Box>
                    </Box>
                </Container>
                <Box sx={{ backgroundColor: "#F5F5F5" }}>
                    <Container>
                        <Box sx={{ py: 3 }}>
                            <Typography variant="h5" component="h2" sx={{}}>
                                Steun Ons
                            </Typography>
                            <DoneerElement />
                        </Box>
                    </Container>
                </Box>
            </Box>
            <Footer />
        </>
    );
}
