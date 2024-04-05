import React from 'react';
import { useLoaderData } from "react-router-dom";
import Services from '../Services/Services';
import Grid from '../components/GridComponent';

export async function loader() {
    const dataArray = await Services.get('fasi');
    const utenti = await Services.get('utenti');
    const lavorazioni = await Services.get('lavorazioni');
    const tipolavorazioni = await Services.get('tipolavorazione');
    return { dataArray, utenti, lavorazioni, tipolavorazioni };
}



function GridPage() {
    const { dataArray, tipolavorazioni,utenti } = useLoaderData();
    console.log('fasi', dataArray);
    //console.log('utenti', utenti);
    //console.log('lavorazioni', lavorazioni);
    //.log('tipolavorazioni', tipolavorazioni);
    const utentiOptions = utenti.map((utente) => utente.nome);
    //const tipoLavorazioniOptions = tipolavorazioni.map((lavorazione) => lavorazione.nome); // Modifica
    const tipoLavorazioniOptions = tipolavorazioni.map((lavorazione) => {
        return {
            value: lavorazione.id, // Usa l'ID univoco come valore
            label: lavorazione.nome, // Usa il nome come testo da visualizzare
        };
    });
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 80,
            editable: false
        },
        {
            field: 'tipoLavorazioneId',
            headerName: 'tipoLavorazioneId',
            width: 80,
            editable: false
        },
        {
            field: 'tipoLavorazione',
            headerName: 'Tipo Lavorazione',
            width: 280,
            type: 'singleSelect',
            //valueOptions: tipoLavorazioniOptions,
            editorComponent: () => <Select options={tipoLavorazioniOptions} value={tipoLavorazione} />,
            editable: true,
        },
        {
            field: 'nome',
            headerName: 'Nome fase',
            width: 180,
            editable: true
        },
        {
            field: 'chilafa',
            headerName: 'Chi la fa',
            width: 180,
            type: 'singleSelect',
            valueOptions: utentiOptions,
            editable: true,
        },
        {
            field: 'quando',
            headerName: 'Quando',
            type: 'date',
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
            type: 'boolean',
            width: 80,
            align: 'center',
            headerAlign: 'center',
            editable: true,
        },
    ];
    const rowArray = { id: 0, tipoLavorazioneId: 0, tipoLavorazione: '', nome: '', chilafa: '', quando: new Date(), fatto: false, isNew: true }
    return (
        <Grid dataArray={dataArray} columns={columns} rowArray={rowArray} controllerName={'fasi'} />
    );
}

export default GridPage;
