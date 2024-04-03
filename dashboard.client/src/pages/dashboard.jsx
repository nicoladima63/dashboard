import React from 'react';
import { useLoaderData, Link } from "react-router-dom";
import Services from '../Services/Services';
import Home from '../components/home';

export async function loader() {
    const tipolavorazioni = await Services.get('tipolavorazione');
    const lavorazioni = await Services.get('lavorazioni');
    const utenti = await Services.get('utenti');
    const fornitori = await Services.get('fornitori');
    return { tipolavorazioni, lavorazioni, utenti, fornitori };
}

function Dashboard() {
    const { tipolavorazioni, utenti, fornitori, lavorazioni } = useLoaderData();

    // Verifica se tutti gli utenti sono soddisfatti
    const tuttiSoddisfatti = fornitori.length > 0 && utenti.length > 0 && tipolavorazioni.length > 0 && lavorazioni.length > 0;
    console.log(tuttiSoddisfatti)
    // Filtra le lavorazioni non completate
    const lavorazioniNonCompletate = lavorazioni.filter(lavorazione => lavorazione.completata === false);

    console.log(lavorazioniNonCompletate)
    console.log(lavorazioni)
    return (
        <>
            {!tuttiSoddisfatti && (
                <div className='no-tasks'>
                    <p>Alcuni requisiti non sono soddisfatti.</p>
                </div>
            )}

            {tuttiSoddisfatti && (
                <div>
                    <h2 style={{ color: '#216477' }}>Lavorazioni non completate</h2>
                    <ul>
                        {lavorazioniNonCompletate.map(lavorazione => (
                            <li style={{ color: '#216477' }} key={lavorazione.id}>{lavorazione.tipoLavorazione} - {lavorazione.fornitore}</li>
                        ))}
                    </ul>
                    <Link to="/pages/lavorazioni">Aggiungi Lavorazione</Link>
                </div>
            )}
        </>
    );
}

export default Dashboard;
