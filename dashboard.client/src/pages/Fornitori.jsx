import React from 'react';
import { useLoaderData } from "react-router-dom";
import Services from '../Services/Services';
import Grid from '../components/GridComponent';

export async function loader() {
    const dataArray = await Services.get('fornitori');
    return dataArray;
}

function GridPage() {
    const dataArray = useLoaderData();
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
    ];
    const rowArray = { id: 0, nome: '', email: '', url: '', telefono: '', colore: '', lavorazioniFornite: '', isNew: true }

    return (
        <Grid dataArray={dataArray} columns={columns} rowArray={rowArray} controllerName={ 'fornitori'} />
    );
}

export default GridPage;
