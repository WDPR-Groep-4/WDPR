import React from 'react';
import { Box, Typography, Button,Link, Container } from '@mui/material';
import Footer from "../../footer/Footer";
import config from "../../../config.json";

export default function SteunOnsPage(props){
    document.title= "Steun Ons" + config.title;
    return (
        <Box>
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
                        top: "50%",
                        left: 0,
                        color: "white",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                        verticalAlign: "center",
                    }}
                >
                    <Container maxWidth="xl">
                        <h5 style={{ fontSize:'200%'}}> Steun Ons.</h5>
                    
                    </Container>
                </div>
            </div>
                <br/>
                <Box sx={{display:'grid', gridTemplateColumns:'1fr 1fr', columnGap:'10px',}}>
                    <Box 
                    className='SteunOnsText' sx={{ width : '500px', marginRight:'0', marginLeft:'auto'}}>
                    <Typography>Wij geloven erin dat cultuur de basis vormt voor een evenwichtige samenleving; een samenleving waar iedereen deel van moet kunnen uitmaken.
                         Waar ieders stem kan worden gehoord en ieders verhaal een podium heeft.
                          Het RWT maakt daarom al meer dan 25 jaar theatervoorstellingen voor en door mensen die voor het eerst kennismaken met theater.
                           Theater prikkelt ons inlevingsvermogen.
                            Theater laat je voelen wat het is om in andermans schoenen te staan.
                        </Typography>
                        <br></br>
                        <Typography>
                        Met een klein team van professionele theatermakers trekken wij de stad in op zoek naar ongehoorde verhalen, naar ongeziene helden, naar onuitgesproken conflicten.
                         De verhalen en ervaringen van de mensen die we ontmoeten brengen wij samen met hen naar het theater.
                          Wij volgen daarmee de hartslag van de stad; onze spelers vormen een afspiegeling van een steeds veranderende, grootstedelijke samenleving.
                           Een mix van culturen en maatschappelijke lagen.
                            </Typography>
                            <br></br>
                            <Typography>
Klopt uw hart in hetzelfde ritme als dat van ons?
 En vindt u ook dat meer mensen de kans moeten krijgen om te ervaren wat theater met je kan doen…. dan kunt u ons helpen.
                            </Typography>
                            </Box>
                            <Box >
                            <img
                             src="/SteunOnsPic.png" alt='SteunOns' height='300'
                             style={{marginTop:'10%' }}/>
                </Box>
                </Box>
                <Link to>
                <Button
                                sx={{
                                    color: "white",
                                    backgroundColor: "primary.main",
                                    mt: 3,
                                    boxSizing: "border-box",
                                    padding: "10px 100px",
                                    display: "block",
                                    margin: "auto",
                                    marginBottom: "30px",
                                    marginBlockStart: "2em",
                                    
                                }}
                            >
                                SteunOns
                            </Button>
                            </Link>

                <Footer />
                </Box>
                
    );
}