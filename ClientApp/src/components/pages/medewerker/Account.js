import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { TableRow } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function Account(props) {
    const id = props.account.id;
    const voornaam = props.account.voornaam;
    const achternaam = props.account.achternaam;
    const email = props.account.email;
    const telefoonnummer = props.account.phoneNumber;
    const [userRol, setUserRol] = useState([null]);

    return(
        <>
            <TableCell component="th" scope="row">{id}
            </TableCell>
            <TableCell align="left">{voornaam}</TableCell>
            <TableCell align="left">{achternaam}</TableCell>
            <TableCell align="left">{email}</TableCell>
            <TableCell align="left">{telefoonnummer}</TableCell>
            <TableCell align="left">{getRol(props.account.id)}</TableCell>
        </>
    )

    function getRol(id) {
        if (userRol == null || id == undefined) {
            return userRol;
        }
        axios.get(`api/account/${id}/rol`)
            .then(res => {
                setUserRol(res.data);
            })
            .catch(err => {
                console.log(err);
            })

            return userRol;
        }
        
    }

    


    



