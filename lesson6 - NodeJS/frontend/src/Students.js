import { useEffect, useState } from 'react';

export default function Students() {
    const [students, setStudents] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:5000/students")
        .then(res => res.json())
        .then(data => setStudents(data));
    }, []);

    return (
        <ul>
            {
                students.map(s => 
                    <li key={s.id}>{s.firstName} {s.lastName}</li>    
                )
            }
        </ul>
    )
}
