import React from 'react'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';

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

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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

const rows = [
    createData(1, 'Jan', 'Janssen', 'jan@gmail.com', '0612345678', 'Beheerder'),
    createData(2, 'Piet', 'Pietersen', 'piet@yahoo.com', '061234567', 'Gast')
  ];

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };


  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';

  const mobileMenuId = 'primary-search-account-menu-mobile';
  
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;


  return (
    <>
      <AppBar position="static" >
        
        <Toolbar sx={{ width: "100%", mx: "auto" }}>
          <Search>
            
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          
          <Box>
            <IconButton color="inherit" aria-describedby={id} type="button" onClick={handleClick}>
                <AddIcon />
            </IconButton >
            <Popper id={id} open={open} anchorEl={anchorEl}>
              <Card variant="outlined" component="form" asignItems="center" display="flex"
                sx={{
                  '& .MuiTextField-root': { m: 1, },
                }}
                noValidate
                autoComplete="off">
                <Box sx={{display:'flex'}}>
                  <TextField
                      required
                      id="outlined-required"
                      label="Voornaam"
                      defaultValue=""
                    />
                  <TextField
                    required
                    id="outlined-required"
                    label="Achternaam"
                    defaultValue=""
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    defaultValue=""
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Telefoonnummer"
                    defaultValue=""
                  />
                  <Box padding={1} >
                    <FormControl sx={{width:100}}>
                      <InputLabel id="demo-simple-select-label" >Rol</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
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
                <Box display={"flex"}>
                  <Button variant="" fullWidth="true">Voeg toe</Button>
                </Box>
                
                


              </Card>
            </Popper>
            <IconButton
              color="inherit"
            >
                <DeleteIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Groep</TableCell>
            <TableCell align="left">Type</TableCell>
            <TableCell align="left">Achternaam</TableCell>
            <TableCell align="left">Emailadres</TableCell>
            <TableCell align="left">Telefoon</TableCell>
            <TableCell width="1000" align="left">Rol</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.id}
              </TableCell>
              <TableCell align="left">{row.voornaam}</TableCell>
              <TableCell align="left">{row.achternaam}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.telefoonnummer}</TableCell>
              <TableCell align="left">{row.rol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}