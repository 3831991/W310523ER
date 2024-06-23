import { useEffect, useState } from 'react';
import moment from 'moment';

export default function Students() {
    const [students, setStudents] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:5000/students")
        .then(res => res.json())
        .then(data => setStudents(data));
    }, []);

    return (
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
            
    )
}
