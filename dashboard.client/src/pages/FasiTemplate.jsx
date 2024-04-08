import React from 'react';
import { useLoaderData } from "react-router-dom";
import Services from '../Services/Services';
import MasterDEtails from '../components/MasterDetailsComponent';

export async function loader() {
    const fasitemplate = await Services.get('fasitemplate');
    const utenti = await Services.get('utenti');
    const lavorazioni = await Services.get('lavorazioni');
    const tipolavorazioni = await Services.get('tipolavorazione');
    return { fasitemplate, utenti, lavorazioni, tipolavorazioni };
}



function GridPage() {
    const { fasitemplate, utenti, lavorazioni, tipolavorazioni } = useLoaderData();
    return (
        <MasterDEtails fasi={fasitemplate} utenti={utenti} lavorazioni={lavorazioni} tipolavorazioni={tipolavorazioni} />
    );
}

export default GridPage;
