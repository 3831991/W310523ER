import { useEffect, useState } from 'react';

export default function Cites() {
    const [cities, setCities] = useState([]);
    const [min, setMin] = useState([]);
    const [max, setMax] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:5000/students/average-by-cites")
        .then(res => res.json())
        .then(data => {
            setCities(data);

            const numbers = data.map(x => +x.AVG);
            setMin(Math.min(...numbers));
            setMax(Math.max(...numbers));
        });
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>עיר</th>
                    <th>ממוצע</th>
                </tr>
            </thead>
            <tbody>
                {
                    cities.map((s, i) => 
                        <tr key={s.city}>
                            <td>{i + 1}</td>
                            <td>{s.city}</td>
                            <td className={s.AVG == min ? 'min' : s.AVG == max ? 'max' : ''}>{s.AVG}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}
