import { Typography, Button, Alert } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";
import TicketItem from "./TicketItem";
import dconfig from "../../../../config.json";

export default function TicketPage(props) {
    const [error, setError] = useState();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const form = useRef(null);
    const [tickets, setTickets] = useState([]);
    const [header, setHeader] = useState();

    document.title = "Mijn Tickets" + dconfig.title;

    const authHeader = useAuthHeader();

    const yourConfig = {
        headers: {
            Authorization: authHeader(),
        },
    };

    useEffect(() => {
        getTickets();
    }, []);

    useEffect(() => {
        if (user.email) {
            getTickets();
        }
    }, [user.email]);

    async function getTickets() {
        // if (loading) return;
        try {
            const response = await axios.get(
                `api/ticket/all_from_single_email`,
                yourConfig
            );
            if (response && response.data) {
                console.log(response.data);
                setTickets(response.data);
                setHeader(response.headers["x-pagination"]);
                setLoading(false);
            }
            return response.data;
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    function ticketElements() {
        return tickets.map((ticket) => (
            <TicketItem ticket={ticket} key={ticket.ticketId} />
        ));
    }

    return (
        <Container maxWidth="xl">
            <Box sx={{ p: 3 }}>
                <Typography variant="h5" component={"h2"}>
                    Mijn tickets
                </Typography>
                <div>
                    {loading ? (
                        <Typography variant="body1" component={"p"}>
                            Gegevens laden...
                        </Typography>
                    ) : (
                        <form
                            ref={form}
                            style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                gap: 16,
                            }}
                        >
                            {error && <Alert severity="error">{error}</Alert>}

                            <div
                                style={{
                                    height: "300px",
                                    justifyContent: "center",
                                    display: "block",
                                    pt: 10,
                                }}
                            >
                                {ticketElements()}
                                <Box
                                    sx={{
                                        width: "100%",
                                        my: 4,
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                ></Box>
                            </div>
                        </form>
                    )}
                </div>
            </Box>
        </Container>
    );
}
