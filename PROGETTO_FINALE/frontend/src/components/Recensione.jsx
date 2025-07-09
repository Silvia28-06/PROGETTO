import React, { useState, useEffect } from 'react';

function Recensione({ recensione, currentUser, onDeleteRecensione }) {
    const [isAuthor, setIsAuthor] = useState(false);

    useEffect(() => {

        if (currentUser && currentUser.id === recensione.autore._id) {
            setIsAuthor(true);
        } else {
            setIsAuthor(false);
        }
    }, []);

    return (
        <div>
            <h2>{recensione.autore.username || 'Utente Anonimo'}</h2>
            <p>{recensione.testo}</p>
            {isAuthor && (
                <button onClick={() => onDeleteRecensione(recensione._id)}>
                    Cancella recensione
                </button>
            )}
        </div>
    );
}
export default Recensione