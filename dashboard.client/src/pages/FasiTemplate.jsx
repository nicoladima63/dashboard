import React, { useState,useEffect } from 'react';
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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export async function loader() {
    const fasitemplate = await Services.get('fasitemplate');
    const utenti = await Services.get('utenti');
    const lavorazioni = await Services.get('lavorazioni');
    const tipolavorazioni = await Services.get('tipolavorazione');
    return { fasitemplate, utenti, lavorazioni, tipolavorazioni };
}

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

function FasiTemplate() {
    const { fasitemplate, utenti, lavorazioni, tipolavorazioni } = useLoaderData();
    const [lavorazioneNome, setLavorazioneNome] = useState();
    const[rows, setRows] = useState([]);

    // useEffect should be used directly, not redefined
    useEffect(() => {
        // Set rows when fasitemplate changes
        setRows(fasitemplate);
    }, [fasitemplate]);

    const handleItemListClick = (lavorazione) => {
        setLavorazioneNome(lavorazione.nome);
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <Item>
                        <h3>Tipo di lavorazioni</h3>
                        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <List>
                                {tipolavorazioni.map((lavorazione) => (
                                    <ListItem key={lavorazione.id} disablePadding>
                                        <ListItemButton onClick={() => handleItemListClick(lavorazione)}>
                                            <ListItemText primary={lavorazione.nome} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Item>
                </Grid>
                <Grid item xs={8}>
                    <Item>
                        Fasi di lavoro per: <b>{lavorazioneNome}</b><br /><br /><br />
                        <div style={{ height: 400, width: '100%' }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                                            <StyledTableCell align="right">Calories</StyledTableCell>
                                            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                                            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                                            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <StyledTableRow key={row.id}>
                                                <StyledTableCell component="th" scope="row">{row.nome}</StyledTableCell>
                                                <StyledTableCell align="right">{row.chilafa}</StyledTableCell>
                                                <StyledTableCell align="right">{row.quando}</StyledTableCell>
                                                <StyledTableCell align="right">{row.eseguita}</StyledTableCell>
                                                <StyledTableCell align="right"> + - </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </Item>
                </Grid>
                <Grid item xs={2}>
                    <Item>xs</Item>
                </Grid>
            </Grid>
        </>
    );
}

export default FasiTemplate;