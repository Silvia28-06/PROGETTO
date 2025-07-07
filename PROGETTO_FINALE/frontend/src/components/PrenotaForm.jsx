import React, { useState } from "react";

function PrenotaForm({ campoId, onAnnulla }) {
  const [formData, setFormData] = useState(null);
//È una funzione riutilizzabile per ogni input. 
// Prende il name dell’input ("data" o "ora") e aggiorna solo quel campo.
// prev => ({ ...prev, [name]: value }) significa: copia lo stato precedente e aggiorna solo il campo modificato. 
  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  //Passa i dati inseriti nello slot e l’id del campo alla funzione onConferma --> che poi invierà tutto al backend.
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Combina giorno e orario nello slot tipo "17/07|10:00-12:00"
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`${API_BASE_URL}/campi/prenotazioni/${campoId}`, {
                method: 'POST',
                headers: {'Authorization': `Bearer ${accessToken}`},
                body: JSON.stringify({formData}),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.message || `Errore prenotazione: ${response.status}`);
            }
            setCurrentView("pagHome");
            setCampoPrenotato(null);
            console.log("Campo prenotato con successo!")
        } catch (error) {
            console.error("Errore eliminazione recensione:", error);
        }
    };


  //Chiama onAnnulla, che è in App.jsx, cambia la view e torna alla homepage.
  const handleCancel = (e) => {
    e.preventDefault();
    onAnnulla();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Prenota Campo</h2>

{/* <select name="date" value={formData.data} onChange={handleChange} required>--->
 serve a mostrare un menu a tendina per selezionare un giorno e a collegare il valore scelto allo stato di React (formData.data).
 STESSA COSA FATTA GIU PER LA DATA*/}
      <label> Data e ora: </label>
        <select name="date" value={formData.data} onChange={handleChange} required>
          <option value="">-- Seleziona giorno --</option>
          <option value="17/07">17/07 11:00-12:00</option>
          <option value="17/07">17/07 12:00-13:00</option>
          <option value="18/07">18/07 11:00-12:00</option>
          <option value="18/07">18/07 12:00-13:00</option>
          <option value="19/07">19/07 11:00-12:00</option>
          <option value="19/07">19/07 12:00-13:00</option>
          <option value="20/07">20/07 11:00-12:00</option>
          <option value="20/07">20/07 12:00-13:00</option>
          <option value="21/07">21/07 11:00-12:00</option>
          <option value="21/07">21/07 12:00-13:00</option>
          <option value="22/07">22/07 11:00-12:00</option>
          <option value="22/07">22/07 12:00-13:00</option>
          <option value="23/07">23/07 11:00-12:00</option>
          <option value="23/07">23/07 12:00-13:00</option>
          <option value="24/07">24/07 11:00-12:00</option>
          <option value="24/07">24/07 12:00-13:00</option>
        </select>
      <br />
      <button type="submit">CONFERMA PRENOTAZIONE</button>
      <button onClick={handleCancel}>ANNULLA</button>
    </form>
  );
};

export default PrenotaForm;