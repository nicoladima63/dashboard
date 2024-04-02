import React from 'react'
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill }from 'react-icons/bs'
import IconButton from '@mui/material/Button';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Link } from 'react-router-dom';

function Home({ dataObj }) {
    const { lavorazioni, utenti } = {dataObj}
    return (
        <main>
            <div className='main-title'>
                <h3>DASHBOARD</h3>
            </div>

            {lavorazioni.length === 0 ? (
                <div className='no-tasks'>
                    <p>Nessuna lavorazione inserita.</p>
                    <Link to="/pages/lavorazioni">NUOVA lavorazione</Link>
                </div>
            ) : (
                <div className='main-cards'>
                        {lavorazioni.map((lavorazione) => {
                        return (
                            <div className='card' key={lavorazione.id} style={{ backgroundColor: lavorazione.colore }}>
                                <div className='card-inner'>
                                    <h3>{lavorazione.paziente}</h3>
                                    <BsFillArchiveFill className='card_icon' />
                                </div>
                                <p>inserito il: {lavorazione.datainserimento}</p>
                                <p>tipo di lavorazione:{lavorazione.tipolavorazione}</p>
                                <p>data consegna:{lavorazione.dataconsegna}</p>

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
