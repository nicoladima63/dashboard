import React, {useEffect } from 'react';
import { useLoaderData } from "react-router-dom";
import Services from '../Services/Services';
import Grid from '../components/GridComponent';


function DataGridDetails({ utenti, tipolavorazioni, lavorazioneid, fasi, fasitemplate ,tipoLavorazioneId}) {
    //console.log('tipolavorazionioptions',tipolavorazioni)
    //console.log('utentiOptions',utenti)
    //console.log('fasi', fasi)
    //console.log('fasitemplate', fasitemplate)
    //console.log('lavorazioneid', lavorazioneid)
    //console.log('tipolavorazioneid', tipoLavorazioneId)

    const dataArray = fasitemplate.filter((fase) => fase.tipoLavorazioneId === tipoLavorazioneId);
    /*
    let dataArray = [];
     dataArray=fasitemplate.forEach((fase) => {
        if (fase.tipoLavorazioneId === lavorazioneid) {
            dataArray.push(lavorazione);
        }
    });
    */
    //console.log('grid details dataArray', dataArray)
    const utentiOptions = utenti.map((utente) => utente.nome);
    const tipoLavorazioniOptions = tipolavorazioni.map((lavorazione) => lavorazione.nome); // Modifica


    const columns = [
        {
            filed: 'tipoLavorazioneId',
            headerName: 'ID',
            width: 70,
            align: 'center',
            headerAlign: 'center',

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
            field: 'eseguita',
            headerName: 'Eseguita',
            type: 'boolean',
            width: 80,
            align: 'center',
            headerAlign: 'center',
            editable: true,
        },
    ];
    const rowArray = { id: 0,tipoLavorazioneId: tipoLavorazioneId, nome: '', chilafa: '', quando: new Date(), eseguita: false, isNew: true }
    return (
        <Grid dataArray={dataArray} columns={columns} rowArray={rowArray} controllerName={'fasi'} />
    );
}

export default DataGridDetails;

