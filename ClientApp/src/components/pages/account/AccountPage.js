import { Container, Tabs, Tab, Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import PersoonlijkeGegevens from "./PersoonlijkeGegevens";
import user from "../../navbar/account.json";

export default function AccountPage(props) {
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
                    Mijn Account
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
                            <Tab label="Persoonlijke gegevens" />
                            <Tab label="Interesses" />
                            <Tab label="Donaties" />
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
                            <PersoonlijkeGegevens user={user} />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            Interesses
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            Donaties
                        </TabPanel>
                    </Card>
                </Box>
            </Container>
        </Box>
    );
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
