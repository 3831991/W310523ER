import { useEffect, useState } from 'react';

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await fetch("http://localhost:8989/users", {
                credentials: 'include',
            });
    
            setUsers(await res.json());
        })()
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>שם פרטי</th>
                    <th>שם משפחה</th>
                    <th>אימייל</th>
                    <th>טלפון</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((u, i) => 
                        <tr key={u._id}>
                            <td>{i + 1}</td>
                            <td>{u.firstName}</td>
                            <td>{u.lastName}</td>
                            <td>{u.email}</td>
                            <td>{u.phone}</td>
                        </tr>    
                    )
                }
            </tbody>
        </table>
    )
}
