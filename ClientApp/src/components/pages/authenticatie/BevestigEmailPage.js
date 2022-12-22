import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";

import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";

export default function BevestigEmailPage(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const userId = searchParams.get("userId");
    const token = searchParams.get("token");

    const bevestigEmail = async () => {
        const response = await axios
            .post("/api/email/bevestig", {
                userId: userId,
                token: token,
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(response);
        setIsLoading(false);
    };

    useEffect(() => {
        bevestigEmail();
    }, []);

    return (
        <Container maxWidth="xl">
            {isLoading ? (
                <Typography variant="body1" component={"p"}>
                    Gegevens laden...
                </Typography>
            ) : (
                <Typography variant="body1" component={"p"}>
                    email bevestigd!
                </Typography>
            )}
        </Container>
    );
}
