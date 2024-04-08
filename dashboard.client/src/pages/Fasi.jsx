import React from 'react';
import { useLoaderData } from "react-router-dom";
import Services from '../Services/Services';
import MasterDEtails from '../components/MasterDetailsComponent';

export async function loader() {
    const fasi = await Services.get('fasi');
    const utenti = await Services.get('utenti');
    const lavorazioni = await Services.get('lavorazioni');
    const tipolavorazioni = await Services.get('tipolavorazione');
    return { fasi, utenti, lavorazioni, tipolavorazioni };
}



function GridPage() {
    const { fasi, utenti, lavorazioni, tipolavorazioni } = useLoaderData();
    return (
        <MasterDEtails fasi={fasi} utenti={utenti} lavorazioni={lavorazioni} tipolavorazioni={tipolavorazioni}  />
    );
}

export default GridPage;
