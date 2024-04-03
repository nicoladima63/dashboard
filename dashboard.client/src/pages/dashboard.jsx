import React from 'react'
import { useLoaderData, Link } from "react-router-dom";
import Services from '../Services/Services'
import Home from '../components/home';

export async function loader() {
    const tipolavorazioni = await Services.get('tipolavorazione');
    const utenti = await Services.get('utenti');
    const fornitori = await Services.get('fornitori');
    return { tipolavorazioni, utenti, fornitori };
}


function Dashboard() {
    const { tipolavorazioni, utenti, fornitori } = useLoaderData()

    return (
        <>

            {fornitori.length === 0 && (
                <div className='no-tasks'>
                    <p>Nessun Fornitore Registrato.</p>
                    <Link to="/pages/fornitori">Regista Fornitore</Link>
                </div>
            )}
            {utenti.length === 0 && (
                <div className='no-tasks'>
                    <p>Nessun Utente Registrato.</p>
                    <Link to="/pages/utenti">Regista utente</Link>
                </div>
            )}
            {tipolavorazioni.length === 0 && (
                <div className='no-tasks'>
                    <p>Nessuna tipologia di lavorazione inserita.</p>
                    <Link to="/pages/tipolavorazione">Inserisci Lavorazione</Link>
                </div>
            )}
        </>
    )
}

export default Dashboard