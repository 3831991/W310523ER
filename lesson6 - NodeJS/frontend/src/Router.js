import { Route, Routes } from 'react-router-dom';
import Students from './Students';
import Average from './Average';
import Cites from './Cities';
import StudentGrades from './StudentGrades';

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<p>ברוכים הבאים!</p>} />
            <Route path="/students" element={<Students />} />
            <Route path="/average" element={<Average />} />
            <Route path="/cites" element={<Cites />} />
            <Route path="/student/:studentId/grades" element={<StudentGrades />} />
        </Routes>
    )
}
