import { Route, Routes } from 'react-router-dom';
import Students from './Students';
import Average from './Average';
import Cites from './Cities';

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<p>ברוכים הבאים!</p>} />
            <Route path="/students" element={<Students />} />
            <Route path="/average" element={<Average />} />
            <Route path="/cites" element={<Cites />} />
        </Routes>
    )
}
