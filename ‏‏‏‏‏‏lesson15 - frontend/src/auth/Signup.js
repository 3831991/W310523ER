import { Link, useNavigate } from 'react-router-dom';
import './User.css';
import { useState } from 'react';

export default function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
    });
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const signup = async ev => {
        ev.preventDefault();
        
        const res = await fetch("http://localhost:8989/signup", {
            credentials: 'include',
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            navigate('/');
        } else {
            setLoginError(await res.text());
        }
    }

    const dataChange = ev => {
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
                <h2>הרשמה</h2>

                <form onSubmit={signup}>
                    <label>
                        שם פרטי:
                        <input type="text" id='firstName' value={formData.firstName} onChange={dataChange} />
                    </label>

                    <label>
                        שם משפחה:
                        <input type="text" id='lastName' value={formData.lastName} onChange={dataChange} />
                    </label>

                    <label>
                        טלפון:
                        <input type="tel" id='phone' value={formData.phone} onChange={dataChange} />
                    </label>

                    <label>
                        אימייל:
                        <input type="email" id='email' value={formData.email} onChange={dataChange} />
                    </label>

                    <label>
                        סיסמה:
                        <input type="password" id='password' value={formData.password} onChange={dataChange} />
                    </label>

                    <button>הרשם</button>

                    { loginError ? <div className='fieldError'>{loginError}</div> : '' }
                </form>
            </div>

            <p className="signup">
                <Link to="/">להתחברות לחץ כאן</Link>
            </p>
        </>
    )
}