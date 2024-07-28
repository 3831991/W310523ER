import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Users from './Users';

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
        </Routes>
    )
}
