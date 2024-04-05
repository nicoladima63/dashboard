import React, { useState, useEffect } from 'react';
import { useLoaderData } from "react-router-dom";
import Services from '../Services/Services';

import Grid from '../components/GridComponent';
import DataGridDetail from '../components/DataGridDetailsComponent';

import { GridActionsCellItem } from '@mui/x-data-grid';
import SegmentIcon from '@mui/icons-material/Segment';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export async function loader() {
    const dataArray = await Services.get('lavorazioni');
    const fornitori = await Services.get('fornitori');
    const tipolavorazioni = await Services.get('tipolavorazione');
    return { dataArray, fornitori, tipolavorazioni };
}

function GridPage() {
    const { dataArray, fornitori, tipolavorazioni } = useLoaderData();
    const [open, setOpen] = useState(false);

    // Creazione delle opzioni per la Select del fornitore e della tipolavorazione
    const fornitoriOptions = fornitori.map((fornitore) => fornitore.nome);
    const tipolavorazioniOptions = tipolavorazioni.map((tipolavorazione) => tipolavorazione.nome);

    const handleOpenDialog = (id) => {
        setOpen(true);
    };

    // Funzione per chiudere la modal dialog
    const handleCloseDialog = () => {
        setOpen(false);
    };

    const columns = [
        {
            field: 'add',
            headerName: '',
            width: 80,
            renderCell: (item) => (
                <GridActionsCellItem
                    icon={<SegmentIcon />} // Utilizza l'icona +
                    label="Aggiungi"
                    sx={{
                        color: 'primary.main',
                    }}
                    onClick={() => handleOpenDialog(item.row.id)}
                />
            )
        }, {
            field: 'fornitore',
            headerName: 'Fornitore',
            width: 180,
            type: 'singleSelect',
            valueOptions: fornitoriOptions,
            editable: true,
        },
        {
            field: 'tipoLavorazione',
            headerName: 'Tipo di Lavorazione',
            width: 180,
            type: 'singleSelect',
            valueOptions: tipolavorazioniOptions,
            editable: true,
        },
        {
            field: 'paziente',
            headerName: 'Paziente',
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'dataInserimento',
            headerName: 'Inserito il',
            type: 'date',
            editable: false,
            valueGetter: (params) => {
                // Creazione di una data considerando l'ora locale
                const localDate = new Date(params.value);
                // Controllo se l'ora legale è attiva
                const isDaylightSavingTime = localDate.getTimezoneOffset() < new Date(localDate.getFullYear(), 5, 1).getTimezoneOffset();
                // Se l'ora legale è attiva, aggiungi un'ora alla data
                if (isDaylightSavingTime) {
                    localDate.setHours(localDate.getHours() + 1);
                }

                return localDate;
            },
        },
        {
            field: 'dataconsegna',
            headerName: 'Data consegna',
            type: 'date',
            editable: true,
            valueGetter: (params) => {
                // Creazione di una data considerando l'ora locale
                const localDate = new Date(params.value);
                // Controllo se l'ora legale è attiva
                const isDaylightSavingTime = localDate.getTimezoneOffset() < new Date(localDate.getFullYear(), 5, 1).getTimezoneOffset();
                // Se l'ora legale è attiva, aggiungi un'ora alla data
                if (isDaylightSavingTime) {
                    localDate.setHours(localDate.getHours() + 1);
                }

                return localDate;
            },
        },
        {
            field: 'completata',
            headerName: 'Completata',
            width: 80,
            type: 'boolean',
            editable: true
        },
    ];
    const rowArray = { id: 0, fornitore: '', tipoLavorazione: '', paziente: '', dataInserimento: new Date(), dataconsegna: '', completata: false, isNew: true }

    return (
        <>
            <Grid dataArray={dataArray} columns={columns} rowArray={rowArray} controllerName={'lavorazioni'} onOpenDialog={handleOpenDialog} />
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Fasi della Lavorazione</DialogTitle>
                <DialogContent>
                    <DataGridDetail
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Chiudi
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default GridPage;
