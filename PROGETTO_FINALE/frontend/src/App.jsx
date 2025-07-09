import React, { useState, useEffect } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import RegForm from './components/RegForm';
import Campo from './components/Campo';
import PrenotaForm from './components/PrenotaForm';
import Navbar from "./components/Navbar";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function App() {
    // Hook useState per gestire lo stato dell'utente loggato
    const [currentUser, setCurrentUser] = useState(null);
    // Stato per la lista dei campi
    const [campi, setCampi] = useState([]);
    // Stato per la lista delle recensioni
    const [recensioni, setRecensioni] = useState([]);
    // Stato per gestire la pagina fornita all'utente
    const [currentView, setCurrentView] = useState("pagIniziale");
    const [campoPrenotato, setCampoPrenotato] = useState(null);

    useEffect(() => {
    }, []);

    const handleRegisterSubmit = async (username, email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(username, email, password),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message || `Errore autenticazione: ${response.status}`);
            }

            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('user', JSON.stringify(data.user));
            setCurrentUser(data.user);
            setCurrentView("pagHome");

            try {
                const campiResponse = await fetch(`${API_BASE_URL}/campi`);
                const campiData = await campiResponse.json();
                if (campiResponse.ok) setCampi(campiData.campi || []);
                else console.error("Errore ricaricamento campi dopo registrazione");
            } catch (e) {
                console.error("Errore fetch campi dopo registrazione:", e);
            }
            try {
                const recensioniResponse = await fetch(`${API_BASE_URL}/recensioni`);
                const recensioniData = await recensioniResponse.json();
                if (recensioniResponse.ok) setRecensioni(recensioniData.recensioni || []);
                else console.error("Errore ricaricamento recensioni dopo registrazione");
            } catch (e) {
                console.error("Errore fetch recensioni dopo registrazione:", e);
            }

        } catch (error) {
            console.error(`Errore API per /auth/register:`, error);
        }
    };

    const handleLoginSubmit = async (email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(email, password),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message || `Errore autenticazione: ${response.status}`);
            }

            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('user', JSON.stringify(data.user));
            setCurrentUser(data.user);
            setCurrentView("pagHome");

            try {
                const campiResponse = await fetch(`${API_BASE_URL}/campi`);
                const campiData = await campiResponse.json();
                if (campiResponse.ok) setCampi(campiData.campi || []);
                else console.error("Errore ricaricamento campi dopo login");
            } catch (e) {
                console.error("Errore fetch campi dopo login:", e);
            }
            try {
                const recensioniResponse = await fetch(`${API_BASE_URL}/recensioni`);
                const recensioniData = await recensioniResponse.json();
                if (recensioniResponse.ok) setRecensioni(recensioniData.recensioni || []);
                else console.error("Errore ricaricamento recensioni dopo login");
            } catch (e) {
                console.error("Errore fetch recensioni dopo login:", e);
            }

        } catch (error) {
            console.error(`Errore API per /auth/login:`, error);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch(`${API_BASE_URL}/auth/logout`, {method: 'POST', credentials: 'include'});
        } catch (e) {
            console.error("Logout API fallito, procedo con logout client:", e);
        }
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        setCurrentUser(null);
        setCurrentView("pagIniziale");
        setCampi([]);
        setRecensioni([]);
    };

    const onRecensioneCreated = function (newRecensioneData) {
        setRecensioni(prevRecensioni => [...prevRecensioni, newRecensioneData.recensione]);
    };


    const handleDeleteRecensione = async (recensioneId) => {
        if (!window.confirm("Sei sicuro di voler eliminare questa recensione?")) return;
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`${API_BASE_URL}/campi/recensioni/${recensioneId}`, {
                method: 'DELETE',
                headers: {'Authorization': `Bearer ${accessToken}`},
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.message || `Errore eliminazione: ${response.status}`);
            }
            setRecensioni(prevRecensioni => prevRecensioni.filter(recensione => recensione._id !== recensioneId));
        } catch (error) {
            console.error("Errore eliminazione recensione:", error);
        }
    };

    const handlePrenota = function (campoId) {
        setCurrentView("pagPrenotazione");
        setCampoPrenotato(campoId);
    }

    const handleAnnulla = function () {
        setCurrentView("pagHome");
        setCampoPrenotato(null);
    };

    if (currentView == "pagIniziale") {
        return (
            <div className="container-form">
                <span class="main-title" id="arancione">"MSG"</span><br></br>
                 <span class="main-title" id="giallo">CENTRO SPORTIVO BARI</span>
                
                <div id="registrati_div">
                    <h2 className="form-title">REGISTRATI</h2> 
                <RegForm
                    onRegisterSubmit={handleRegisterSubmit}
                /></div>
                <div id="accedi_div" >
                    <h2 className="form-title">ACCEDI</h2>
                <LoginForm
                    onSubmitForm={handleLoginSubmit}
                /></div>
            </div>
        );
    }
{/*key={campo._id}*/}
    if (currentView == "pagHome") {
        return (
            <div className="container">
                <h1>MSG Centro Sportivo</h1>,
                <Navbar
                    onLogout={handleLogout}
                />,
                <h2>I nostri campi</h2>,
                {campi.map(campo => (
                    <Campo
                        
                        key={campo._id}
                        campo={campo}
                        currentUser={currentUser}
                        recensioni={recensioni}
                        onRecensioneCreated={onRecensioneCreated}
                        onDeleteRecensione={handleDeleteRecensione}
                        onPrenota={handlePrenota}
                    />
                ))}
            </div>
        )
    }

    return (
        <div className="container">
            <h1>MSG Centro Sportivo</h1>
            <Navbar
                onLogout={handleLogout}
            />
            <PrenotaForm
                campoId={campoPrenotato}
                onAnnulla={handleAnnulla}
            />
        </div>
    )
}

export default App;
