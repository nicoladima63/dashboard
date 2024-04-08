import React, { useState, useEffect, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/it';
function MasterDetails({ fasi, utenti, lavorazioni, tipolavorazioni }) {
    const [selectedValue, setSelectedValue] = useState(null);
    //const [selectedUtente, setSelectedUtente] = useState(utenti.length > 0 ? utenti[0].nome : '');
    const [rows, setRows] = useState([]);
    const [value, setValue] = React.useState(null);
    const [lavorazioneNome, setLavorazioneNome] = React.useState(null);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const handleListItemClick = (event, tipoLavorazione) => {
        //setSelectedValue(tipoLavorazione);
        //setValue(new Date().getDate());
        const fasiLavorazione = fasi.filter(fase => fase.lavorazioneId === lavorazione.id);
        console.log(fasiLavorazione);
        setLavorazioneNome(tipoLavorazione.nome);
        const newRow = {
            tipoLavorazioneId: tipoLavorazione.id,
            nome: '',
            chilafa: '',
            quando: '',
            eseguita: false
        };
        if (fasiLavorazione.length === 0) {
            setRows([newRow]);
        } else {
            setRows(fasiLavorazione);
        }
    };

    const handleDeleteClick = (idToDelete) => {
        // Filtra le righe per mantenere solo quelle con un ID diverso da quello da eliminare
        const updatedRows = rows.filter(row => row.id !== idToDelete);
        // Aggiorna lo stato delle righe con le righe filtrate
        setRows(updatedRows);
    };

    const handleCreateRow = () => {
        // Definisci i valori mancanti per la nuova riga
        const newRow = {
            id: generateNewId(), // Ad esempio, generi un nuovo ID per la nuova riga
            lavorazioneId: 'valorePredefinito',
            nome: 'valorePredefinito',
            chilafa: 'valorePredefinito',
            quando: 'valorePredefinito',
            eseguita: false // Ad esempio, imposti un valore predefinito per un campo booleano
        };

        // Esegui la chiamata al database per salvare la nuova riga
        saveRowToDatabase(newRow);
    };

    const handleSaveClick = (id) => {
        // Recupera i dati dalla variabile di stato
        const rowToSave = rows.find(row => row.id === id); // Trova la riga modificata utilizzando l'ID
        // Chiama la funzione di salvataggio, passando l'ID e i dati della riga modificata
        console.log(rowToSave);
        //saveDataToDatabase(id, rowToSave);
    };

    const handleNomeChange = (e, id) => {
        const newValue = e.target.value;
        setRows(prevRows => {
            const updatedRows = prevRows.map(prevRow => {
                if (prevRow.id === id) {
                    return { ...prevRow, nome: newValue };
                }
                return prevRow;
            });
            return updatedRows;
        });
    };

    const handleSelectChange = (event, row) => {
        const newValue = event.target.value;
        setRows(prevRows => {
            const updatedRows = prevRows.map(prevRow => {
                if (prevRow.id === row.id) {
                    return { ...prevRow, chilafa: newValue };
                }
                return prevRow;
            });
            return updatedRows;
        });
        console.log(rows);
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Item>
                        <div>
                            <h3>Lavorazioni</h3>
                            <List>
                                {tipolavorazioni.map((tipoLavorazione) => (
                                    <React.Fragment key={tipoLavorazione.id}>
                                        <ListItemButton
                                            onClick={(event) => handleListItemClick(event, tipoLavorazione)}
                                        >
                                            <ListItemText
                                                primary={tipoLavorazione.nome}
                                            />
                                        </ListItemButton>
                                        <Divider />
                                    </React.Fragment>
                                ))}
                            </List>
                        </div>
                    </Item>
                </Grid>
                <Grid item xs={8}>
                    <Item>

                        <h2>Fasi per la vavorazione: {lavorazioneNome}</h2>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Lavorazione ID</TableCell>
                                        <TableCell align="left">Nome fase</TableCell>
                                        <TableCell align="center">Chi la fa</TableCell>
                                        <TableCell align="right">Quando</TableCell>
                                        <TableCell align="right">Eseguita</TableCell>
                                        <TableCell align="center">Azioni</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) => (
                                        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell align="left">{row.tipoLavorazioneId}</TableCell>
                                            <TableCell align="left">
                                                <TextField key={row.id} id={`text-${row.id}`} value={row.nome}
                                                    onChange={(e) => handleNomeChange(e, row.id)}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                                    <Select
                                                        key={row.id}
                                                        id={`select-${row.id}-${index}`}  // Unique id for each Select component
                                                        value={row.chilafa}
                                                        onChange={(event) => handleSelectChange(event, row)}
                                                    >
                                                        {utenti.map(utente => (
                                                            <MenuItem key={utente.id} value={utente.nome}>
                                                                {utente.nome}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                            <TableCell align="right">
                                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
                                                    <DatePicker
                                                        label="Seleziona una data."
                                                        slotProps={{ textField: { size: 'small' } }}
                                                        value={value}  // Usa il valore dalla riga
                                                        onChange={(newValue) => {
                                                            setRows(prevRows => {
                                                                const updatedRows = prevRows.map(prevRow => {
                                                                    if (prevRow.id === row.id) {
                                                                        return { ...prevRow, quando: newValue };
                                                                    }
                                                                    return prevRow;
                                                                });
                                                                return updatedRows;
                                                            });
                                                        }}
                                                    />
                                                </LocalizationProvider>
                                            </TableCell>
                                            <TableCell align="right">{row.eseguita ? 'Si' : 'No'}</TableCell>
                                            <TableCell align="center">
                                                <IconButton key={row.id} aria-label="delete" size="large" onClick={() => handleDeleteClick(row.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton key={row.id} aria-label="delete" size="large" onClick={() => handleSaveClick(row.id)}>
                                                    <SaveIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Item>
                </Grid>
            </Grid>
        </>
    );
}

export default MasterDetails;
