import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { GeneralContext } from './App';

export default function Students() {
    const [students, setStudents] = useState([]);
    const { setLoading } = useContext(GeneralContext);
    
    useEffect(() => {
        setLoading(true);

        fetch("http://localhost:5000/students")
        .then(res => res.json())
        .then(data => setStudents(data))
        .finally(() => setLoading(false));
    }, [setLoading]);

    return (
        <>
            {
                students.length !== 0 &&
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>שם פרטי</th>
                            <th>שם משפחה</th>
                            <th>טלפון</th>
                            <th>עיר</th>
                            <th>תאריך לידה</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map((s, i) => 
                                <tr key={s.id}>
                                    <td>{i + 1}</td>
                                    <td>{s.firstName}</td>
                                    <td>{s.lastName}</td>
                                    <td>{s.phone}</td>
                                    <td>{s.city}</td>
                                    <td>{moment(s.birthday).format("DD/MM/YYYY")}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            }
        </>
    )
}
