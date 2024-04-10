import React, { useState } from 'react';
import { useLoaderData, Link } from "react-router-dom";
import Services from '../Services/Services';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {CardActions,FormControlLabel,Checkbox} from '@mui/material';

import Grid from '@mui/material/Grid';

export async function loader() {
    const tipolavorazioni = await Services.get('tipolavorazione');
    const lavorazioni = await Services.get('lavorazioni');
    const utenti = await Services.get('utenti');
    const fornitori = await Services.get('fornitori');
    const fasi = await Services.get('fasi');
    return { tipolavorazioni, lavorazioni, utenti, fornitori, fasi };
}

// Funzione per formattare la data nel formato desiderato
function formatData2(dataString) {
    const data = new Date(dataString);
    const giorniSettimana = ['Domenica', 'Lunedi', 'Martedi', 'Mercoledi', 'Giovedi', 'Venerdi', 'Sabato'];
    const mesi = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
    const giornoSettimana = giorniSettimana[data.getDay()];
    const giorno = data.getDate();
    const mese = mesi[data.getMonth()];
    return `${giornoSettimana} ${giorno} ${mese}`;
}
function formatData(dataString) {
    const data = new Date(dataString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    };
    return data.toLocaleDateString('it-IT', options);
}

async function aggiornaFase2(fase) {
    fase.eseguita = !fase.eseguita;
    await Services.update('fasi', fase.id, fase);
    const updatedFasiLavorazione = fasi.map(f => f.id === fase.id ? fase : f);
    setFasiLavorazione(updatedFasiLavorazione);
}


function Dashboard() {
    const { tipolavorazioni, utenti, fornitori, lavorazioni, fasi } = useLoaderData();
    const [fasiLavorazione, setFasiLavorazione] = useState([]);

    // Verifica se tutti gli utenti sono soddisfatti
    const tuttiSoddisfatti = fornitori.length > 0 && utenti.length > 0 && tipolavorazioni.length > 0 && lavorazioni.length > 0;
    console.log(tuttiSoddisfatti)
    // Filtra le lavorazioni non completate
    const lavorazioniNonCompletate = lavorazioni.filter(lavorazione => !lavorazione.completata);

    // Mappa dei fornitori per nome
    const getColoreFornitore = (nome) => {
        // Trova il fornitore selezionato dal database utilizzando l'ID
        const fornitoreSelezionato = fornitori.find(fornitore => fornitore.nome === nome);
        // Se il fornitore selezionato non è stato trovato, restituisci una stringa vuota
        if (!fornitoreSelezionato) {
            return "#00ff00";
        }
        // Restituisci una stringa contenente il valore del colore per il fornitore selezionato
        return fornitoreSelezionato.colore
    };
    async function aggiornaFase(fase) {
        try {
            fase.eseguita = !fase.eseguita;
            await Services.update('fasi', fase.id, fase);
            const updatedFasiLavorazione = fasi.map(f => f.id === fase.id ? fase : f);
            setFasiLavorazione(updatedFasiLavorazione);
        } catch (error) {
            console.error(error);
        }
    }


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
                            const backgroundColor = getColoreFornitore(lavorazione.fornitore)
                            const fasiLavorazione = fasi.filter(fase => fase.lavorazioneId === lavorazione.id);
                            return (
                                <Grid item xs={2} key={lavorazione.id}>
                                    <Card sx={{ minWidth: 275, backgroundColor: backgroundColor }}>
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
                                            <p>Fasi</p>
                                        </CardActions>
                                        {fasiLavorazione.map(fase => (
                                            <Grid item xs={12} key={fase.id}>
                                                <Card sx={{ minWidth: 275 }}>
                                                    <CardContent>
                                                        <Typography component="div">
                                                            {fase.nome}
                                                        </Typography>
                                                        <Typography sx={{ mb: 0 }} color="text.secondary">
                                                            {fase.descrizione}
                                                        </Typography>
                                                        <FormControlLabel
                                                            control={<Checkbox checked={fase.eseguita} onChange={() => aggiornaFase(fase)} />}
                                                            label="Eseguita"
                                                        />
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
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
