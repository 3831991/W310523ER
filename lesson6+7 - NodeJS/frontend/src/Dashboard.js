import { useContext, useEffect, useState } from 'react';
import './Dashboard.css';
import { GeneralContext } from './App';

export default function Dashboard() {
    const [data, setData] = useState();
    const { setLoading } = useContext(GeneralContext);

    useEffect(() => {
        const url = 'http://localhost:5000/dashboard';
        setLoading(true);

        Promise.all([
            fetch(`${url}/students/amount`).then(res => res.text()),
            fetch(`${url}/cities/amount`).then(res => res.text()),
            fetch(`${url}/tests/amount`).then(res => res.text()),
            fetch(`${url}/tests/avg`).then(res => res.text()),
            fetch(`${url}/students/the-best`).then(res => res.json()),
            fetch(`${url}/cities/the-best`).then(res => res.json()),
            fetch(`${url}/students/birthday`).then(res => res.json()),
        ])
        .then(result => {
            setData(result);
        })
        .finally(() => setLoading(false));
    }, []);

    return (
        <>
            {
                data &&
                <div className="frame">
                    <div className='Dashboard'>
                        <div className='card'>
                            <header>כמות תלמידים</header>
                            <div>{data[0]}</div>
                        </div>

                        <div className='card'>
                            <header>כמות ערים</header>
                            <div>{data[1]}</div>
                        </div>

                        <div className='card'>
                            <header>כמות מבחנים</header>
                            <div>{data[2]}</div>
                        </div>

                        <div className='card'>
                            <header>ממוצע ציונים</header>
                            <div>{data[3]}</div>
                        </div>

                        <div className='card'>
                            <header>תלמיד מצטיין</header>
                            <div>
                                {data[4].firstName} {data[4].lastName}
                                <br /><small>({data[4].grade})</small>
                            </div>
                        </div>

                        <div className='card'>
                            <header>עיר מצטיינת</header>
                            <div>
                                {data[5].city}
                                <br /><small>({data[5].grade})</small>
                            </div>
                        </div>

                        <div className='card'>
                            <header>ימי הולדת החודש</header>
                            <ul>
                                {
                                    data[6].map(s => 
                                        <li key={s.id}>{s.firstName} {s.lastName} ({s.age})</li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
