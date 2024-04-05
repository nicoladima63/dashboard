import React from 'react';
import { useLoaderData } from "react-router-dom";
import Services from '../Services/Services';
import Grid from '../components/GridComponent';

export async function loader2() {
    const dataArray = await Services.get('fasi');
    const utenti = await Services.get('utenti');
    const lavorazioni = await Services.get('lavorazioni');
    const tipolavorazioni = await Services.get('tipolavorazione');
    return { dataArray, utenti, lavorazioni, tipolavorazioni };
}

export function loader() {
    let dataArray, utenti, lavorazioni, tipolavorazioni;

    return Services.get('fasi')
        .then(data => {
            dataArray = data;
            console.log('data', data);
            return Services.get('utenti');
        })
        .then(data => {
            utenti = data;
            console.log('data', data);
            return Services.get('lavorazioni');
        })
        .then(data => {
            lavorazioni = data;
            console.log('data', data);
            return Services.get('tipolavorazione');
        })
        .then(data => {
            tipolavorazioni = data;
            console.log('data', data);
            return { dataArray, utenti, lavorazioni, tipolavorazioni };
        })
        .catch(error => {
            console.error('Errore durante il caricamento dei dati:', error);
            throw error; // Rilancia l'errore per gestirlo più avanti
        });
}


function GridPage() {
    const { dataArray, utenti, lavorazioni, tipolavorazioni } = useLoaderData();
    //console.log('fasi', dataArray);
    //console.log('utenti', utenti);
    //console.log('lavorazioni', lavorazioni);
    //console.log('tipolavorazioni', tipolavorazioni);

    const columns = [
        {
            field: 'lavorazione',
            headerName: 'Lavorazione',
            width: 180,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'nome',
            headerName: 'Nome',
            width: 180,
            editable: true
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
            field: 'fatto',
            headerName: 'Fatto',
            type:'boolean',
            width: 80,
            align: 'center',
            headerAlign: 'center',
            editable: true,
        },
    ];
    const rowArray = { id: 0, nome: '', compito: '',chilafa:'', quando: '', fatto: false, isNew: true }
    return (
        <Grid dataArray={dataArray} columns={columns} rowArray={rowArray} controllerName={'fasi'} />
    );
}

export default GridPage;
