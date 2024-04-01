import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import Services from '../Services/Services';




function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = 0;
        setRows((oldRows) => [...oldRows, {id, nome: '', email: '', url: '', telefono: '', colore: '', lavorazioniFornite: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'nome' },
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
export default function GridComponent({ fornitori }) {
    //console.log('GridComponent fornitori', fornitori);
    //console.log('GridComponent tableFields', tableFields);
    //console.log('GridComponent colonne', colonne)
    const [rows, setRows] = useState(fornitori); // Stato per i fornitori
    const [mode, setMode] = useState('view'); // Stato per la modalità (insert/view)
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [snackbar, setSnackbar] = React.useState(null);


    const handleCloseSnackbar = () => setSnackbar(null);

    const handleClickAddRecord = () => {
        const id = 0;
        setRows((oldRows) => [...oldRows, { id, nome: '', email: '', url: '', telefono: '', colore: '', lavorazioniFornite: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'nome' },
        }));
    };

    const handleRowEditStart = (params) => {
        if (mode === 'view') {
            setMode('edit');
        }
    };

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = React.useCallback(
        async (newRow) => {
            const updatedRow = { ...newRow, isNew: false };
            try {
                // Attendere l'operazione di creazione prima di procedere
                const response = await Services.create('fornitori', newRow); // Invia la modifica al server per la persistenza dei fornitori
                setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
                setSnackbar({ children: 'Record aggiunto con successo', severity: 'success' });
                return updatedRow;
            } catch (error) {
                // Gestione degli errori
                setSnackbar({ children: error.message, severity: 'error' });
                // Potresti voler lanciare l'errore qui per gestirlo più avanti
                //throw error;
            }
        },
        [Services]
    );


    const handleProcessRowUpdateError = React.useCallback((error) => {
        setSnackbar({ children: error.message, severity: 'error' });
    }, []);


    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        {
            field: 'nome',
            headerName: 'Nome',
            width: 180,
            editable: true
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 180,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'url',
            headerName: 'Url',
            width: 180,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'telefono',
            headerName: 'Telefono',
            width: 180,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'colore',
            headerName: 'Colore',
            width: 180,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Azioni',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Salva"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Annulla"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Modifica"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Cancella"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    //const colonne = DataFormatter.getColumns(fornitori, 'fornitori');

    return (
        <Box>
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
            />
            {!!snackbar && (
                <Snackbar
                    open
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    onClose={handleCloseSnackbar}
                    autoHideDuration={6000}
                >
                    <Alert {...snackbar} onClose={handleCloseSnackbar} />
                </Snackbar>
            )}
        </Box>
    );
}