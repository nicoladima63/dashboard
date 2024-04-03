import React, { useState, useEffect } from 'react';
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
    const { setRows, setRowModesModel,rowArray } = props;

    const handleClick = () => {
        const id = 0;
        setRows((oldRows) => [...oldRows, rowArray]);
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

export default function GridComponent({ dataArray, columns, rowArray,controllerName }) {
    const [rows, setRows] = useState(dataArray);
    const [rowModesModel, setRowModesModel] = useState({});
    const [snackbar, setSnackbar] = useState(null);

    useEffect(() => {
        setRows(dataArray);
    }, [dataArray]);

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

    const handleDeleteClicknoconfirm = (id) => async () => {
        try {
            await Services.delete(controllerName, id);
            setRows(rows.filter((row) => row.id !== id));
        } catch (error) {
            console.error('Errore durante l\'eliminazione del record:', error);
            setSnackbar({ children: 'Si è verificato un errore durante l\'eliminazione del record', severity: 'error' });
        }
    };

    const handleDeleteClick = (id) => async () => {
        const confirmed = window.confirm("Sei sicuro di voler eliminare questo record?");
        if (confirmed) {
            try {
                await Services.delete(controllerName, id);
                setRows(rows.filter((row) => row.id !== id));
            } catch (error) {
                console.error('Errore durante l\'eliminazione del record:', error);
                setSnackbar({ children: 'Si è verificato un errore durante l\'eliminazione del record', severity: 'error' });
            }
        }
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

    const processRowUpdate = async (newRow) => {
        try {
            if (newRow.isNew) {
                await Services.create(controllerName, newRow);
                setSnackbar({ children: 'Record aggiunto con successo', severity: 'success' });
            } else {
                await Services.update(controllerName, newRow.id, newRow);
                setSnackbar({ children: 'Record aggiornato con successo', severity: 'success' });
            }
            setRows(rows.map((row) => (row.id === newRow.id ? newRow : row)));
            return newRow;
        } catch (error) {
            console.error('Errore durante l\'aggiornamento del record:', error);
            setSnackbar({ children: 'Si è verificato un errore durante l\'aggiornamento del record', severity: 'error' });
        }
    };

    const processRowUpdateError = React.useCallback((error) => {
        setSnackbar({ children: error.message, severity: 'error' });
    }, []);


    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const handleCloseSnackbar = () => setSnackbar(null);


    const actions = [
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


    return (
        <Box
            sx={{
                height: 500,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns.concat(actions)}
                editMode="row"
                autosizeOnMount={ true}
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={processRowUpdateError}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel,rowArray },
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