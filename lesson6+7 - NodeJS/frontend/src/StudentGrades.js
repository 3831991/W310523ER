import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function duplicateObj(objectOrArray) {
    return JSON.parse(JSON.stringify(objectOrArray));
}

export default function StudentGrades() {
    let initialStudent;
    const { studentId } = useParams();
    const [student, setStudent] = useState();

    useEffect(() => {
        fetch(`http://localhost:5000/students/${studentId}`)
        .then(res => res.json())
        .then(data => {
            setStudent(data);
            initialStudent = duplicateObj(data);
        });
    }, [studentId]);

    function gradeChange(i, ev) {
        const { value } = ev.target;

        student.grades[i].grade = value;
        setStudent({ ...student });
    }

    return (
        <div className="frame">
            {
                student &&
                <div>
                    <header className="student">
                        <h2>עריכת ציונים ל{student.user.firstName} {student.user.lastName}</h2>
                        <button className="save">שמור</button>
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
            }
        </div>
    )
}
