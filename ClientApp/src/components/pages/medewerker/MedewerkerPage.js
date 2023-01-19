import { Container, Tabs, Tab, Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import VoorstellingenGegevens from "./VoorstellingGegevens";
import VoorstellingenGegevenss from "./VoorstellingGegevenss";
import Artiesten from "./Artiesten";
import AccountsBeheren from "./AccountsBeheren";
import config from "../../../config.json";
import { Link } from "react-router-dom";
import axios from "axios";




export default function MedewerkerPage() {
    document.title = "Medewerker" + config.title;
    const [value, setValue] = useState(0);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

   

    return (
        <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <Container maxWidth="xl">
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{ py: 2, textAlign: { xs: "center", sm: "left" } }}
                >
                    Medewerker pagina
                </Typography>
                <Box sx={{ width: "100%", display: { sm: "flex", xs: "block" } }}>
                    <Box sx={{ maxWidth: "max-content", mx: "auto" }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="scrollable auto tabs example"
                            orientation="vertical"
                            variant="scrollable"
                            scrollButtons
                        >
                <Tab label={<Link to='/medewerker/voorstellingen'>Voorstellingen</Link>} />
                        <Tab label={<Link to="/medewerker/programmering">Programmering</Link>} />
                        <Tab label={<Link to="/medewerker/artiesten">Artiesten</Link>} />
                        <Tab label={<Link to="/medewerker/accounts">Accounts beheren</Link>} />
                        </Tabs>
                    </Box>
                    <Card
                        sx={{
                            backgroundColor: "white",
                            width: "100%",
                            minHeight: "100vh",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: { sm: "flex-start", xs: "center" },
                        }}
                        variant="outlined"
                    >
                        <TabPanel value={value} index={0}>
                            <Box>
                                <VoorstellingenGegevenss />
                            </Box>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            Programmering
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <Box>
                                <Artiesten/>
                            </Box>
                            
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                        <AccountsBeheren sx={{ 
                                backgroundColor: "white",
                                width: "100%",
                                minHeight: "100vh",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: { sm: "flex-start", xs: "center" },}}/>
                        </TabPanel>
                    </Card>
                </Box>
            </Container>
        </Box>
  )
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

