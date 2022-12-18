import { Box, Container } from "@mui/system";

export default function Winkelwagen(props) {
  return (
    <Container
      sx={{
        maxWidth: "xl",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box>
        <span sx={{ fontSize: 36, fontFamily: "Outfit", fontStyle: "Medium" }}>
          Winkelwagen
        </span>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            border: 2,
            borderColor: "#EBEBEB",
            m: 2,
            flexGrow: 1,
            width: 0.4,
          }}
        >
          <h3>Producten</h3>
        </Box>
        <Box sx={{ border: 2, borderColor: "#EBEBEB", m: 2, width: 0.3 }}>
          <span
            sx={{ fontSize: 24, fontFamily: "Outfit", fontStyle: "SemiBold" }}
          >
            Totaal
          </span>
        </Box>
      </Box>
    </Container>
  );
}
