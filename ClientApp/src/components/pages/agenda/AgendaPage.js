import { Container } from "@mui/system";

import { Button, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import React from 'react'

import Voorstelling1 from '../medewerker/Voorstelling1.json';
import Voorstelling2 from '../medewerker/Voorstelling2.json';
import Voorstelling3 from '../medewerker/Voorstelling3.json';

export default function AgendaPage() {
    var voorstellingen = [Voorstelling1, Voorstelling2, Voorstelling3];

    return(
        <>
            <div style={{height:"100px"}}>
                <Container width="200" sx={{py:2}}>
                    <Typography sx={{fontSize:42, fontWeight:"medium"}}>Agenda</Typography>

                </Container>
            </div>
            <Container sx={{ width: "100%", display: { sm: "flex", xs: "block" } }}>
                <div style={{
                    alignContent: "top",
                    height: "300px",
                    
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
        <Container sx={{ py:2}}>
            <Card variant="outlined"sx={{ width: 1325, height:250}}>
                <Box sx={{ display: 'flex' }}>
                    <CardMedia
                        component="img"
                        sx={{ height: 250, width: 250}}
                        image={props.voorstelling.afbeelding}
                        alt={props.voorstelling.titel}
                    />
                    <CardContent>
                        <div style={{padding:15}}>
                            <Typography sx={{ fontSize: 42 , fontWeight:"medium"}} color="black" gutterBottom>
                            {props.voorstelling.titel}
                            </Typography>
                            <Typography sx={{ fontSize: 18, width:750}} color="black" gutterBottom>
                            {props.voorstelling.beschrijving}
                            </Typography>
                        </div>
                        

                    </CardContent>
                    <Card>
                        <Box sx={{padding:3, textAlign: "center", fontWeight: 'bold', m: 1, fontSize:50,height:75, width:250}}>{props.voorstelling.datum}</Box>
                        <Box sx={{padding:1, textAlign: "center", fontWeight: 'medium', m: 1, fontSize:20, height:50 }}>
                            <Typography sx={{ fontSize: 20 , fontWeight:"regular"}} color="black" gutterBottom>
                            {props.voorstelling.tijd+" "}
                            {"zaal: " + props.voorstelling.zaal}
                            </Typography>
                        </Box>
                        <Button sx={{height:100, fontSize:24}}size="large" color="primary" fullWidth="true" variant="contained">
                            Tickets
                        </Button>
                    </Card>
                </Box>
            </Card>
        </Container>
    )
}