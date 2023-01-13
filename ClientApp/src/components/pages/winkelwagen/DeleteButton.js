import { Button } from "@mui/material";
import { useState } from "react";
import { Modal, Typography, Card } from "@mui/material";
import { Box } from "@mui/system";
import { grey, red } from "@mui/material/colors";
import PopupModal from "../../Utility/PopupModal";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function DeleteButton(props) {
  const [modal, setModal] = useState(false);

  return (
    <>
      <PopupModal
        open={modal}
        onClose={() => setModal(false)}
        title="Verwijderen"
      >
        <Typography
          sx={{ textAlign: "center" }}
          id="modal-bevestig-verwijder"
          variant="h6"
          component="h2"
        >
          Wilt u dit product verwijderen?
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={() => setModal(false)}
            sx={{
              backgroundColor: grey[600],
              ":hover": { backgroundColor: grey[700] },
            }}
          >
            Annuleren
          </Button>
          <Button
            variant="contained"
            onClick={() => props.onDelete()}
            sx={{
              backgroundColor: red[500],
              ":hover": { backgroundColor: red[600] },
            }}
          >
            Verwijderen
          </Button>
        </Box>
      </PopupModal>

      <Button
        variant="text"
        endIcon={
          <DeleteOutlinedIcon style={{ maxWidth: 16, maxHeight: 16 }}/>
        }
        onClick={() => setModal(true)}
        sx={{
            fontWeight: 400,
            fontSize: 10,
            color: "#727272",
          }}
      >
        Verwijderen
      </Button>
    </>
  );
}
