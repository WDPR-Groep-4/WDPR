import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { Container } from "@mui/system";
import Footer from "../../footer/Footer";
import config from "../../../config.json";
import { useAuthUser } from "react-auth-kit";
import { useState } from "react";
import axios from "axios";

function HomePage(props) {
    document.title = "Home" + config.title;
    const params = useParams();
    const { token } = params;
    const auth = useAuthUser();
    const email = auth.user ? auth.user.email : null;
    const [voorstellingen, setVoorstellingen] = useState([]);
    

    //useEffect
    useEffect(() => {
        async function getVoorstellingen() {
            const response = await axios.get("api/homepage/getrandomvoorstellingen");
            if (response && response.data) {
                setVoorstellingen(response.data);
            }
        }
        getVoorstellingen();
    }, []);
    const items = voorstellingen.map((voorstelling) => {
        return {
            id: voorstelling.id,
            name: voorstelling.titel,
            description: voorstelling.beschrijving,
            image: voorstelling.banner,
            width: "100%",
            //link: `/voorstelling/${voorstelling.id}`,
        }
    });


    return (
        <div>
            <div style={{ position: "relative", height: 300 }}>
                <img
                    src="/Theater.png"
                    alt="Theater"
                    width="100%"
                    height="300"
                    style={{ objectFit: "cover" }}
                />

                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        color: "white",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Container maxWidth="xl">
                        <h5 style={{}}> Theater Laak</h5>
                        <p>
                            Bekijk de mooiste voorstellingen in het theater van de regio.
                        </p>
                            <Button
                                component={Link}
                                to="/agenda"
                                sx={{
                                    color: "white",
                                    backgroundColor: "primary.main",
                                    mt: 3,
                                    boxSizing: "border-box",
                                    padding: "10px 100px",
                                }}
                            >
                                AGENDA
                            </Button>
                    </Container>
                </div>
            </div>
            <div style={{ maxWidth: "700px", margin: "auto" }}>
                <Carousel interval={4000} sx={{}}>
                    {items.map((item) => (
                        <Item key={item.id} item={item} />
                    ))}
                </Carousel>
            </div>
            <div style={{ maxWidth: "700px", margin: "auto", padding: "10px" }}>
                <h3>Theater laak</h3>
                <p>
                    Theater Laak is een professioneel theater in het centrum van Den Haag.
                    Het theater is gevestigd in een monumentaal pand aan de Laakhaven. Het
                    theater biedt een breed scala aan voorstellingen, van cabaret tot
                    musical, van toneel tot dans.
                </p>
                <h3>Steun ons</h3>
                <p> Help ons om het theater te onderhouden en te verbeteren.</p>
                <Button component={Link} to="/steun-ons" variant="contained">
                    Steun ons
                </Button>
                <h3>Zaal huren</h3>
                <p>Als u een zaal wilt huren voor een evenement, klik dan hieronder.</p>
                <Button component={Link} to="/zaal-huren" variant="contained">
                    Zaal huren
                </Button>
            </div>
            <Footer />
        </div>
    );
}
function Item(props) {
    return (
        <Paper>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <a //</div>href={props.item.link}
                >
                    <div style={{ position: "relative" }}>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                            <img
                                src={props.item.image}
                                alt={props.item.name}
                                style={{width: '100%', height: '300px', objectFit: 'cover'}}
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "1em",
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: "rgba(0,0,0,0.5)",
                                        backgroundClip: "text",
                                        position: "absolute",
                                        bottom: 0,
                                    }}
                                >
                                    <h2
                                        style={{
                                            color: "white",
                                            fontSize: "100%",
                                            textAlign: "center",
                                        }}
                                    >
                                        {props.item.name}
                                    </h2>
                                    <p style={{ color: "white", fontSize: "70%" }}>
                                        {props.item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </Paper>
    );
}

export default HomePage;
