import { createContext, useState } from 'react';
import './App.css';
import Router from './Router';
import Loader from './Loader';
import Login from './auth/Login';
import Logout from './auth/Logout';

export const GeneralContext = createContext();

function App() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();

    return (
        <GeneralContext.Provider value={{ setLoading, user, setUser }}>
            <div className="App">
                {user && <Logout />}
                {user ? <Router /> : <Login />}
                {loading && <Loader />}
            </div>
        </GeneralContext.Provider >
    );
}

export default App;
