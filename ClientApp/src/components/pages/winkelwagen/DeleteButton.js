import { Button } from "@mui/material";
import { useState } from "react";
import { Modal, Typography, Card } from "@mui/material";
import { Box } from "@mui/system";
import { grey, red } from "@mui/material/colors";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 400,
    p: 4,
};

export default function DeleteButton(props) {
    const [modal, setModal] = useState(false);

    return (
        <>
            <Modal
                open={modal}
                onClose={() => setModal(false)}
                aria-labelledby="modal-bevestig-verwijder"
            >
                <Card sx={style}>
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
                </Card>
            </Modal>
            <Button variant="contained" onClick={() => setModal(true)}>
                Verwijderen
            </Button>
        </>
    );
}
