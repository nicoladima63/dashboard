import React from 'react';
import { useLoaderData } from "react-router-dom";
import Services from '../Services/Services';
import Grid from '../components/GridComponent';

export async function loader() {
    const dataArray = await Services.get('utenti');
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
    ];
    const rowArray = { id: 0, nome: '', isNew: true }

    return (
        <Grid dataArray={dataArray} columns={columns} rowArray={rowArray} controllerName={'utenti'} />
    );
}

export default GridPage;
