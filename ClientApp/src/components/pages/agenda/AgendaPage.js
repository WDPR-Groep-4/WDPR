import { Box, Container } from "@mui/system";
import { Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import config from "../../../config.json";
import AgendaItem from "./AgendaItem";
import axios from "axios";
import Footer from "../../footer/Footer";
import AgendaOptiesBar from "./ZoekOpties/AgendaOptiesBar";

export default function AgendaPage() {
    document.title = "Agenda" + config.title;
    const [voorstellingEvents, setVoorstellingEvents] = useState([]);
    const pageSize = 10;
    const [header, setHeader] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const TotalPages = header ? JSON.parse(header).TotalPages : 0;
    const [zoekInput, setZoekInput] = useState("");
    const [filters, setFilters] = useState({
        genre: "Alle",
    });
    const [sorteren, setSorteren] = useState("Datum");

    console.log("filters", filters);

    useEffect(() => {
        async function getVoorstellingEvents() {
            const response = await axios
                .get("api/voorstellingevent", {
                    params: {
                        PageSize: pageSize,
                        PageNumber: currentPage,
                        OrderBy: sorteren,
                        SearchQuery: zoekInput,
                        Genre: filters.genre,
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
        getVoorstellingEvents();
    }, [currentPage, zoekInput, sorteren, filters.genre]);

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
            <Container maxWidth="xl" sx={{ mb: 2 }}>
                <div>
                    <Typography sx={{ fontSize: 42, fontWeight: "medium" }}>
                        Agenda
                    </Typography>
                    <AgendaOptiesBar
                        zoekInput={zoekInput}
                        setZoekInput={setZoekInput}
                        filters={filters}
                        setFilters={setFilters}
                        sorteren={sorteren}
                        setSorteren={setSorteren}
                    />
                </div>
            </Container>
            <Container maxWidth="xl" sx={{ backgroundColor: "#f5f5f5" }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        padding: "1rem 0",
                    }}
                >
                    {voorstellingEventElements()}
                </div>
                <Box
                    sx={{
                        width: "100%",
                        py: 4,

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
            </Container>
            <Footer />
        </div>
    );
}
