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




const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
    return randomArrayItem(roles);
};

const initialRows = [
    {
        id: randomId(),
        name: randomTraderName(),
        age: 25,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        name: randomTraderName(),
        age: 36,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        name: randomTraderName(),
        age: 19,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        name: randomTraderName(),
        age: 28,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        name: randomTraderName(),
        age: 23,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
];

function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Aggiungi record
            </Button>
        </GridToolbarContainer>
    );
}


// Funzione per generare hook useState dinamicamente
const generateStateHooks = (columnHeaders) => {
    const stateHooks = {};
    columnHeaders.forEach((header) => {
        const stateVarName = header.toLowerCase();
        stateHooks[stateVarName] = useState('');
    });
    return stateHooks;
};


const NewRow = ({ onSave }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [joinDate, setJoinDate] = useState(null);
    const [role, setRole] = useState('');

    const handleSave = () => {
        // Validare i dati
        if (!validateRow({ name, age, joinDate, role })) {
            return;
        }

        // Inviare i dati al backend e aggiornare la griglia
        const newRow = { name, age, joinDate, role, isNew: true };
        onSave(newRow);
    };

    return (
        <Box>
            <TextField
                label="Nome"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                label="Età"
                name='eta'
                type="number"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
            />
            <Select
                label="Ruolo"
                name='ruolo'
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                {roles.map((role, index) => (
                    <option key={index} value={role.id}>
                        {role.name}
                    </option>
                ))}
            </Select>
            <Button onClick={handleSave}>Salva</Button>
        </Box>
    );
};

export default function FornitoriComponent({ fornitori }) {
    const [rows, setRows] = useState([]); // Stato per i fornitori
    const [columns, setColumns] = useState([]);
    const [mode, setMode] = useState('view'); // Stato per la modalità (insert/view)

    // Carica i fornitori dal backend (modifica in base al tuo caso)
    useEffect(() => {
        if (fornitori.length === 0 || fornitori.length === undefined) {
            setMode('insert');
        } else {
            setMode('view');
        }
    }, []);

    useEffect(() => {
        const fetchColumns = async () => {
            const fetchedColumns = await DataFormatter.getColumns('fornitori');
            console.log('fetchedColumns', fetchedColumns)
            setColumns(fetchedColumns);
        };

        fetchColumns();
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

    const validateRow = (newRow) => {
        // Implementare la validazione dei dati di newRow
        // ...
        return true; // Sostituire con la logica di validazione
    };

    const processRowUpdate = async (newRow) => {
        if (newRow.isNew) {
            // Nuovo record: aggiungere al backend e aggiornare la griglia
            const updatedRow = { ...newRow, isNew: false };
            const response = await Services.create('fornitori', updatedRow);
            if (response.success) {
                setRows([...rows, response]);
            } else {
                // Gestire l'errore di inserimento e mostrare un messaggio all'utente
            }
        } else {
            // Record esistente: aggiornare il backend
            const updatedRows = [...rows];
            const index = rows.findIndex((row) => row.id === newRow.id);
            updatedRows[index] = newRow;
            setRows(updatedRows);
        }
        return newRow;
    };

    const columns2 = [
        { field: 'name', headerName: 'Name', width: 180, editable: true },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 80,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'joinDate',
            headerName: 'Join date',
            type: 'date',
            width: 180,
            editable: true,
        },
        {
            field: 'role',
            headerName: 'Department',
            width: 220,
            editable: true,
            type: 'singleSelect',
            valueOptions: ['Market', 'Finance', 'Development'],
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];
    const columns3 = async () => {
        const col = await DataFormatter.getColumns('fornitori');
        return col;
    };
    //console.log('fornitoricomponent', columns); // Per visualizzare le colonn

    return (
        <Box>
            {mode === 'insert' ? (
                <NewRow
                    onSave={(newRow) => {
                        // Validare i dati della nuova riga
                        if (!validateRow(newRow)) {
                            return;
                        }
                        setMode('view');
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

