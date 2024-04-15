import React, { useState } from 'react';
import { useLoaderData, Link } from "react-router-dom";
import Services from '../Services/Services';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { List, ListItem, ListItemIcon, ListItemText, Button, Divider, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
export async function loader() {
    const tipolavorazioni = await Services.get('tipolavorazione');
    const lavorazioni = await Services.get('lavorazioni');
    const utenti = await Services.get('utenti');
    const fornitori = await Services.get('fornitori');
    const fasi = await Services.get('fasi');
    return { tipolavorazioni, lavorazioni, utenti, fornitori, fasi };
}

// Funzione per formattare la data nel formato desiderato
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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


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
                    <h2 style={{ color: '#216477' }}>Lavorazioni da completare</h2>
                    <Grid container direction="row" alignItems="flex-start" spacing={1}>
                        <Grid item xs={2}>
                            <Item>
                                <List>
                                    <ListItem>
                                        <Button variant="contained" component={Link} to="/pages/lavorazioni">
                                            Aggiungi Lavorazione
                                        </Button>
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText primary='scadenze da fare' />
                                    </ListItem>
                                </List>
                            </Item>
                        </Grid>

                        <Grid item xs={10}>
                            {lavorazioniNonCompletate.map(lavorazione => {
                                const backgroundColor = getColoreFornitore(lavorazione.fornitore)
                                const fasiLavorazione = fasi.filter(fase => fase.lavorazioneId === lavorazione.id);
                                return (
                                        <Card key={lavorazione.id} sx={{ width: 300, mr: 1,mb:2, display:'inline-block',float:'left' }}>
                                            <CardContent sx={{ backgroundColor: backgroundColor }}>
                                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                    {lavorazione.fornitore}
                                                </Typography>
                                                <Typography variant="p" component="div">
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
                                            <Accordion disabled={lavorazione.completata}>
                                                <AccordionSummary>
                                                    <Typography variant="h6" component="div">
                                                        Fasi: {fasiLavorazione.filter(fase => fase.eseguita).length} / {fasiLavorazione.length}
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <List>
                                                        {fasiLavorazione.map(fase => (
                                                            <ListItem key={fase.id} disablePadding onClick={() => aggiornaFase(fase)}
                                                                sx={{
                                                                    backgroundColor: '#fff',
                                                                    '&:hover': {
                                                                        backgroundColor: '#e0e0e0',
                                                                    },
                                                                }}
                                                            >
                                                                <ListItemIcon>
                                                                    {fase.eseguita ? <CheckIcon /> : <CloseIcon />}
                                                                </ListItemIcon>
                                                                <ListItemText primary={fase.nome} />
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                </AccordionDetails>
                                            </Accordion>
                                        </Card>
                                );
                            })}
                        </Grid>
                    </Grid>

                </div>

            )}
        </>
    );
}

export default Dashboard;
