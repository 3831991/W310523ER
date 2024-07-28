import { useContext } from 'react';
import './User.css';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../App';

export default function Logout() {
    const navigate = useNavigate();
    const { setUser, user } = useContext(GeneralContext);

    const logout = () => {
        localStorage.removeItem('token');
        setUser();
        navigate('/');
    }

    return (
        <p className='user'>
            {user.firstName} מחובר! 
            <button className="logout" onClick={logout}>התנתק</button>
        </p>
    )
}