import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import Account from "./Account";

import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Card } from "@mui/material";

import Popper from "@mui/material/Popper";
import TextField from "@mui/material/TextField";

import MoreIcon from "@mui/icons-material/MoreVert";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../../config.json";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
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
    document.title = "Accounts Beheren" + config.title;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [rol, setRol] = React.useState("");
    const [selected, setSelected] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const handleChange = (event) => {
        setRol(event.target.value);
    };

    function pageChange(event, value) {
        setCurrentPage(value);
        window.scrollTo(0, 0);
    }

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
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const handleSearchClick = async () => {
        search();
    };

    function search() {
        const searchTerm = "/api/account/" + document.getElementById("searchbox").value;
        zoekGebruiker(searchTerm);
    }

    async function zoekGebruiker(searchTerm) {
        if (document.getElementById("searchbox").value == null || document.getElementById("searchbox").value == "") {
            getGebruikers();
            return;
        }
        const response = await axios
            .get(searchTerm)
            .catch((err) => {
                console.log(err);
            });
        if (response && response.data) {
            setRows(response.data);
            console.log(response.data);
        }
    }

    async function getGebruikers() {
        const response = await axios.get("/api/account").catch((err) => {
            console.log(err);
        });
        if (response && response.data) {
            setRows(response.data);
        }
    }

    async function getGebruikersSearch() {
        if (document.getElementById("searchbox").value == null || document.getElementById("searchbox").value == "") {
            getGebruikers();
        } else {
            zoekGebruiker(document.getElementById("searchbox").value);
        }
    }



    function rowElement() {
        if (rows.length == 0) {
            getGebruikers();
        }

        if (rows.length > 1) {
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
                        <Checkbox checked={isSelected(account.id)} />
                    </TableCell>
                    <Account account={account} key={account.id}/>
                </TableRow>
            ));
        }
        if ((rows.length = 1)) {
            return (
                <TableRow
                    hover
                    key={rows.id}
                    role="checkbox"
                    aria-checked={isSelected(rows.id)}
                    tabIndex={-1}
                    onClick={(event) => selectClick(event, rows.id)}
                    selected={isSelected(rows.id)}
                >
                    <TableCell padding="checkbox">
                        <Checkbox checked={isSelected(rows.id)} />
                    </TableCell>
                    <Account account={rows} key={rows.id} />
                </TableRow>
            );
        }
    }

    function deleteGebruikers() {
        if (selected.length == 0) {
            console.log("Selecteer eerst een gebruiker om te verwijderen");
            return;
        }
        selected.map((id) => {
            deleteGebruiker(id);
        });
    }

    async function deleteGebruiker(props) {
        console.log(props);
        try {
            const response = await axios.delete(`/api/account/${props}`);
            if (response.status == 200) {
                console.log("succes");
            }
            console.log("deleted");
            getGebruikers();
        } catch (error) {
            console.log(error);
        }
    }

    async function addGebruiker() {
        const voornaam = document.getElementById("voornaam").value;
        const achternaam = document.getElementById("achternaam").value;
        const email = document.getElementById("email").value;
        const telefoon = document.getElementById("telefoon").value;

        try {
            const response = await axios.post("/api/account", {
                rol,
                voornaam,
                achternaam,
                email,
                telefoon,

            });
            console.log(response.data);
            // handle the response data here
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <AppBar position="static" sx={{ width: "1200", mx: "auto" }}>
                <Toolbar sx={{ width: "100%", mx: "auto" }}>
                    <Search>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                            id="searchbox"
                        />
                    </Search>
                    <IconButton color="inherit" type="button" onClick={search}>
                        <SearchIcon />
                    </IconButton>

                    <Box>
                        <IconButton
                            color="inherit"
                            aria-describedby={id}
                            type="button"
                            onClick={handleClick}
                        >
                            <AddIcon />
                        </IconButton>
                        <Popper id={id} open={open} anchorEl={anchorEl}>
                            <AccountForm />
                        </Popper>
                        <IconButton color="inherit" onClick={deleteGebruikers}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton color="inherit" onClick={getGebruikersSearch}>
                            <EditIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    indeterminate={
                                        selected.length > 0 &&
                                        selected.length < rows.length
                                    }
                                    checked={
                                        rows.length > 0 && selected.length === rows.length
                                    }
                                    onChange={handleSelectAllClick}
                                    inputProps={{ "aria-label": "select all desserts" }}
                                />
                            </TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell align="left">Voornaam</TableCell>
                            <TableCell align="left">Achternaam</TableCell>
                            <TableCell align="left">Emailadres</TableCell>
                            <TableCell align="left">Telefoon</TableCell>
                            <TableCell width="1000" align="left">
                                Rol
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{rowElement()}</TableBody>
                </Table>
            </TableContainer>
        </>
    );

    function AccountForm() {
        return (
            <Card
                variant="outlined"
                component="form"
                asignItems="center"
                display="flex"
                sx={{
                    "& .MuiTextField-root": { m: 3 },
                }}
                noValidate
                autoComplete="off"
            >
                <form id="addUserForm">
                    <Box sx={{ display: "flex" }}>
                    <Box padding={3}>
                            <FormControl sx={{ width: 100 }}>
                                <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="rol"
                                    value={rol}
                                    label="Rol"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"Gast"}>Gast</MenuItem>
                                    <MenuItem value={"Artiest"}>Artiest</MenuItem>
                                    <MenuItem value={"Medewerker"}>Medewerker</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <TextField
                            required
                            id="voornaam"
                            label="Voornaam"

                        />
                        <TextField
                            required
                            id="achternaam"
                            label="Achternaam"

                        />
                        <TextField required id="email" label="Email" defaultValue="" />
                        <TextField
                            required
                            id="telefoon"
                            label="Telefoonnummer"

                        />     
                    </Box>
                </form>
                <Box display={"flex"}>
                    <Button onClick={addGebruiker} variant="" fullWidth="true">
                        Voeg toe
                    </Button>
                </Box>
            </Card>
        );
    }
}
