import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Voorstelling1 from './Voorstelling1.json';
import Voorstelling2 from './Voorstelling2.json';
import Voorstelling3 from './Voorstelling3.json';



export default function VoorstellingGegevens() {
    var voorstellingen = [Voorstelling1, Voorstelling2, Voorstelling3];

    var key = 'voorstellingId';
    var unique = [...new Map(voorstellingen.map(voorstelling =>
    [voorstelling[key], voorstelling])).values()];

    return (
        <>
            {unique.map((voorstelling) => (
                <Bruh key={voorstelling.id} voorstelling={voorstelling} voorstellingen={voorstellingen}/>
            ))}
        </>
    )
}


function Bruh(props){
    var filtered = props.voorstellingen.filter(voorstelling => voorstelling.voorstellingId === props.voorstelling.voorstellingId);

    return(
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
                        image={props.voorstelling.afbeelding}
                        alt={props.voorstelling.titel}
                    />
                    <div style={{padding:15}}>
                        <Typography sx={{fontSize:34, fontWeight:"medium"}}>{props.voorstelling.titel}</Typography>
                        <Typography sx={{fontSize:20, fontWeight:"regular", lineHeight: 2.5}}>{props.voorstelling.groep}</Typography>
                        <Typography sx={{fontSize:20, fontWeight:"regular", width:"800px"}}>{props.voorstelling.beschrijving}</Typography>
                        <div style={{width:925}}></div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <Button sx={{height:50, fontSize:18, width:250, m:3}}size="large" color="primary" variant="contained">Wijzig Afbeelding</Button>
                    <Button sx={{height:50, fontSize:18, width:250, m:3}}size="large" color="primary" variant="contained">Wijzig Titel</Button>
                    <Button sx={{height:50, fontSize:18, width:250, m:3}}size="large" color="primary" variant="contained">Wijzig Groep</Button>
                    <Button sx={{height:50, fontSize:18, width:250, m:3}}size="large" color="primary" variant="contained">Wijzig Omschrijving</Button>
                    
                    <Box sx={{ display: 'block', m:2 }}>

                        {filtered.map((voorstelling) => (
                          <div style={{height:150}}>
                            <Voorstellingen key={voorstelling.id} voorstelling={voorstelling}/>
                          </div> 
                        ))}
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

function Voorstellingen(props) {
    return (
          <Card variant="outlined" sx={{width:700, display:'container'}}>
              <Card variant="outlined" sx={{width:150, padding:3}}>
                <Typography sx={{fontSize: 30, fontWeight:"bold", textAlign:"center"}}>
                  {props.voorstelling.datum}
                </Typography>
                <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"center"}}>
                  {props.voorstelling.tijd}
                </Typography>
              </Card>
              <Box sx={{width: 150, padding:2}}>
                <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"right" }}>
                  zaal:
                </Typography>
                <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"right" }}>
                  bezoeker:
                </Typography>
                <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"right" }}>
                  stoelen:
                </Typography>
              </Box>
              <Box sx={{width: 50, padding:2}}>
                <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"left" }}>
                  {props.voorstelling.zaal}
                </Typography>
                <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"left" }}>
                  {props.voorstelling.bezoekers}
                </Typography>
                <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"left" }}>
                  {props.voorstelling.stoelen[3].stoelen}
                </Typography>
              </Box>
              <Box sx={{width: 200, padding:2}}>
                <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"right" }}>
                  eersterangs:
                </Typography>
                <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"right" }}>
                  tweederangs:
                </Typography>
                <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"right" }}>
                  derderangs:
                </Typography>
              </Box>
              <Box sx={{width: 50, padding:2}}>
                <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"left" }}>
                  {props.voorstelling.stoelen[0].stoelen}
                </Typography>
                <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"left" }}>
                  {props.voorstelling.stoelen[1].stoelen}
                </Typography>
                <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"left" }}>
                  {props.voorstelling.stoelen[2].stoelen}
                </Typography>
              </Box>
          </Card>
    )
  }
  