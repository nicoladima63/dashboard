import React, { useEffect, useState } from 'react';
import { useLoaderData } from "react-router-dom";

import Services from '../Services/Services';


import Checkbox from '@mui/material/Checkbox';

export async function loader() {
    const fasi = await Services.get('fasi');
    const lavorazioni = await Services.get('lavorazioni');
    const fasitemplate = await Services.get('fasitemplate');
    const tipolavorazioni = await Services.get('tipolavorazione');
    const utenti = await Services.get('utenti');
    const fornitori = await Services.get('fornitori');

    return { fasi, lavorazioni, fasitemplate, tipolavorazioni, utenti, fornitori };

}
function Gestioni() {
    const { fasi, lavorazioni, fasitemplate, tipolavorazioni, utenti, fornitori } = useLoaderData();
    const [checked, setChecked] = React.useState(null);



    const lavorazioniAperte = lavorazioni.filter(lavorazione => !lavorazione.completata);
    const fasiAperte = fasi.filter(fase => !fase.eseguita);
    console.log(lavorazioniAperte);
    console.log(fasiAperte);


    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <>
            <p>GESTIONE TABELLE E AVVISI</p>
            <ul>
                {lavorazioniAperte.map(lavorazione => (
                    <li key={lavorazione.id}>{lavorazione.paziente}</li>
                ))}
            </ul>
            <hr />
            <ul>
                {fasiAperte ? (
                    <ul>
                        {fasiAperte.map(fase => (
                            <li key={fase.id}>{fase.nome}, {fase.chilafa}</li>
                        ))}
                    </ul>
                ) : (
                    <p>Caricamento fasi...</p>
                )}
            </ul>
        </>

    );
}

export default Gestioni;