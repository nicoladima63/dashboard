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