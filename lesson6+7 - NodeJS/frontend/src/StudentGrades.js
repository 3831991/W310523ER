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
        </>
    )
}
