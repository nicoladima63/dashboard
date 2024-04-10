import React, { useState, useEffect } from 'react';
import { DataGrid, EditToolbar, NewRow } from '@mui/x-data-grid';

const MyComponent = () => {
    const [rows, setRows] = useState([]); // Stato per i fornitori
    const [mode, setMode] = useState('view'); // Stato per la modalità (insert/view)

    // Carica i fornitori dal backend (modifica in base al tuo caso)
    useEffect(() => {
        const fetchData = async () => {
            const response = await Services.getTableFields('fornitori');
            setRows(response.fornitori); // Sostituisci 'fornitori' con la proprietà corretta
            setMode(response.fornitori.length === 0 ? 'insert' : 'view');
        };
        fetchData();
    }, []);

    const handleRowEditStart = (params) => {
        if (mode === 'view') {
            setMode('edit');
        }
    };

    const handleRowEditStop = (params) => {
        if (mode === 'edit') {
            // Salvare le modifiche sul backend (modifica in base al tuo caso)
            const updatedRows = [...rows];
            updatedRows[params.rowIndex] = params.row;
            setRows(updatedRows);
            setMode('view');
        }
    };

    return (
        <Box>
            {mode === 'insert' ? (
                <NewRow
                    // Proprietà per la nuova riga (opzionale)
                    onSubmit={(newRow) => {
                        // Validare i dati della nuova riga
                        if (!validateRow(newRow)) {
                            return;
                        }

                        // Inviare la nuova riga al backend (modifica in base al tuo caso)
                        const response = await Services.create('fornitori', newRow);

                        // Se l'inserimento ha esito positivo, aggiornare la griglia
                        if (response.success) {
                            setRows([...rows, response.data]);
                            setMode('view');
                        } else {
                            // Gestire l'errore di inserimento e mostrare un messaggio all'utente
                        }
                    }}
                />
            ) : (
                <DataGrid
                    rows={rows}
                    columns={columns} // Definisci le colonne della griglia
                    editMode="row"
                    onRowEditStart={handleRowEditStart}
                    onRowEditStop={handleRowEditStop}
                    components={{
                        Toolbar: EditToolbar,
                    }}
                />
            )}
        </Box>
    );
};

export default MyComponent;








import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select from '@mui/material/Select';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator';
import DataFormatter from '../Services/DataFormatter';
import Services from '../Services/Services';

// ...

// Funzione per generare hook useState dinamicamente
const generateStateHooks = (columnHeaders) => {
    const stateHooks = {};
    columnHeaders.forEach((header) => {
        const stateVarName = header.toLowerCase();
        stateHooks[stateVarName] = useState('');
    });
    return stateHooks;
};

// Component NewRow con proprietà dinamiche
const NewRow = ({ onSave, columnHeaders }) => {
    const stateHooks = generateStateHooks(columnHeaders);
    const { name, age, joinDate, role, ...otherState } = stateHooks;

    const handleSave = () => {
        // Validare i dati
        if (!validateRow({ name, age, joinDate, role })) {
            return;
        }

        const newRow = { name, age, joinDate, role, isNew: true, ...otherState };
        onSave(newRow);
    };

    return (
        <Box>
            {columnHeaders.map((header, index) => {
                const stateVarName = header.toLowerCase();
                const value = stateHooks[stateVarName][0];
                const setValue = stateHooks[stateVarName][1];

                return (
                    <TextField
                        key={index}
                        label={header}
                        name={stateVarName}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                );
            })}
            <Button onClick={handleSave}>Salva</Button>
        </Box>
    );
};

// ...

export default function FornitoriComponent({ fornitori }) {
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [mode, setMode] = useState('view');

    // ... (altri hook useEffect e funzioni)

    useEffect(() => {
        const fetchColumns = async () => {
            const fetchedColumns = await DataFormatter.getColumns('fornitori');
            setColumns(fetchedColumns);
        };

        fetchColumns();
    }, []);

    // ...

    return (
        <Box>
            {mode === 'insert' ? (
                <NewRow onSave={processRowUpdate} columnHeaders={columns} />
            ) : (
                <DataGrid
                    rows={rows}
                    columns={columns}
                // ...
                />
            )}
        </Box>
    );
};


import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select from '@mui/material/Select';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator';
import DataFormatter from '../Services/DataFormatter';
import Services from '../Services/Services';

// ...

// Funzione per generare hook useState dinamicamente
const generateStateHooks = (columnHeaders) => {
    const stateHooks = {};
    columnHeaders.forEach((header) => {
        const stateVarName = header.toLowerCase();
        stateHooks[stateVarName] = useState('');
    });
    return stateHooks;
};

// Component NewRow con proprietà dinamiche
const NewRow = ({ onSave, columnHeaders }) => {
    const stateHooks = generateStateHooks(columnHeaders);
    const { name, age, joinDate, role, ...otherState } = stateHooks;

    const handleSave = () => {
        // Validare i dati
        if (!validateRow({ name, age, joinDate, role })) {
            return;
        }

        const newRow = { name, age, joinDate, role, isNew: true, ...otherState };
        onSave(newRow);
    };

    return (
        <Box>
            {columnHeaders.map((header, index) => {
                const stateVarName = header.toLowerCase();
                const value = stateHooks[stateVarName][0];
                const setValue = stateHooks[stateVarName][1];

                return (
                    <TextField
                        key={index}
                        label={header}
                        name={stateVarName}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                );
            })}
            <Button onClick={handleSave}>Salva</Button>
        </Box>
    );
};

// ...

export default function FornitoriComponent({ fornitori }) {
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [mode, setMode] = useState('view');

    // ... (altri hook useEffect e funzioni)

    useEffect(() => {
        const fetchColumns = async () => {
            const fetchedColumns = await DataFormatter.getColumns('fornitori');
            setColumns(fetchedColumns);
        };

        fetchColumns();
    }, []);

    // ...

    return (
        <Box>
            {mode === 'insert' ? (
                <NewRow onSave={processRowUpdate} columnHeaders={columns} />
            ) : (
                <DataGrid
                    rows={rows}
                    columns={columns}
                // ...
                />
            )}
        </Box>
    );
};








import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select from '@mui/material/Select';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator';
import DataFormatter from '../Services/DataFormatter';
import Services from '../Services/Services';

// ...

// Funzione per generare hook useState dinamicamente
const generateStateHooks = (columnHeaders) => {
    const stateHooks = {};
    columnHeaders.forEach((header) => {
        const stateVarName = header.toLowerCase();
        stateHooks[stateVarName] = useState('');
    });
    return stateHooks;
};

// Component NewRow con proprietà dinamiche
const NewRow = ({ onSave, columnHeaders }) => {
    const stateHooks = generateStateHooks(columnHeaders);
    const { name, age, joinDate, role, ...otherState } = stateHooks;

    const handleSave = () => {
        // Validare i dati
        if (!validateRow({ name, age, joinDate, role })) {
            return;
        }

        const newRow = { name, age, joinDate, role, isNew: true, ...otherState };
        onSave(newRow);
    };

    return (
        <Box>
            {columnHeaders.map((header, index) => {
                const stateVarName = header.toLowerCase();
                const value = stateHooks[stateVarName][0];
                const setValue = stateHooks[stateVarName][1];

                return (
                    <TextField
                        key={index}
                        label={header}
                        name={stateVarName}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                );
            })}
            <Button onClick={handleSave}>Salva</Button>
        </Box>
    );
};

// ...

export default function FornitoriComponent({ fornitori }) {
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [mode, setMode] = useState('view');

    // ... (altri hook useEffect e funzioni)

    useEffect(() => {
        const fetchColumns = async () => {
            const fetchedColumns = await DataFormatter.getColumns('fornitori');
            setColumns(fetchedColumns);
        };

        fetchColumns();
    }, []);

    // ...

    return (
        <Box>
            {mode === 'insert' ? (
                <NewRow onSave={processRowUpdate} columnHeaders={columns} />
            ) : (
                <DataGrid
                    rows={rows}
                    columns={columns}
                // ...
                />
            )}
        </Box>
    );
};




import React, { useState, useEffect, useRef } from 'react';
import { useLoaderData } from "react-router-dom";
import Services from '../Services/Services';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
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
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function FasiTemplate() {
    const { fasitemplate, utenti, tipolavorazioni } = useLoaderData();
    const [lavorazioneNome, setLavorazioneNome] = useState('');
    const [rows, setRows] = useState([]);
    const [modifiedRows, setModifiedRows] = useState([]);

    useEffect(() => {
        // Inizialmente non ci sono righe nella tabella
        setRows([]);
        setModifiedRows([]);
    }, []);

    const handleItemListClick = (tipolavorazione) => {
        setLavorazioneNome(tipolavorazione.nome);

        // Filtra le righe di fasitemplate per il tipo di lavorazione cliccato
        const filteredRows = fasitemplate.filter(row => row.tipoLavorazioneId === tipolavorazione.id);
        setRows(filteredRows);
        console.log('filtered',filteredRows)
        setModifiedRows(filteredRows);
    };

    const handleDeleteRecord = (index) => {
        const newRows = [...modifiedRows];
        newRows.splice(index, 1);
        setModifiedRows(newRows);
    };

    const handleSaveRecord = async (index) => {
        console.log(modifiedRows[index]); // Puoi fare ciò che vuoi con la riga modificata
        // Ad esempio, puoi inviare una richiesta API per aggiornare il record sul server
    };

    const handleNomeChange = (index, event) => {
        const updatedRows = [...modifiedRows];
        updatedRows[index].nome = event.target.value;
        setModifiedRows(updatedRows);
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
                        Fasi di lavoro per: <b>{lavorazioneNome}</b><br /><br /><br />
                        <div style={{ height: 400, width: '100%' }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>ID</StyledTableCell>
                                            <StyledTableCell align="center">Tipo Lavorazione ID</StyledTableCell>
                                            <StyledTableCell align="left">Nome</StyledTableCell>
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
                                                <StyledTableCell align="center">
                                                    <IconButton
                                                        aria-label="delete"
                                                        onClick={() => handleDeleteRecord(index)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        aria-label="save"
                                                        onClick={() => handleSaveRecord(index)}
                                                    >
                                                        <SaveIcon />
                                                    </IconButton>
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
                    <Item>xs</Item>
                </Grid>
            </Grid>
        </>
    );
}

export default FasiTemplate;
