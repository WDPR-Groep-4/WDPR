import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";

export default function Product(props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { md: "row", sm: "row", xs: "column" },
        backgroundColor: "#FFFFFF",
        border: "1px solid #0000001f",
        width: { xs: "92vw", sm: "92vw", md: "100%" },
      }}
    >
      <img
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyt3.ggpht.com%2Fa%2FAATXAJwgTVW9Q0515s_Ictfu26EMKLVOacosqk36YQ%3Ds900-c-k-c0xffffffff-no-rj-mo&f=1&nofb=1&ipt=1c419947164e6fa5decb0504ac194fc5ec7529749865b81cd8ebe0222d9dfa16&ipo=images"
        alt="product"
        style={{
          maxWidth: "12rem",
          maxHeight: "12rem",
          height: "25vw",
          width: "25vw",
          borderRight: "1px solid #0000001f",
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, ml: 3 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{ fontWeight: 300, fontSize: 15, paddingTop: 2 }}
        >
          Musical
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: 500, fontSize: 24, marginTop: -1.5 }}
        >
          Soldaat van Oranje
        </Typography>
      </Box>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "flex-end",
          flexGrow: 1,
          gap: 2,
          pr: 3,
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 400,
            fontSize: 14,
          }}
        >
          Aantal: 6 x
        </Typography>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 500,
            fontSize: 20,
          }}
        >
          € 39,99
        </Typography>
      </Box>
    </Box>
  );
}
