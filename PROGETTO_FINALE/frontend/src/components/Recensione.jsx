import React, { useState, useEffect } from 'react';

function Recensione({ recensione, currentUser, deleteRecensione }) {
    const [isAuthor, setIsAuthor] = useState(false);

    useEffect(() => {

        if (currentUser && currentUser.id === recensione.userID) {
            setIsAuthor(true);
        } else {
            setIsAuthor(false);
        }
    }, [currentUser, recensione.userID]);

    return (
        <div>
            <h2>{recensione.userID}</h2>
            <p>{recensione.testo}</p>
            {isAuthor && (
                <button onClick={() => deleteRecensione(recensione.id)}>
                    Cancella recensione
                </button>
            )}
        </div>
    );
}
export default Recensione