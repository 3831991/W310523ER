import { Link } from 'react-router-dom';
import './User.css';
import { useContext, useState } from 'react';
import { GeneralContext } from '../App';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loginError, setLoginError] = useState('');
    const { setLoading, setUser } = useContext(GeneralContext);

    const login = async ev => {
        ev.preventDefault();
        setLoading(true);
        setLoginError('');
        
        const res = await fetch("http://localhost:8989/login", {
            credentials: 'include', // מאפשרים שימוש בעוגיות
            method: "POST",
            headers: {
                'Content-type': 'application/json' // התוכן שאנו שולחים הוא מסוג ג'סון
            },
            body: JSON.stringify(formData), // התוכן
        });

        if (res.ok) {
            const user = await res.json();

            setUser(user);
        } else {
            setLoginError(await res.text());
        }

        setLoading(false);
    }

    const handleError = ev => {
        const { id, value } = ev.target;

        const obj = {
            ...formData,
            [id]: value,
        };

        setFormData(obj);
    }

    return (
        <>
            <div className="Login smallFrame">
                <h2>התחברות</h2>
                
                <form onSubmit={login}>
                    <label>
                        אימייל:
                        <input type="email" id='email' value={formData.email} onChange={handleError} />
                    </label>

                    <label>
                        סיסמה:
                        <input type="password" id='password' value={formData.password} onChange={handleError} />
                    </label>

                    <button>התחבר</button>

                    { loginError ? <div className='fieldError'>{loginError}</div> : '' }
                </form>
            </div>

            <p className="signup">
                <Link to="/signup">להרשמה לחץ כאן</Link>
            </p>
        </>
    )
}