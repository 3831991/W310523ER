import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GeneralContext } from "./App";

export function duplicateObj(objectOrArray) {
    return JSON.parse(JSON.stringify(objectOrArray));
}

export default function StudentGrades() {
    const { studentId } = useParams();
    const [student, setStudent] = useState();
    const [initialStudent, setInitialStudent] = useState();
    const [tests, setTests] = useState([]);
    const [isModal, setIsModal] = useState(false);
    const [newTest, setNewTest] = useState({
        testId: '',
        grade: '',
    });
    const { setLoading } = useContext(GeneralContext);

    useEffect(() => {
        setLoading(true);

        fetch(`http://localhost:5000/students/${studentId}`)
        .then(res => res.json())
        .then(data => {
            setStudent(data);
            setInitialStudent(duplicateObj(data));
        })
        .finally(() => setLoading(false));

        fetch(`http://localhost:5000/tests`)
        .then(res => res.json())
        .then(data => setTests(data));
    }, [studentId, setLoading]);

    const gradeChange = (i, ev) => {
        const { value } = ev.target;

        student.grades[i].grade = +value;
        setStudent({ ...student });
    }

    const save = () => {
        const data = student.grades.filter(g => +initialStudent.grades.find(x => x.id === g.id).grade !== +g.grade);
        setLoading(true);

        fetch(`http://localhost:5000/students/${studentId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        .then(() => {
            setLoading(false);
            setInitialStudent(duplicateObj(student));
        });
    }

    const handelChange = ev => {
        const { value, name } = ev.target;

        setNewTest({
            ...newTest,
            [name]: value,
        });
    }

    const add = () => {
        setLoading(true);

        const obj = {
            ...newTest,
            studentId,
        };

        fetch(`http://localhost:5000/students/test`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj),
        })
        .then(data => {
            // הוספת האובייקט החדש למערך
            student.grades.push(data);
            // עדכון הסטייט
            setStudent({ ...student });

            // עדכון הנתונים הראשוניים
            initialStudent.grades.push(duplicateObj(data));
            setInitialStudent({ ...initialStudent });

            // סגירת החלונית
            setIsModal(false);
        })
        .finally(() => setLoading(false));
    }

    return (
        <>
            {
                student &&
                <div className="frame">

                    <div>
                        <header className="student">
                            <h2>עריכת ציונים ל{student.user.firstName} {student.user.lastName}</h2>
                            <button className="save" onClick={save}>שמור</button>
                        </header>

                        <button className="save" onClick={() => setIsModal(true)}>הוספת ציון</button><br/><br/>

                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>מבחן</th>
                                    <th>ציון</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    student.grades.map((s, i) =>
                                        <tr key={s.id}>
                                            <td>{i + 1}</td>
                                            <td>{s.name}</td>
                                            <td><input className="grade" type="number" value={s.grade} onChange={ev => gradeChange(i, ev)} /></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            }

            {
                isModal &&
                <div className="modal-frame">
                    <div className="modal">
                        <header>
                            <button className="close" onClick={() => setIsModal(false)}>x</button>
                            <h2>רישום למבחן</h2>
                        </header>

                        <section>
                            <label>מבחן:</label>
                            <select value={newTest.testId} name="testId" onChange={handelChange}>
                                <option value=""></option>
                                {
                                    tests.filter(t => !student.grades.map(g => g.testId).includes(t.id)).map(t => 
                                        <option key={t.id} value={t.id}>{t.name}</option>    
                                    )
                                }
                            </select>

                            <label>ציון:</label>
                            <input className="gradeModal" type="number" max={100} min={0} value={newTest.grade} name="grade" onChange={handelChange} />
                        </section>

                        <footer>
                            <button className="save" onClick={add}>הוסף</button>
                        </footer>
                    </div>
                </div>
            }
        </>
    )
}
