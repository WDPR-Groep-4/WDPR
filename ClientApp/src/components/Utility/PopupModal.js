import { Modal, Card } from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    p: 4,
};

export default function PopupModal(props) {
    return (
        <Modal open={props.open} onClose={props.onClose} aria-labelledby={props.title}>
            <Card sx={style}>{props.children}</Card>
        </Modal>
    );
}
