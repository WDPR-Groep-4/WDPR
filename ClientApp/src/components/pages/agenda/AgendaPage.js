import { Container } from "@mui/system";

import { Button, Typography } from "@mui/material";
import Card from '@mui/material/Card';

import Box from '@mui/material/Box';
import React from 'react'
import config from "../../../config.json";

import Voorstelling1 from '../medewerker/Voorstelling1.json';
import Voorstelling2 from '../medewerker/Voorstelling2.json';
import Voorstelling3 from '../medewerker/Voorstelling3.json';

export default function AgendaPage() {
    document.title = "Agenda" + config.title;
    var voorstellingen = [Voorstelling1, Voorstelling2, Voorstelling3];

    return(
        <>
            <div style={{position: "relative", width:"90%", height:"90%"}}>
                <Container sx={{py:2, position: "relative", width:"90%", height:"90%"}}>
                    <Typography sx={{fontSize:42, fontWeight:"medium"}}>Agenda</Typography>
                </Container>
            </div>
            <Container display="flex" >
                <div style={{
                    alignContent: "top",
                    height: "300px",
                    position: "relative",
                    justifyContent: "center",
                    display: "block",
                    pt: 10,
                }}>
                    {voorstellingen.map((voorstelling) => (
                        <Item voorstelling={voorstelling} />
                    ))}
                </div>
            </Container>
        </>
    );
}



function Item(props){
    return (
        <>
            <Container sx={{ py:2}}>
                <Card>
                    <Box sx={{
                        display: "flex",
                        gap: 2,
                        flexDirection: {
                            sm: "column-reverse",
                            md: "row",
                            xs: "column",
                        },
                        alignItems: "flex-start",
                    }}>
                        <Box sx={{display:"flex"}} >
                            <img
                                src={props.voorstelling.afbeelding}
                                alt={props.voorstelling.titel}
                                style={{
                                    maxWidth: "12rem",
                                    maxHeight: "12rem",
                                    height: "20vh",
                                    width: "20vh",
                                }}
                                />
                            <Box>
                                <Box sx={{ py:3, alignContent: "center", textAlign: "center", fontWeight: 'bold', m: 1, fontSize:40,height:75,width:130}}>
                                    {props.voorstelling.datum}
                                </Box>
                                <Box sx={{ py:2, textAlign: "center", fontWeight: 'medium', m: 1, fontSize:20, height:50 }}>
                                    <Typography sx={{ fontSize: 20 , fontWeight:"regular"}} color="black" gutterBottom>
                                    {props.voorstelling.tijd+" "}
                                    {"zaal: " + props.voorstelling.zaal}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <Box sx={{py:2, px:2}}>
                                <Typography sx={{ fontSize: '2vh' , fontWeight:"medium"}} color="black" gutterBottom>
                                {props.voorstelling.titel}
                                </Typography>
                                <Typography sx={{ fontSize: '1.5vh'}} maxWidth="500" maxHeight="100" color="black" gutterBottom>
                                {props.voorstelling.beschrijving}
                                </Typography>
                            </Box>
                        </Box>            
                    </Box>
                    <Button sx={{height:50, fontSize:20}}size="large" color="primary" fullWidth="true" variant="contained">
                        Tickets
                    </Button>
                </Card>
            </Container>
        </>
    )
}