import React from 'react';
import { useLoaderData } from "react-router-dom";
import Services from '../Services/Services';
import Grid from '../components/GridComponent';

export async function loader() {
    const dataArray = await Services.get('fasi');
    const utenti = await Services.get('utenti');
    return { dataArray, utenti };
}

function GridPage() {
    const { dataArray, utenti } = useLoaderData();
    const columns = [
        {
            field: 'nome',
            headerName: 'Nome',
            width: 180,
            editable: true
        },
        {
            field: 'compito',
            headerName: 'Compito',
            width: 180,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'chilafa',
            headerName: 'Chi la fa',
            width: 180,
            type: 'singleSelect',
            valueOptions: utenti.map((utente) => utente.nome),
            editable: true,
        },
        {
            field: 'quando',
            headerName: 'Quando',
            type:'date',
            width: 180,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'fatto',
            headerName: 'Fatto',
            type:'boolean',
            width: 80,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
    ];
    const rowArray = { id: 0, nome: '', compito: '',chilafa:'', quando: '', fatto: false, isNew: true }

    return (
        <Grid dataArray={dataArray} columns={columns} rowArray={rowArray} controllerName={'fasi'} />
    );
}

export default GridPage;
