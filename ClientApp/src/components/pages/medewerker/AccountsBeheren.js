import React from 'react'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import Account from './Account';

import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Card } from '@mui/material';

import Popper from '@mui/material/Popper';
import TextField from '@mui/material/TextField';

import MoreIcon from '@mui/icons-material/MoreVert';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import axios from 'axios';
import { useEffect, useState } from "react";
import { zoekGebruiker } from './ZoekGebruiker';
import { changeTable } from './ZoekGebruiker';


function createData(id, voornaam, achternaam, email, telefoonnummer, rol) {
  return { id, voornaam, achternaam, email, telefoonnummer, rol};
}

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
/*
const rows = [
  createData(1, 'Jan', 'Janssen', 'jan@gmail.com', '0612345678', 'Beheerder'),
  createData(2, 'Piet', 'Pietersen', 'piet@yahoo.com', '061234567', 'Gast')
];
*/

export default function PrimarySearchAppBar() {
const [anchorEl, setAnchorEl] = React.useState(null);
const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
const [rol, setRol] = React.useState('');
const [selected, setSelected] = React.useState([]);
const [rows, setRows] = React.useState([]);
const [currentPage, setCurrentPage] = useState(1);

const handleChange = (event) => {
  setRol(event.target.value);
};



const handleClick = (event) => {
  setAnchorEl(anchorEl ? null : event.currentTarget);
};

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

const open = Boolean(anchorEl);
const id = open ? 'simple-popper' : undefined;

const handleSelectAllClick = (event) => {
  if (event.target.checked) {
    const newSelected = rows.map((n) => n.id);
    setSelected(newSelected);
    return;
  }
  setSelected([]);
};

const isSelected = (name) => selected.indexOf(name) !== -1;


function changeTable(id, voornaam, achternaam, email, telefoonnummer, rol){
  setRows([createData(id, voornaam, achternaam, email, telefoonnummer, rol)]);
}

  
const handleSearchClick = async () => {
  await search();
};

async function search(){
  const searchTerm = document.getElementById('searchbox').value;
  const result = await zoekGebruiker(searchTerm);
  console.log(result.Id);
  changeTable(result.Id, result.Voornaam, result.Achternaam, result.emailadres, result.Telefoon, result.rol);
}

async function zoekGebruiker(searchTerm){
  try{
      const response = await axios.get(`/api/medewerker/accounts/${searchTerm}`).catch((err) => {
          console.log(err);
      });
      return response.data;
  } catch {
      console.log("error");
      return {Id: 0, Voornaam: "error", Achternaam: "error", emailadres: "error", Telefoon: "error", rol: "error"}
  }
}

async function getGebruikers() {
  const response = await axios.get("api/medewerker").catch((err) => {
          console.log(err);
      });
  if (response && response.data) {
      setRows(response.data);
  }
  return response.data;
}

function rowElement() {
  getGebruikers();
  
  return rows.map((account) => (
    <TableRow
      hover
      key={account.id}
      role="checkbox"
      aria-checked={isSelected(account.id)}
      tabIndex={-1}
      onClick={(event) => selectClick(event, account.id)}
      selected={isSelected(account.id)}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={isSelected(account.id)}
        />
      </TableCell>
      <Account
          account={account}
          key={account.id}
      />
    </TableRow>
      
  ));
}


async function addGebruiker(){
  const name = document.getElementById("voornaam").value;
  const email = document.getElementById("achternaam").value;
  const password = document.getElementById("email").value;
  const telefoon = document.getElementById("telefoon").value;
  try {
    const response = await axios.post("/api/medewerker/accounts/add/", { name, email, password, telefoon});
    console.log(response.data);
    // handle the response data here
  } catch (error) {
    console.log(error);
  }
}


return (
  <>
    <AppBar position="static" minWidth="1200"sx={{ width: "1200", mx: "auto" }}>
      <Toolbar sx={{ width: "100%", mx: "auto" }}>
        <Search>
          
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            id="searchbox"
          />
        </Search>
        <IconButton color="inherit" type="button" onClick= {getGebruikers}>
          <SearchIcon />
        </IconButton>
        
        <Box>
          <IconButton color="inherit" aria-describedby={id} type="button" onClick={handleClick}>
              <AddIcon />
          </IconButton >
          <Popper id={id} open={open} anchorEl={anchorEl}>
            <Card variant="outlined" component="form" asignItems="center" display="flex"
              sx={{
                '& .MuiTextField-root': { m: 3, },
              }}
              noValidate
              autoComplete="off">
              <form id = "addUserForm">
                <Box sx={{display:'flex'}}>
                  <TextField
                    required
                    id="voornaam"
                    label="Voornaam"
                    defaultValue=""
                  />
                  <TextField
                    required
                    id="achternaam"
                    label="Achternaam"
                    defaultValue=""
                  />
                  <TextField
                    required
                    id="email"
                    label="Email"
                    defaultValue=""
                  />
                  <TextField
                    required
                    id="telefoon"
                    label="Telefoonnummer"
                    defaultValue=""
                  />
                  <Box padding={3} >
                    <FormControl sx={{width:100}}>
                      <InputLabel id="demo-simple-select-label" >Rol</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="rol"
                        value={rol}
                        label="Rol"
                        onChange={handleChange}
                      >
                        <MenuItem value={3}>Gebruiker</MenuItem>
                        <MenuItem value={2}>Artiest</MenuItem>
                        <MenuItem value={1}>Medewerker</MenuItem>
                       </Select>
                    </FormControl>
                  </Box>
                </Box>
              </form>
              <Box display={"flex"}>
                <Button onClick={addGebruiker} variant="" fullWidth="true">Voeg toe</Button>
              </Box>

            </Card>
          </Popper>
          <IconButton color="inherit">
              <DeleteIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
    <TableContainer component={Paper}>
    <Table  aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">    
            <Checkbox
              indeterminate={selected.length > 0 && selected.length < rows.length}
              checked={rows.length > 0 && selected.length === rows.length}
              onChange={handleSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
          <TableCell>ID</TableCell>
          <TableCell align="left">Voornaam</TableCell>
          <TableCell align="left">Achternaam</TableCell>
          <TableCell align="left">Emailadres</TableCell>
          <TableCell align="left">Telefoon</TableCell>
          <TableCell width="1000" align="left">Rol</TableCell>

        </TableRow>
      </TableHead>
      <TableBody>
        {rowElement()}
      </TableBody>
    </Table>
  </TableContainer>
  </>
);
}