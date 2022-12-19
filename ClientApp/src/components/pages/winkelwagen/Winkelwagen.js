import { Box, Container } from "@mui/system";
import { Card, Divider, Stack, Typography, Button } from "@mui/material";
import Product from "./Product";

//https://reactjs.org/docs/lists-and-keys.html

export default function Winkelwagen(props) {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Container maxWidth="xl">
        {/* Titel */}
        <Box>
          <Typography
            variant="h4"
            component="h1"
            sx={{ paddingTop: 2, fontSize: 36 }}
          >
            Winkelwagen
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { sm: "column", md: "row" },
          }}
        >
          {/* Producten */}
          <Card
            sx={{
              flexGrow: { sm: 1, md: 2 },
              p: 2,
              gap: 2,
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
          <Card sx={{ flexGrow: 1, p: 2, justifyContent:"center" }} variant="outlined">
            <Typography
              variant="h4"
              component="h3"
              sx={{ fontSize: 24, fontWeight: 600, m: 1, mt: 2 }}
            >
              Totaal
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 3,
                ml: 1,
                mr: 1,
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
                ml: 1,
                mr: 1,
              }}
            />
            <Button
              variant="contained"
              sx={{
                mt: 3,
                ml: 1,
                mr: 3,
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
