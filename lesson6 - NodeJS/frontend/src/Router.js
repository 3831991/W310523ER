import { Route, Routes } from 'react-router-dom';
import Students from './Students';

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<p>ברוכים הבאים!</p>} />
            <Route path="/students" element={<Students />} />
        </Routes>
    )
}
