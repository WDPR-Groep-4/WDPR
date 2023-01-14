import { Typography, Button, Alert } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";
import TicketItem from "./TicketItem";

export default function TicketPage(props) {
  const [error, setError] = useState();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const form = useRef(null);
  const authHeader = useAuthHeader();
  const [tickets, setTickets] = useState([]);
  const [header, setHeader] = useState();

  const yourConfig = {
    headers: {
      Authorization: authHeader(),
    },
  };

  useEffect(() => {
    const account = async () => {
      const response = await axios
        .get("/api/account", yourConfig)
        .catch((err) => {
          console.log(err);
        });
      console.log(response.data);
      if (response.status === 200) {
        setUser(response.data);
        setLoading(false);
      }
    };
    account();
    getTickets();
  }, []);

  useEffect(() => {
    if (user.email) {
      getTickets();
    }
  }, [user.email]);

  async function getTickets() {
    if (loading) return;
    try {
      console.log(`api/ticket/all_from_single_email?email=${user.email}`);
      const response = await axios.get(
        `api/ticket/all_from_single_email?email=${user.email}`
      );
      if (response && response.data) {
        setTickets(response.data);
        setHeader(response.headers["x-pagination"]);
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
