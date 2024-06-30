import { Route, Routes } from 'react-router-dom';
import Students from './Students';
import Average from './Average';
import Cites from './Cities';
import StudentGrades from './StudentGrades';
import Dashboard from './Dashboard';

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/average" element={<Average />} />
            <Route path="/cites" element={<Cites />} />
            <Route path="/student/:studentId/grades" element={<StudentGrades />} />
        </Routes>
    )
}
