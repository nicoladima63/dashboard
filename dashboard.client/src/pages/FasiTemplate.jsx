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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

export async function loader() {
    const fasitemplate = await Services.get('fasitemplate');
    const utenti = await Services.get('utenti');
    const tipolavorazioni = await Services.get('tipolavorazione');
    return { fasitemplate, utenti, tipolavorazioni };
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
    const { fasitemplate, utenti, tipolavorazioni } = useLoaderData();
    const [lavorazioneNome, setLavorazioneNome] = useState('');
    const [rows, setRows] = useState([]);
    const [modifiedRows, setModifiedRows] = useState([]);
    const [tipolavorazioneSelected, setTipolavorazioneSelected] = useState(false);
    const [tipolavorazioneid, setTipolavorazioneid] = useState(null);

    useEffect(() => {
        // Inizialmente non ci sono righe nella tabella
        setRows([]);
        setModifiedRows([]);
        setTipolavorazioneid('');
    }, []);

    const handleItemListClick = (tipolavorazione) => {
        setLavorazioneNome(tipolavorazione.nome);
        setTipolavorazioneSelected(true);
        setTipolavorazioneid(tipolavorazione.id);
        const newRow = { tipoLavorazioneId: 0, nome: '', chilafa: '', quando: '', eseguite: false, isNew: true, isModified: false };
        // Filtra le righe di fasitemplate per il tipo di lavorazione cliccato
        const filteredRows = fasitemplate.filter(row => row.tipoLavorazioneId === tipolavorazione.id);
        if (!filteredRows || filteredRows.length > 0) {
            setRows(filteredRows);
            setModifiedRows(filteredRows);
        } else {
            setRows([newRow]);
            setModifiedRows([newRow]);
        }
    };

    const handleAddRecord = () => {
        console.log(tipolavorazioneid);

        const newRow = { tipoLavorazioneId: tipolavorazioneid, nome: '', chilafa: '', quando: '', eseguite: false, isNew: true, isModified: false };
        // Controlla se l'ultima riga è stata modificata
        if (modifiedRows[modifiedRows.length - 1].isModified) {
            //alert("Modifica l'ultima riga prima di aggiungerne un'altra");
            return;
        }
        setRows([...rows, newRow]);
        setModifiedRows([...modifiedRows, newRow]);
        setTipolavorazioneSelected(false);
    };


    const handleDeleteRecord = (index) => {
        const newRows = [...modifiedRows];
        newRows.splice(index, 1);
        setModifiedRows(newRows);
    };

    const handleSaveRecord = async (index) => {
        const rowToSave = modifiedRows[index];
        const response = await Services.update('fasitemplate', rowToSave.id, rowToSave); //ottiene response
    };

    const handleNomeChange = (index, event) => {
        const updatedRows = [...modifiedRows];
        updatedRows[index].nome = event.target.value;
        updatedRows[index].isModified = true;
        setModifiedRows(updatedRows);
    };

    const handleSelectChange = (index, event) => {
        const updatedRows = [...modifiedRows];
        updatedRows[index].chilafa = event.target.value;
        console.log(updatedRows);
        setModifiedRows(updatedRows);
    };

    const handleRefresh = async () => {
        const fasitemplate = await Services.get('fasitemplate');
        const filteredRows = fasitemplate.filter(row => row.tipoLavorazioneId === tipolavorazioneid);
        setRows(filteredRows);
        setModifiedRows(filteredRows);
        if (tipolavorazioneid) {
            setTipolavorazioneSelected(true);
        } else {
            setTipolavorazioneSelected(false);
        }
    };



    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <Item>
                        <h3>Tipo di lavorazioni</h3>
                        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <List>
                                {tipolavorazioni.map((tipolavorazione) => (
                                    <ListItem key={tipolavorazione.id} disablePadding>
                                        <ListItemButton onClick={() => handleItemListClick(tipolavorazione)}>
                                            <ListItemText primary={tipolavorazione.nome} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Item>
                </Grid>
                <Grid item xs={8}>
                    <Item>
                        <h3>Fasi di lavoro per: </h3>
                        <Divider />
                        <span className="maiuscolo"><b>{lavorazioneNome}</b></span>
                        <Divider />
                        <br />

                        <div style={{ height: 400, width: '100%' }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>ID</StyledTableCell>
                                            <StyledTableCell align="center">Tipo Lavorazione ID</StyledTableCell>
                                            <StyledTableCell align="left">Nome</StyledTableCell>
                                            <StyledTableCell align="left">Chi la fa</StyledTableCell>
                                            <StyledTableCell align="left">Quando</StyledTableCell>
                                            <StyledTableCell align="center">Eseguita</StyledTableCell>
                                            <StyledTableCell align="center">Azioni</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {modifiedRows.map((row, index) => (
                                            <StyledTableRow key={row.tipoLavorazioneId}>
                                                <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
                                                <StyledTableCell align="center">{row.tipoLavorazioneId}</StyledTableCell>
                                                <StyledTableCell align="left">
                                                    <TextField
                                                        name={'nome'}
                                                        size="small"
                                                        value={row.nome}
                                                        onChange={(event) => handleNomeChange(index, event)}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell align="left">
                                                    <Select
                                                        value={row.chilafa}
                                                        size="small"
                                                        onChange={(event) => handleSelectChange(index, event)}>
                                                        <MenuItem value="" selected>
                                                            <em>Selezionare un utente</em>
                                                        </MenuItem>
                                                        {utenti.map((utente) => (
                                                            <MenuItem key={utente.id} value={utente.nome}>{utente.nome}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </StyledTableCell>
                                                <StyledTableCell align="left">{row.quando}</StyledTableCell>
                                                <StyledTableCell align="center">{row.eseguita ? 'Si' : 'No'}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {row.isModified ? (
                                                        <IconButton aria-label="save" onClick={() => handleSaveRecord(index)}>
                                                            <SaveIcon />
                                                        </IconButton>
                                                    ) : (
                                                        <IconButton aria-label="delete" onClick={() => handleDeleteRecord(index)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    )}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </Item>
                </Grid>
                <Grid item xs={2}>
                    <Item>
                        <Button variant="contained" onClick={handleAddRecord} disabled={!tipolavorazioneSelected}>Aggiungi</Button>
                    </Item>
                    <Item>
                        <Button variant="outlined" onClick={handleRefresh}>Refresh</Button>
                    </Item>
                </Grid>
            </Grid>
        </>
    );
}

export default FasiTemplate;