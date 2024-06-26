import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Average() {
    const [students, setStudents] = useState([]);
    const [min, setMin] = useState([]);
    const [max, setMax] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetch("http://localhost:5000/students/average")
        .then(res => res.json())
        .then(data => {
            setStudents(data);
        
            const numbers = data.map(x => +x.average);
            setMin(Math.min(...numbers));
            setMax(Math.max(...numbers));
        });
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>סטודנט</th>
                    <th>ממוצע</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    students.map((s, i) => 
                        <tr key={s.id}>
                            <td>{i + 1}</td>
                            <td>{s.firstName} {s.lastName}</td>
                            <td className={s.average == min ? 'min' : s.average == max ? 'max' : ''}>{s.average}</td>
                            <td>
                                <button className='edit' onClick={() => navigate(`/student/${s.id}/grades`)}>✏️</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
            
    )
}