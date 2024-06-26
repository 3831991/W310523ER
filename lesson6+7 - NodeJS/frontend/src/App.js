import { createContext, useState } from 'react';
import './App.css';
import Navbar from './Navbar';
import Router from './Router';
import Loader from './Loader';

export const GeneralContext = createContext();

function App() {
    const [loading, setLoading] = useState(false);

    return (
        <GeneralContext.Provider value={{ setLoading }}>
            <div className="App">
                <Navbar />
                <Router />
                {loading && <Loader />}
            </div>
        </GeneralContext.Provider >
    );
}

export default App;
