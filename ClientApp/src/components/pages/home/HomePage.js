import { Container } from "@mui/system";
import Footer from "../../footer/Footer";
import config from "../../../config.json";

export default function HomePage(props) {

    document.title = "Home" + config.title;

    return (
        <div>
            <Container maxWidth="xl">
                <h1>Home</h1>
            </Container>
            <Footer />
        </div>
    );
}
