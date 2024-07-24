import { useContext } from 'react';
import './User.css';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../App';

export default function Logout() {
    const navigate = useNavigate();
    const { setLoading, setUser, user } = useContext(GeneralContext);

    const logout = async () => {
        setLoading(true);

        await fetch("http://localhost:8989/logout", {
            credentials: 'include',
        });

        setUser();
        navigate('/');
        setLoading(false);
    }

    return (
        <p className='user'>
            {user.firstName} מחובר! 
            <button className="logout" onClick={logout}>התנתק</button>
        </p>
    )
}