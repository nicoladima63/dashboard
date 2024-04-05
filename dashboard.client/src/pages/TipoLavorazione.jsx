import React from 'react';
import { useLoaderData } from "react-router-dom";
import Services from '../Services/Services';
import Grid from '../components/GridComponent';

export async function loader() {
    const dataArray = await Services.get('tipolavorazione');
    const fornitori = await Services.get('fornitori');
    return { dataArray, fornitori };
}

function GridPage() {
    const { dataArray, fornitori } = useLoaderData();
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 80,
            editable: false
        },
        {
            field: 'fornitore',
            headerName: 'Fornitore',
            width: 180,
            type: 'singleSelect',
            valueOptions: fornitori.map((fornitore) => fornitore.nome),
            editable: true,
        },
        {
            field: 'nome',
            headerName: 'Nome',
            width: 180,
            editable: true
        },
        {
            field: 'descrizione',
            headerName: 'Descrizione',
            width: 300,
            editable: true
        },
    ];
    const rowArray = { id: 0,fornitore:'', nome: '',descrizione:'', isNew: true }

    return (
        <Grid dataArray={dataArray} columns={columns} rowArray={rowArray} controllerName={'tipolavorazione'} />
    );
}

export default GridPage;

