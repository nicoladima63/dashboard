import React from 'react';
import { useLoaderData } from "react-router-dom";
import Services from '../Services/Services';
import Grid from '../components/GridComponent';

export async function loader() {
    const dataArray = await Services.get('lavorazioni');
    const fornitori = await Services.get('fornitori');
    const tipolavorazioni = await Services.get('tipolavorazione');
    return { dataArray, fornitori, tipolavorazioni };
}

function GridPage() {
    const { dataArray, fornitori, tipolavorazioni } = useLoaderData();
    const columns = [
        {
            field: 'fornitore',
            headerName: 'Fornitore',
            width: 180,
            type: 'singleSelect',
            valueOptions: fornitori.map((fornitore) => fornitore.nome),
            editable: true,
        },
        {
            field: 'tipolavorazione',
            headerName: 'Tipo di Lavorazione',
            width: 180,
            type: 'singleSelect',
            valueOptions: tipolavorazioni.map((tipolavorazione) => tipolavorazione.nome),
            editable: true,
        },
        {
            field: 'paziente',
            headerName: 'Paziente',
            width: 180,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'datainserimento',
            headerName: 'Inserito il',
            type: 'date',
            width: 180,
            editable: true,
        },
        {
            field: 'dataconsegna',
            headerName: 'Data consegna',
            type: 'date',
            width: 180,
            editable: true,
        },
        {
            field: 'completata',
            headerName: 'Completata',
            width: 80,
            type: 'boolean',
            editable: true
        },
    ];
    const rowArray = { id: 0, fornitore: '', tipolavorazione: '', paziente: '', datainserimento: '', dataconsegna: '', completata: false, isNew: true }

    return (
        <Grid dataArray={dataArray} columns={columns} rowArray={rowArray} controllerName={'lavorazioni'} />
    );
}

export default GridPage;
