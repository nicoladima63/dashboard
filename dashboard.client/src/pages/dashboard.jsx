import React from 'react';
import { useLoaderData, Link } from "react-router-dom";
import Services from '../Services/Services';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

export async function loader() {
    const tipolavorazioni = await Services.get('tipolavorazione');
    const lavorazioni = await Services.get('lavorazioni');
    const utenti = await Services.get('utenti');
    const fornitori = await Services.get('fornitori');
    return { tipolavorazioni, lavorazioni, utenti, fornitori };
}

// Funzione per formattare la data nel formato desiderato
function formatData(dataString) {
    const data = new Date(dataString);
    const giorniSettimana = ['Domenica', 'Lunedi', 'Martedi', 'Mercoledi', 'Giovedi', 'Venerdi', 'Sabato'];
    const mesi = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
    const giornoSettimana = giorniSettimana[data.getDay()];
    const giorno = data.getDate();
    const mese = mesi[data.getMonth()];
    return `${giornoSettimana} ${giorno} ${mese}`;
}

function Dashboard() {
    const { tipolavorazioni, utenti, fornitori, lavorazioni } = useLoaderData();

    // Verifica se tutti gli utenti sono soddisfatti
    const tuttiSoddisfatti = fornitori.length > 0 && utenti.length > 0 && tipolavorazioni.length > 0 && lavorazioni.length > 0;
    console.log(tuttiSoddisfatti)
    // Filtra le lavorazioni non completate
    const lavorazioniNonCompletate = lavorazioni.filter(lavorazione => !lavorazione.completata);

    // Mappa dei fornitori per nome
    const fornitoriMap = fornitori.reduce((map, forn) => {
        map[forn.colore] = forn;
        return map;
    }, {});

    return (
        <>
            {!tuttiSoddisfatti && (
                <div className='no-tasks'>
                    <p>Alcuni requisiti non sono soddisfatti.</p>
                </div>
            )}

            {tuttiSoddisfatti && (
                <div>
                    <Link to="/pages/lavorazioni">Aggiungi Lavorazione</Link>
                    <br />
                    <h2 style={{ color: '#216477' }}>Lavorazioni da completare</h2>
                    <Grid container spacing={6}>

                        {lavorazioniNonCompletate.map(lavorazione => {
                            const fornitore = fornitoriMap[lavorazione.fornitore];
                            const backgroundColor = fornitore ? fornitore.colore : '#216477'; // Colore di default se il fornitore non ha un colore specificato
                            return (
                                <Grid item xs={2} key={lavorazione.id}>
                                    <Card sx={{ minWidth: 175, backgroundColor }}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                {lavorazione.fornitore}
                                            </Typography>
                                            <Typography variant="h6" component="div">
                                                {lavorazione.paziente}
                                            </Typography>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                {lavorazione.tipoLavorazione}
                                            </Typography>
                                            <Typography variant="body2">
                                                inserita <br />{formatData(lavorazione.dataInserimento)}
                                                <br /><br />
                                                in consegna per: <br />{formatData(lavorazione.dataconsegna)}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">Learn More</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </div>

            )}
        </>
    );
}

export default Dashboard;
