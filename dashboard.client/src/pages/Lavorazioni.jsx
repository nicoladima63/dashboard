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

    // Creazione delle opzioni per la Select del fornitore e della tipolavorazione
    const fornitoriOptions = fornitori.map((fornitore) => fornitore.nome);
    const tipolavorazioniOptions = tipolavorazioni.map((tipolavorazione) => tipolavorazione.nome);


    const columns = [
        {
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
        <Grid dataArray={dataArray} columns={columns} rowArray={rowArray} controllerName={'lavorazioni'} />
    );
}

export default GridPage;
