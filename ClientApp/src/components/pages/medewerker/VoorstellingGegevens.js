import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Voorstelling from './Voorstellingen';
import Box from '@mui/material/Box';



    // Afbeeldingen importeren
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
      }
      const images = importAll(require.context('/src/components/pages/agenda/plaatjes', false, /\.(png|jpe?g|svg)$/));

      

export default function VoorstellingGegevens() {
  return (
    <Box sx={{py:2, px:4 }}>
        <Accordion >
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
                <CardMedia
                    component="img"
                    sx={{ height: 250, width: 250}}
                    image={images['soldaat-van-oranje-de.jpg']}
                    alt="soldaat van oranje"
                />
                <div style={{padding:15}}>
                    <Typography sx={{fontSize:34, fontWeight:"medium"}}>Soldaat van Oranje</Typography>
                    <Typography sx={{fontSize:20, fontWeight:"regular", lineHeight: 2.5}}>Groep: NEW Productions</Typography>
                    <Typography sx={{fontSize:20, fontWeight:"regular", width:"800px"}}>Soldaat van Oranje – De Musical is gebaseerd op het waargebeurde verhaal van één van onze grootste verzetsstrijders: Erik Hazelhoff Roelfzema. Het publiek beleeft de voorstelling, met inmiddels meer dan 3,2 miljoen bezoekers, in een 360 graden draaiende theaterzaal en wordt zo het waarachtige verhaal ingetrokken.</Typography>
                    <div style={{width:925}}></div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <Button sx={{height:50, fontSize:18, width:250, m:3}}size="large" color="primary" variant="contained">Wijzig Afbeelding</Button>
                <Button sx={{height:50, fontSize:18, width:250, m:3}}size="large" color="primary" variant="contained">Wijzig Titel</Button>
                <Button sx={{height:50, fontSize:18, width:250, m:3}}size="large" color="primary" variant="contained">Wijzig Groep</Button>
                <Button sx={{height:50, fontSize:18, width:250, m:3}}size="large" color="primary" variant="contained">Wijzig Omschrijving</Button>

                <Voorstelling />
                <Voorstelling />

            </AccordionDetails>
        </Accordion>
      </Box>
  )
}
