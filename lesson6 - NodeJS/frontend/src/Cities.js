import { useEffect, useState } from 'react';

export default function Cites() {
    const [students, setStudents] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:5000/students/average-by-cites")
        .then(res => res.json())
        .then(data => setStudents(data));
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>City</th>
                    <th>Average</th>
                </tr>
            </thead>
            <tbody>
                {
                    students.map((s, i) => 
                        <tr key={s.id}>
                            <td>{i + 1}</td>
                            <td>{s.city}</td>
                            <td>{s.AVG}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
            
    )
}
