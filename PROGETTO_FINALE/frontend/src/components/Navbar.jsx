import React from 'react';


function Navbar({ handleLogout }) {
    return (
        <div>
        <h1>MSG centro sportivo</h1>
        <nav className="navbar">
            <ul>
                <li><a href="/">Home</a></li>
                <li>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
      </div>
    );
}

export default Navbar;