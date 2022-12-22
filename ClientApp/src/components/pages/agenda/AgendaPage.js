import { Button, List, Typography } from "@mui/material";
import { useRef } from "react";
import { useState } from "react";
import { Container } from "@mui/system";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AgendaItem from "./AgendaItem";


export default function AgendaPage() {
    const [error, setError] = useState();

    const [items, setAgendaItem] = useState([
        { name: "Voorstelling1", datum: "2022-12-24", tijd: "20:00", zaal: "zaal 1", beschikbaarheid: "vrij", image: "soldaat-van-oranje-de.jpg" },
        { name: "Voorstelling2", datum: "2022-12-24", tijd: "20:00", zaal: "zaal 1", beschikbaarheid: "vrij" }
        ])
        const bull = (
            <Box
              component="span"
              sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
            >
              •
            </Box>
          );
    

    function handle(e){
        e.preventDefault();
        console.log(e);
    }

    // Afbeeldingen importeren
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
      }
      const images = importAll(require.context('./plaatjes', false, /\.(png|jpe?g|svg)$/));

    return(
        <box>
            <div style={{height:"200px"}}>
            <Container maxWidth="xl">
                <h1>Agenda</h1>
            </Container>
            </div>
            
            <Box>
                <div style={{
                    alignContent: "top",
                    height: "300px",
                    display: "flex",
                    justifyContent: "center",
                    pt: 10,
                }}>
                    
                    <Card variant="outlined"sx={{ width: 1325, height:250}}>
                    <Box sx={{ display: 'flex' }}>
                    <CardMedia
                        component="img"
                        sx={{ height: 250, width: 250}}
                        image={images['soldaat-van-oranje-de.jpg']}
                        alt="soldaat van oranje"
                    />
                    <CardContent>
                        <div style={{padding:15}}>
                            <Typography sx={{ fontSize: 42 , fontWeight:"medium"}} color="black" gutterBottom>
                            Soldaat van Oranje
                            </Typography>
                            <Typography sx={{ fontSize: 18, width:750}} color="black" gutterBottom>
                            Soldaat van Oranje – De Musical is gebaseerd op het waargebeurde verhaal van één van onze grootste verzetsstrijders: Erik Hazelhoff Roelfzema. Het publiek beleeft de voorstelling, met inmiddels meer dan 3,2 miljoen bezoekers, in een 360 graden draaiende theaterzaal en wordt zo het waarachtige verhaal ingetrokken.
                            </Typography>
                        </div>
                        

                    </CardContent>
                    <Card>
                        <Box sx={{padding:3, textAlign: "center", fontWeight: 'bold', m: 1, fontSize:42,height:75, width:250}}>17 dec '22</Box>
                        <Box sx={{padding:1, textAlign: "center", fontWeight: 'medium', m: 1, fontSize:20, height:50 }}>
                            <Typography sx={{ fontSize: 20 , fontWeight:"regular"}} color="black" gutterBottom>
                            20:00
                            zaal 1
                            </Typography>
                        </Box>
                        <Button sx={{height:100, fontSize:24}}size="large" color="primary" fullWidth="true" variant="contained">
                            Tickets
                        </Button>
                    </Card>
                    </Box>
                    <CardActions>
                        <Button size="small">Tickets</Button>
                    </CardActions>
                </Card>
                </div>
            </Box>

            <Box>
                <div style={{
                    alignContent: "top",
                    height: "40vh",
                    display: "flex",
                    justifyContent: "center",
                    pt: 10,
                }}>
                    
                    <Card variant="outlined"sx={{ width: 1325, height:250}}>
                    <Box sx={{ display: 'flex' }}>
                    <CardMedia
                        component="img"
                        sx={{ height: 250, width: 250}}
                        image={images['soldaat-van-oranje-de.jpg']}
                        alt="soldaat van oranje"
                    />
                    <CardContent>
                        <div style={{padding:15}}>
                            <Typography sx={{ fontSize: 42 , fontWeight:"medium"}} color="black" gutterBottom>
                            Soldaat van Oranje
                            </Typography>
                            <Typography sx={{ fontSize: 18, width:750}} color="black" gutterBottom>
                            Soldaat van Oranje – De Musical is gebaseerd op het waargebeurde verhaal van één van onze grootste verzetsstrijders: Erik Hazelhoff Roelfzema. Het publiek beleeft de voorstelling, met inmiddels meer dan 3,2 miljoen bezoekers, in een 360 graden draaiende theaterzaal en wordt zo het waarachtige verhaal ingetrokken.
                            </Typography>
                        </div>
                        

                    </CardContent>
                    <Card>
                        <Box sx={{padding:3, textAlign: "center", fontWeight: 'bold', m: 1, fontSize:42,height:75, width:250}}>17 dec '22</Box>
                        <Box sx={{padding:1, textAlign: "center", fontWeight: 'medium', m: 1, fontSize:20, height:50 }}>
                            <Typography sx={{ fontSize: 20 , fontWeight:"regular"}} color="black" gutterBottom>
                            20:00
                            zaal 1
                            </Typography>
                        </Box>
                        <Button sx={{height:100, fontSize:24}}size="large" color="primary" fullWidth="true" variant="contained">
                            Tickets
                        </Button>
                    </Card>
                    </Box>
                    <CardActions>
                        <Button size="small">Tickets</Button>
                    </CardActions>
                </Card>
                </div>
            </Box>

            
        </box>
    );
}