import { useEffect, useState } from 'react';

export default function Average() {
    const [students, setStudents] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:5000/students/average")
        .then(res => res.json())
        .then(data => setStudents(data));
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Average</th>
                </tr>
            </thead>
            <tbody>
                {
                    students.map((s, i) => 
                        <tr key={s.id}>
                            <td>{i + 1}</td>
                            <td>{s.firstName} {s.lastName}</td>
                            <td>{s.average}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
            
    )
}
