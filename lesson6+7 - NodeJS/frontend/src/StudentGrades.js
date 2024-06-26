import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function duplicateObj(objectOrArray) {
    return JSON.parse(JSON.stringify(objectOrArray));
}

export default function StudentGrades() {
    const { studentId } = useParams();
    const [loader, setLoader] = useState(true);
    const [student, setStudent] = useState();
    const [initialStudent, setInitialStudent] = useState();

    useEffect(() => {
        fetch(`http://localhost:5000/students/${studentId}`)
        .then(res => res.json())
        .then(data => {
            setStudent(data);
            setInitialStudent(duplicateObj(data));
            setLoader(false);
        });
    }, [studentId]);

    const gradeChange = (i, ev) => {
        const { value } = ev.target;

        student.grades[i].grade = +value;
        setStudent({ ...student });
    }

    const save = () => {
        const data = student.grades.filter(g => initialStudent.grades.find(x => x.id === g.id).grade != g.grade);
        setLoader(true);

        fetch(`http://localhost:5000/students/${studentId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })
        .then(() => {
            setLoader(false);
            setInitialStudent(duplicateObj(student));
        });
    }

    return (
        <div className="frame">
            {
                loader &&
                <div className="loaderFrame">
                    <div className="loader"></div>
                </div>
            }

            {
                student &&
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
            }
        </div>
    )
}
