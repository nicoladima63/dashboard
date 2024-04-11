import React, { useState, useEffect, useRef } from 'react';
import { useLoaderData } from "react-router-dom";
import Services from '../Services/Services';
//griglia
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
//elenco list
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
//table
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export async function loader() {
    const lavorazioni = await Services.get('lavorazioni');
    const tipolavorazioni = await Services.get('tipolavorazione');
    const fasitemplate = await Services.get('fasitemplate');
    const fasi = await Services.get('fasi');

    return { lavorazioni, tipolavorazioni, fasitemplate, fasi };
}


export default function LavorazioniAddFasi() {
    const { lavorazioni, tipolavorazioni, fasitemplate, fasi } = useLoaderData();
    const lavorazioniNonCompletate = lavorazioni.filter(lavorazione => !lavorazione.completata);


     const handleItemListClick =async (lavorazione) => {
        const fasitemplateToAdd = fasitemplate.filter(fase => fase.tipoLavorazioneId === lavorazione.tipoLavorazioneId);

        fasitemplateToAdd.forEach(async fase => {
            const newFase = {
                nome: fase.nome,
                lavorazioneId: lavorazione.id,
                tipoLavorazione: fase.tipoLavorazioneId,
                chilafa: fase.chilafa,
                quando: new Date(),
                eseguita: false
            };

            const response = await Services.create('fasi', newFase);

        });

        // Aggiornare il database qui
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <Item>
                        <h3>lavorazioni in programma</h3>
                        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <List>
                                {lavorazioniNonCompletate.map((lavorazione) => (
                                    <ListItem key={lavorazione.id} disablePadding>
                                        <ListItemButton onClick={() => handleItemListClick(lavorazione)}>
                                            <ListItemText primary={lavorazione.tipoLavorazione} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Item>
                </Grid>
                <Grid item xs={8}>
                    <Item>
                        <h3>Titolone</h3>
                    </Item>
                </Grid>
            </Grid>

        </>
    );
}


