import React from 'react'
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill }from 'react-icons/bs'
import IconButton from '@mui/material/Button';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Link } from 'react-router-dom';

function Home({ compiti }) {
    return (
        <main>
            <div className='main-title'>
                <h3>DASHBOARD</h3>
            </div>

            {compiti.length === 0 ? (
                <div className='no-tasks'>
                    <p>Nessun compito inserito.</p>
                    <Link to="/pages/compiti">Inserisci Compito</Link>
                </div>
            ) : (
                <div className='main-cards'>
                    {compiti.map((compito) => {
                        return (
                            <div className='card' key={compito.id} style={{ backgroundColor: compito.colore }}>
                                <div className='card-inner'>
                                    <h3>{compito.nome}</h3>
                                    <BsFillArchiveFill className='card_icon' />
                                </div>
                                <p>inserito il: {compito.inseritoil}, da: {compito.inseritoda}</p>
                                <p>aggiornato il:{compito.aggiornatoil} da: {compito.aggiornatoda}</p>
                                <p>tipo lavoro:{compito.lavoraione}</p>
                                <p>data consegna:{compito.inconsegna}</p>

                                <h4>{compito.completato ? <DoneAllIcon /> : <RemoveDoneIcon />}</h4>
                                <BsFillGrid3X3GapFill className='card_icon' />
                                <IconButton aria-label="delete" size="large">
                                    <CheckCircleOutlineIcon variant="filled" className='card_icon' />
                                </IconButton>
                            </div>
                        );
                    })}
                </div>
            )}
        </main>
    )
}

export default Home;
