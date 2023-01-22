import React, { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import MoreIcon from '@mui/icons-material/MoreVert';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import axios from "axios";
import { TableCell, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CardMedia from "@mui/material/CardMedia";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import TableRow from "@mui/material/TableRow";


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import TextField from "@mui/material/TextField";
import config from "../../../config.json";


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
    width: '20ch',
    },
},
}));

function convertDateString(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return {
        year,
        month,
        day,
        hour,
        minute,
        second
    };
}
  
function GetMaandString(maand) {
    const maanden = [
    "Jan",
    "Feb",
    "Mrt",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dec",
    ];
    return maanden[maand - 1];
}

function addLeadingZero(number) {
    let str = number.toString();
    if (str.length === 1) {
      str = "0" + str;
    }
    return str;
}


  

export default function VoorstellingGegevens() {
    document.title = "Voorstellingen" + config.title;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const [anchorEl3, setAnchorEl3] = React.useState(null);
    const [voorstellingEvents, setVoorstellingEvents] = useState([]);
    const [voorstellingen, setVoorstellingen] = useState([]);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [selected, setSelected] = React.useState([]);
    const [expanded, setExpanded] = React.useState(false);


    const open = Boolean(anchorEl);
    const open2 = Boolean(anchorEl2);
    const open3 = Boolean(anchorEl3);
    const id = open ? 'simple-popper' : undefined;

    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    
    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const handleClose3 = () => {
        setAnchorEl3(null);
    };

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClick2 = (event) => {
        setAnchorEl2(anchorEl2 ? null : event.currentTarget);
    };

    const handleClick3 = (event) => {
        setAnchorEl3(anchorEl3 ? null : event.currentTarget);
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        if(!isExpanded){
            setSelected([]);
        }
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const selectClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
      
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
      
        setSelected(newSelected);
    };


    async function getVoorstellingen() {
        const response = await axios
            .get("api/voorstelling")
            .catch((err) => {
                console.log(err);
            });
        if (response && response.data) {
            setVoorstellingen(response.data);
            //console.log(response.data)
        }
        return response.data;
    }

    async function addVoorstelling(){
        const Titel = document.getElementById("titel").value;
        const Beschrijving = document.getElementById("beschrijving").value;
        const Genre = document.getElementById("genre").value;
        const Afbeelding = document.getElementById("afbeelding").value;

        try{
            const response = await axios.post("api/voorstelling", {Titel, Beschrijving, Genre, Afbeelding});
            console.log(response.data);
        }catch (error) {
            console.log(error);
        }

    }

    async function getVoorstellingEvents() {
        const response = await axios
            .get("api/voorstellingevent/all")
            .catch((err) => {
                console.log(err);
            });
        if (response && response.data) {
            setVoorstellingEvents(response.data);
            //console.log(response.data);
        }
        return response.data;
    }

    async function addVoorstellingEvent(){
        const response = await axios
            .post("api/medewerker/voorstelling", {
                datum: "2021-10-10",
                zaalId: 1
            })
            .catch((err) => {
                console.log(err);
            }
        );
        if (response && response.data) {
            console.log(response.data)
        }
        return response.data;
    }


    function voorstellingElement(){
        if (voorstellingEvents.length == 0){
            getVoorstellingEvents();
        }
        if (voorstellingen.length == 0){
            getVoorstellingen();
        }

        return(
            <Box>
                {voorstellingen.map((voorstelling) => (
                    <Box>
                        <Voorstelling key={voorstelling.voorstellingId} voorstelling={voorstelling} />
                    </Box>       
                ))}
            </Box>
        )

    }
    
    return(
    <>
        <AppBar position="static" sx={{ width: "1200", mx: "auto" }}>
            <Toolbar sx={{ width: "100%", mx: "auto" }}>
                <Box>
                    <IconButton color="inherit" aria-describedby={id} type="button" 
                        id="basic-button"
                        aria-controls={open3 ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open3 ? 'true' : undefined}
                        onClick={handleClick3}>
                        <AddIcon />
                    </IconButton >
                    <Menu id="basic-menu"
                        anchorEl={anchorEl3}
                        open={open3}
                        onClose={handleClose3}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}>
                        <VoorstellingForm/>
                    </Menu>
                    <IconButton color="inherit" aria-describedby={id} type="button" 
                        id="basic-button"
                        aria-controls={open2 ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open2 ? 'true' : undefined}
                        onClick={handleClick2}>
                        <DeleteIcon />
                    </IconButton >            
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl2}
                        open={open2}
                        onClose={handleClose2}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <Typography sx={{ml:3, mr:3, mt:2, fontWeight:"bold"}}>Selecteer een voorstelling om te verwijderen</Typography>
                        {voorstellingen.map((voorstelling) => (
                            <Box sx={{m:3}}>
                                <MenuItem key={voorstelling.voorstellingId} onClick={handleClose2}>{voorstelling.titel}</MenuItem>
                            </Box>
                        ))}
                    </Menu>              
                </Box>
            </Toolbar>
        </AppBar>
        {voorstellingElement()}
    </>
    )

    function Voorstelling(props){
        var filtered = voorstellingEvents.filter(voorstellingEvent => voorstellingEvent.voorstelling.voorstellingId == props.voorstelling.voorstellingId);    
        return(
        <>
            <Box sx={{py:2, px:4 }}>
                <Accordion expanded={expanded === props.voorstelling.voorstellingId} onChange={handleChange(props.voorstelling.voorstellingId)}>
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
                            <Typography sx={{fontSize:20, fontWeight:"regular", width:"800"}}>{props.voorstelling.beschrijving}</Typography>
                            <div style={{width:925}}></div>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Button sx={{height:50, fontSize:18, width:250, m:2, mr:3}}size="large" color="primary" variant="contained">Wijzig Afbeelding</Button>                        
                        <Button sx={{height:50, fontSize:18, width:250, m:3}}size="large" color="primary" variant="contained">Wijzig Titel</Button>
                        <Button sx={{height:50, fontSize:18, width:250, m:3}}size="large" color="primary" variant="contained">Wijzig Genre</Button>
                        <Button sx={{height:50, fontSize:18, width:250, m:3}}size="large" color="primary" variant="contained">Wijzig Beschrijving</Button>                        
                        <Box sx={{ display: 'block', m:2 }}>
                            {filtered.map((voorstelling) => (
                                <Card key={voorstelling.voorstellingId} variant="outlined" sx={{width:500, height:150, display:'container', mt:3}}>
                                    <Voorstellingen key={voorstelling.voorstellingId} voorstelling={voorstelling} />
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isSelected(voorstelling)}
                                        tabIndex={-1}
                                        onClick={(event) => selectClick(event, voorstelling)}
                                        selected={isSelected(voorstelling)}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isSelected(voorstelling)}
                                            />
                                        </TableCell>      
                                    </TableRow>
                                </Card>
                            ))}
                            <Box>
                                <Button sx={{height:50, fontSize:18, width:300}} variant="contained">
                                    Voeg voorstelling toe
                                </Button>
                                <Button sx={{height:50, m:3, fontSize:18, width:300}} variant="outlined">
                                    Verwijder Voorstelling
                                </Button>
                                
                                
                            </Box>
                            
                            <Dialog
                                open={openDialog}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                {"Weet u zeker dat u deze voorstelling wilt verwijderen?"}
                                </DialogTitle>
                                <DialogActions>
                                <Button onClick={handleClose}>Annuleer</Button>
                                <Button onClick={handleClose} autoFocus>
                                    Bevestig
                                </Button>
                                </DialogActions>
                            </Dialog>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </>
        );
    function Voorstellingen(props) {  
        return (
            <>
                <Card variant="outlined" sx={{width:150, padding:3}}>
                <Typography sx={{fontSize: 30, fontWeight:"bold", textAlign:"center"}}>
                    {convertDateString(props.voorstelling.datumBereik.van).day+ " "}
                    {GetMaandString(convertDateString(props.voorstelling.datumBereik.van).month)}
                </Typography>
                <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"center"}}>
                    zaal: 
                    {" "+ props.voorstelling.zaal}
                </Typography>
                </Card>
                <Box sx={{width: 100, padding:2}}>
                <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"right" }}>
                    ID:
                </Typography>
                <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"right" }}>
                    van:
                </Typography>
                <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"right" }}>
                    tot:
                </Typography>
                </Box>
                <Box sx={{width: 200, padding:2}}>
                <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"left" }}>
                    {props.voorstelling.id}
                </Typography>
                <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"left" }}>
                    {addLeadingZero(convertDateString(props.voorstelling.datumBereik.van).hour)+":" }
                    {addLeadingZero(convertDateString(props.voorstelling.datumBereik.van).minute)}
                </Typography>
                <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"left" }}>
                    {addLeadingZero(convertDateString(props.voorstelling.datumBereik.tot).hour)+":" }
                    {addLeadingZero(convertDateString(props.voorstelling.datumBereik.tot).minute)}
                </Typography>                
                </Box>
            </>
            )   
        }
    }

    function VoorstellingForm() {
        return (
            <Box component="form" asignItems="center" 
                    sx={{
                      '& .MuiTextField-root': { m: 3, },
                    }}
                    noValidate
                    autoComplete="off">
              <form id = "addUserForm">
                <Box sx={{display:'flex'}}>
                    <TextField
                    required
                    id="titel"
                    label="Titel"
                    defaultValue=""
                    />
                    <TextField
                    required
                    id="beschrijving"
                    label="Beschrijving"
                    defaultValue=""
                    />
                    <TextField
                    required
                    id="genre"
                    label="Genre"
                    defaultValue=""
                    />
                    <TextField
                    required
                    id="afbeelding"
                    label="Afbeelding"
                    defaultValue=""
                    />
                </Box>
            </form>
            <Box display={"flex"}>
                <Button onClick={addVoorstelling} variant="" fullWidth="true">Voeg toe</Button>
            </Box>
          </Box>     
        )
    }
    
}




