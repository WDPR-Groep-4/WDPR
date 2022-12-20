import { Box, Container } from "@mui/system";
import { Card, Divider, Stack, Typography, Button } from "@mui/material";
import Product from "./Product";
import config from "../../../config.json";

//https://reactjs.org/docs/lists-and-keys.html

export default function Winkelwagen(props) {

  document.title = "Winkelwagen" + config.title;

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Container maxWidth="xl">
        {/* Titel */}
        <Box>
          <Typography
            variant="h4"
            component="h1"
            sx={{ pt: 3, pb: 1, fontSize: 30, fontWeight: 600 }}
          >
            Winkelwagen
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { sm: "column", md: "row" },
            alignItems: "flex-start",
          }}
        >
          {/* Producten */}
          <Card
            sx={{
              flexGrow: { sm: 1, md: 2 },
              p: 0,
              backgroundColor: "#f5f5f5EB",
              border: "none",
            }}
            variant="outlined"
          >
            <Stack
              direction="column"
              sx={{
                gap: 2,
              }}
            >
              <Product />
              <Product />
              <Product />
            </Stack>
          </Card>

          {/* Totaal */}
          <Card
            sx={{ flexGrow: 1, p: 3, justifyContent: "center" }}
            variant="outlined"
          >
            <Typography
              variant="h4"
              component="h3"
              sx={{ fontSize: 24, fontWeight: 600 }}
            >
              Totaal
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 3,
              }}
            >
              <Typography
                variant="h4"
                component="h4"
                sx={{ fontSize: 16, fontWeight: 400 }}
              >
                Artikelen
              </Typography>
              <Typography
                variant="h4"
                component="h4"
                sx={{ fontSize: 16, fontWeight: 600 }}
              >
                € 239,94
              </Typography>
            </Box>
            <Divider
              sx={{
                mt: 3,
                borderBottomWidth: 2,
                backgroundColor: "#908C8C",
              }}
            />
            <Button
              variant="contained"
              sx={{
                mt: 3,
                borderRadius: 0,
                width: "100%",
                boxSizing: "border-box",
              }}
              disableElevation
            >
              Betalen
            </Button>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
