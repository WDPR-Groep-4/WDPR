import { Typography, TextField, Button, Alert } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";

export default function MijnTickets(props) {
  const [error, setError] = useState();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const form = useRef(null);
  const authHeader = useAuthHeader();

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
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" component={"h2"}>
        MijnTickets
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
              width: 300,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {error && <Alert severity="error">{error}</Alert>}
            
          </form>
        )}
      </div>
    </Box>
  );
}
