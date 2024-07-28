import { createContext, useEffect, useState } from 'react';
import './App.css';
import Router from './Router';
import Loader from './Loader';
import Login from './auth/Login';
import Logout from './auth/Logout';
import { jwtDecode } from 'jwt-decode';

export const GeneralContext = createContext();

function App() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const user = jwtDecode(token);
            setUser(user);
        } else {
            setUser();
        }
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
