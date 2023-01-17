import React from 'react'
import Button from '@mui/material';
import { Box, Card, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { useState } from 'react';



export default function AccountForm() {
  return (
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
            <Button>Voeg toe</Button>
        </Box>

    </Card>
    
              
  )
}
