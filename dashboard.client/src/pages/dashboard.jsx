import React from 'react'
import { useLoaderData, Link } from "react-router-dom";
import Services from '../Services/Services'
import Home from '../components/home';

export async function loader() {
    const lavorazioni = await Services.get('lavorazioni');
    const utenti = await Services.get('utenti');
    const fornitori = await Services.get('fornitori');
    return { compiti, lavorazioni, utenti, fornitori };
}


function Dashboard() {
    const { lavorazioni, utenti, fornitori } = useLoaderData()

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
            {lavorazioni.length === 0 && (
                <div className='no-tasks'>
                    <p>Nessuna lavorazione inserits.</p>
                    <Link to="/pages/lavorazioni">Inserisci Lavorazione</Link>
                </div>
            )}
            {compiti.length === 0 ? (
                <div className='no-tasks'>
                    <p>Nessun Compito inserito.</p>
                    <Link to="/pages/compiti">Inserisci Compito</Link>
                </div>
            ) :
                <Home dataObj={ lavorazioni, utenti} />
            }



        </>
    )
}

export default Dashboard