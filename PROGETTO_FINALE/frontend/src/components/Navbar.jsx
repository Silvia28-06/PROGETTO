import React from 'react';


function Navbar({ handleLogout, handleAnnulla }) {
    return (
        <nav className="navbar">
            <button id="home-button" onClick={handleAnnulla}>
                        HOME
                    </button>

                    <button id="logout-button" onClick={handleLogout}>
                        LOGOUT
                    </button>
        </nav>
    );
}

export default Navbar;
