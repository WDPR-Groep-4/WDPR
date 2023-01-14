import { Box, Container } from "@mui/system";
import { Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import config from "../../../config.json";
import AgendaItem from "./AgendaItem";
import axios from "axios";
import Footer from "../../footer/Footer";

export default function AgendaPage() {
    document.title = "Agenda" + config.title;
    const [voorstellingEvents, setVoorstellingEvents] = useState([]);
    const pageSize = 10;
    const [header, setHeader] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const TotalPages = header ? JSON.parse(header).TotalPages : 0;

    useEffect(() => {
        getVoorstellingEvents();
    }, [currentPage]);

    async function getVoorstellingEvents() {
        const response = await axios
            .get("api/voorstellingevent", {
                params: {
                    PageSize: pageSize,
                    PageNumber: currentPage,
                },
            })
            .catch((err) => {
                console.log(err);
            });
        if (response && response.data) {
            setVoorstellingEvents(response.data);
            setHeader(response.headers["x-pagination"]);
        }
        return response.data;
    }

    function voorstellingEventElements() {
        return voorstellingEvents.map((voorstellingEvent) => (
            <AgendaItem
                voorstellingEvent={voorstellingEvent}
                key={voorstellingEvent.id}
            />
        ));
    }

    function handleChange(event, value) {
        setCurrentPage(value);
        window.scrollTo(0, 0);
    }

    return (
        <div>
            <Container maxWidth="xl">
                <div>
                    <Typography sx={{ fontSize: 42, fontWeight: "medium" }}>
                        Agenda
                    </Typography>
                </div>
                <div
                    style={{
                        height: "300px",
                        justifyContent: "center",
                        display: "block",
                        pt: 10,
                    }}
                >
                    {voorstellingEventElements()}
                    <Box
                        sx={{
                            width: "100%",
                            my: 4,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Pagination
                            count={TotalPages}
                            variant="outlined"
                            shape="rounded"
                            onChange={handleChange}
                        />
                    </Box>
                </div>
            </Container>
            {/* <Footer /> */}
        </div>
    );
}
