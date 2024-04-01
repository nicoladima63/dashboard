import React from 'react';
import { useLoaderData } from "react-router-dom";
import Services from '../Services/Services';
import Grid from '../components/GridComponent';

export async function loader() {
    const dataArray = await Services.get('lavorazioni');
    const fornitori = await Services.get('fornitori');
    return { dataArray, fornitori };
}

function GridPage() {
    const { dataArray, fornitori } = useLoaderData();
    const columns = [
        {
            field: 'nome',
            headerName: 'Nome',
            width: 180,
            editable: true
        },
        {
            field: 'descrizione',
            headerName: 'Descrizione',
            width: 180,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'tempodilavorazione',
            headerName: 'Tempo di lavorazione',
            type: 'number',
            width: 180,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'fornitoriid',
            headerName: 'Fornitore id',
            width: 180,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'fornitori',
            headerName: 'Fornitore',
            width: 180,
            type: 'singleSelect',
            valueOptions: fornitori.map((fornitore) => fornitore.nome),
            editable: true,
        },
    ];
    const rowArray = { id: 0, nome: '', descrizione: '', tempoDiLavorazione: 1, fornitoriId: '', fornitori: '', materialiPerLavorazione: '', isNew: true }

    return (
        <Grid dataArray={dataArray} columns={columns} rowArray={rowArray} controllerName={'lavorazioni'} />
    );
}

export default GridPage;
