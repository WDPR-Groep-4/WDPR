import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { TableRow } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';


export default function Account(props) {
    const id = props.account.id;
    const voornaam = props.account.voornaam;
    const achternaam = props.account.achternaam;
    const email = props.account.email;
    const telefoonnummer = props.account.phoneNumber;
    const rol = props.account.Rol;

    return(
        <>
            <TableCell component="th" scope="row">{id}</TableCell>
            <TableCell align="left">{voornaam}</TableCell>
            <TableCell align="left">{achternaam}</TableCell>
            <TableCell align="left">{email}</TableCell>
            <TableCell align="left">{telefoonnummer}</TableCell>
            <TableCell align="left">{rol}</TableCell>
        </>
    )
}