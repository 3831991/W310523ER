import { useEffect, useState } from 'react';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [isModal, setIsModal] = useState();
    const [newUser, setNewUser] = useState({

    });

    useEffect(() => {
        (async () => {
            const res = await fetch("http://localhost:8989/users", {
                credentials: 'include',
                headers: {
                    "Authorization": localStorage.getItem("token"),
                }
            });
    
            setUsers(await res.json());
        })()
    }, []);

    const remove = async id => {
        if (!window.confirm("Are you sure you want to remove this user?")) {
            return;
        }

        await fetch(`http://localhost:8989/users/${id}`, {
            credentials: 'include',
            method: "DELETE",
            headers: {
                "Authorization": localStorage.getItem("token"),
            }
        });

        setUsers(users.filter(u => u._id !== id));
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>שם פרטי</th>
                        <th>שם משפחה</th>
                        <th>אימייל</th>
                        <th>טלפון</th>
                        <th></th>
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
                                <td><button className='remove' onClick={() => remove(u._id)}>❌</button></td>
                            </tr>    
                        )
                    }
                </tbody>
            </table>

            {
                isModal &&
                <div className="modal-frame">
                    <div className="modal">
                        <header>
                            <button className="close" onClick={() => setIsModal(false)}>x</button>
                            <h2>הוספת משתמש</h2>
                        </header>

                        <section>
                            
                        </section>

                        <footer>
                            <button className="save">הוסף</button>
                        </footer>
                    </div>
                </div>
            }
        </>
    )
}
