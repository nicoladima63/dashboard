import React from 'react';
import { useLoaderData, Link, Form } from "react-router-dom";
export async function loader() {
    const utenti = await Services.get('utenti');
    return { utenti };
}

function Utenti() {
    const utenti = userLoaderData();
    const [nuovoUtente, setNuovoUtente] = React.useState({});
  return (
      <>
          {utenti.length === 0 && (
              <div>
                  <Form method="post" id="contact-form">
                      <label>
                          <span>Nome:</span>
                          <input
                              placeholder="Inserisci il nome dell\'utente"
                              aria-label="Nome dell\'utente"
                              type="text"
                              name="nome"
                              value={nuovoCompito.nome}
                              onChange={(e) => setNuovoUtente({ ...nuovoUtente, nome: e.target.value })} />
                      </label>
                      <p>
                          <button type="submit">Salva</button>
                          <button type="button">Annulla</button>
                      </p>

                  </Form>
              </div>
          )}

      </>
  );
}

export default Utenti;