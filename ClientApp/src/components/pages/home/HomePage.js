import { Container } from "@mui/system";
import Footer from "../../footer/Footer";

export default function HomePage(props) {
    return (
        <div>
            <Container maxWidth="xl" sx={{ minHeight: "100vh" }}>
                <h1>Home</h1>
            </Container>
            <Footer />
        </div>
    );
}
