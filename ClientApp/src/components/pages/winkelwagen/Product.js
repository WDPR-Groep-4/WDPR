import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Product(props) {
  return (
    <Box sx={{ display: "flex" }}>
      {/* <img
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyt3.ggpht.com%2Fa%2FAATXAJwgTVW9Q0515s_Ictfu26EMKLVOacosqk36YQ%3Ds900-c-k-c0xffffffff-no-rj-mo&f=1&nofb=1&ipt=1c419947164e6fa5decb0504ac194fc5ec7529749865b81cd8ebe0222d9dfa16&ipo=images"
        alt="product"
        sx={{ maxWidth: 177, maxHeight: 1770 }}
      /> */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, ml: 2 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{ fontWeight: 100, fontSize: 15 }}
        >
          Musical
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: 500, fontSize: 24 }}
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
          gap: 1,
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
