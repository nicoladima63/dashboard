import React from 'react';
import { useLoaderData } from "react-router-dom";
import Services from '../Services/Services';
import Grid from '../components/GridComponent';

export async function loader() {
    const fornitori = await Services.get('fornitori');
    return fornitori;
}

function GridPage() {
    const fornitori = useLoaderData();
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
        <Grid dataArray={fornitori} columns={columns} rowArray={rowArray}/>
    );
}

export default GridPage;
