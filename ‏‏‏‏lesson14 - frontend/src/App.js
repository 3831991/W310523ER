import { createContext, useEffect, useState } from 'react';
import './App.css';
import Router from './Router';
import Loader from './Loader';
import Login from './auth/Login';
import Logout from './auth/Logout';

export const GeneralContext = createContext();

function App() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
        
            const res = await fetch("http://localhost:8989/login", {
                credentials: 'include',
            });

            if (res.ok) {
                setUser(await res.json());
            } else {
                setUser();
            }

            setLoading(false);
        })()
    }, []);

    return (
        <GeneralContext.Provider value={{ setLoading, user, setUser }}>
            {
                user !== null &&
                <div className="App">
                    {user && <Logout />}
                    {user ? <Router /> : <Login />}
                </div>
            }
            {loading && <Loader />}
        </GeneralContext.Provider >
    );
}

export default App;
