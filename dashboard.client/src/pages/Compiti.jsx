import React, { useState } from 'react';
import { useLoaderData, Link,Form } from "react-router-dom";
import Services from '../Services/Services';
import CompitiComponent from '../components/CompitiComponent';
import SelectSmall from '../components/SelectComponent'; // Importa il componente SelectSmall
import '../index.css';

export async function loader() {
    const compiti = await Services.get('compiti');
    const lavorazioni = await Services.get('lavorazioni');
    const utenti = await Services.get('utenti');
    return { compiti, lavorazioni };
}

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await Services.update('compiti', params.contactId, updates);
    return redirect(`/pages/dashboard/`);
}

function Compiti() {
    const { compiti, lavorazioni,utenti } = useLoaderData();
    const [nuovoCompito, setNuovoCompito] = useState({
        nome: '',
        completato: false,
        inseritoil: new Date().toISOString().split('T')[0],
        aggiornatoil: new Date().toISOString().split('T')[0],
        inseritoda: '',
        aggiornatoda: '',
        paziente: '',
        lavorazione: '',
        inconsegna: '',
    });

    async function inviaNuovoCompito() {
        try {
            // Imposta i valori selezionati nella parte dei dati del nuovo compito prima di inviare al server
            const compitoDaInviare = {
                ...nuovoCompito,
                lavorazione: lavorazioneSelezionata
            };
            await Services.create('compiti', compitoDaInviare);

            // Aggiorna lo stato dei compiti nel componente una volta completata l'aggiunta del nuovo compito
            // Puoi gestire questo aggiornamento in base alla tua logica specifica
        } catch (error) {
            console.error("Errore durante l'aggiunta del nuovo compito:", error);
        }
    }

    function handleSubmit(event) {
        event.preventDefault(); // Evita il comportamento predefinito di invio del form
        inviaNuovoCompito(); // Chiama la funzione per inviare il nuovo compito al server
    }

    return (
        <div>

            {compiti.length === 0 && (
                <div>
                    <Form method="post" id="contact-form" onSubmit={handleSubmit}>
                        <label>
                            <span>Nome:</span>
                            <input
                                placeholder="Inserisci il nome del compito"
                                aria-label="Nome del compito"
                                type="text"
                                name="nome"
                                value={nuovoCompito.nome}
                                onChange={(e) => setNuovoCompito({ ...nuovoCompito, nome: e.target.value })} />
                        </label>
                        <label>
                            <span>Paziente:</span>
                            <input
                                placeholder="Inserisci il nome del paziente"
                                aria-label="Nome del paziente"
                                type="text"
                                name="paziente"
                                value={nuovoCompito.paziente}
                                onChange={(e) => setNuovoCompito({ ...nuovoCompito, paziente: e.target.value })} />
                        </label>
                        <label>
                            <span>Inserito da:</span>
                            <SelectSmall
                                inputLabel="Inserito da"
                                value={nuovoCompito.inseritoda}
                                menuItems={utenti.map(utente => utente.nome)} // Passa l'array degli utenti come menuItems
                                onChange={(value) => setNuovoCompito({ ...nuovoCompito, inseritoda: value })}
                            />
                        </label>
                        <label>
                            <span>Tipo lavorazione:</span>
                            <SelectSmall
                                inputLabel="Tipo lavorazione"
                                value={nuovoCompito.lavorazione}
                                menuItems={lavorazioni.map(lavorazione => lavorazione.nome)} // Passa l'array dei nomi delle lavorazioni come menuItems
                                onChange={(value) => setNuovoCompito({ ...nuovoCompito, lavorazione: value })}
                            />
                        </label>
                        <label>
                            <span>Data di consegna:</span>
                            <input type="date" name="inconsegna" value={nuovoCompito.inconsegna} onChange={(e) => setNuovoCompito({ ...nuovoCompito, inconsegna: e.target.value })} />
                        </label>
                        <p>
                            <button type="submit">Salva</button>
                            <button type="button">Annulla</button>
                        </p>

                    </Form>
                </div>
            )}

            {lavorazioni.length === 0 && (
                <Link to="/pages/lavorazioni">
                    <button>
                        Aggiungi una nuova lavorazione
                    </button>
                </Link>
            )}

            {compiti.length > 0 && <CompitiComponent compiti={compiti} lavorazioni={lavorazioni} />}
        </div>
    );
}


export default Compiti;
