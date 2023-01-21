import { Box, Container, Typography, Alert, Card } from "@mui/material";

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";

export default function MijnHuurEventsPage() {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [verhuurEvents, setVerhuurEvents] = useState([]);
    const authHeader = useAuthHeader();

    useEffect(() => {
        getVerhuurEvents();
    }, []);

    const yourConfig = {
        headers: {
            Authorization: authHeader(),
        },
    };

    async function getVerhuurEvents() {
        try {
            const response = await axios.get(
                `api/huurevent/all_from_single_email`,
                yourConfig
            );
            if (response && response.data) {
                setVerhuurEvents(response.data);
                setIsLoading(false);
                console.log(response.data);
            }
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    function verhuurEventElements() {
        return verhuurEvents.map((verhuurEvent) => (
            <Card sx={{ width: "100%" }} key={verhuurEvent.id}>
                <Box sx={{ m: 2 }}>
                    <Typography variant="h6" component={"h3"}>
                        Verhuur Id: {verhuurEvent.id}
                    </Typography>
                    <Typography variant="body1" component={"p"}>
                        Datum: {verhuurEvent.datumBereik.van}
                    </Typography>
                    <Typography variant="body1" component={"p"}>
                        Zaal: {verhuurEvent.zaal}
                    </Typography>
                </Box>
            </Card>
        ));
    }

    return (
        <Container maxWidth="xl">
            <Box sx={{ p: 3 }}>
                <Typography variant="h5" component={"h2"} sx={{ mb: 2 }}>
                    Mijn tickets
                </Typography>
                <div>
                    {isLoading ? (
                        <Typography variant="body1" component={"p"}>
                            Gegevens laden...
                        </Typography>
                    ) : (
                        <Box>
                            {error && <Alert severity="error">{error}</Alert>}
                            {verhuurEvents.length === 0 && (
                                <Typography variant="body1" component={"p"}>
                                    U heeft nog geen zalen gehuurd.
                                </Typography>
                            )}
                            <Box
                                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                            >
                                {verhuurEventElements()}
                            </Box>
                        </Box>
                    )}
                </div>
            </Box>
        </Container>
    );
}
