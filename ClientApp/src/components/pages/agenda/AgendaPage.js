import { Container } from "@mui/system";
import { Button, Pagination, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import config from "../../../config.json";
import Voorstelling1 from "../medewerker/Voorstelling1.json";
import Voorstelling2 from "../medewerker/Voorstelling2.json";
import Voorstelling3 from "../medewerker/Voorstelling3.json";
import AgendaItem from "./AgendaItem";
import axios from "axios";

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
        <>
            <div style={{ position: "relative", width: "90%", height: "90%" }}>
                <Container
                    sx={{ py: 2, position: "relative", width: "90%", height: "90%" }}
                >
                    <Typography sx={{ fontSize: 42, fontWeight: "medium" }}>
                        Agenda
                    </Typography>
                </Container>
            </div>
            <Container display="flex">
                <div
                    style={{
                        alignContent: "top",
                        height: "300px",
                        position: "relative",
                        justifyContent: "center",
                        display: "block",
                        pt: 10,
                    }}
                >
                    {voorstellingEventElements()}
                    <Pagination
                        count={TotalPages}
                        variant="outlined"
                        shape="rounded"
                        onChange={handleChange}
                    />
                </div>
            </Container>
        </>
    );
}
