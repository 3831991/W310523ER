import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function StudentGrades() {
    const { studentId } = useParams();
    const [student, setStudent] = useState();

    useEffect(() => {
        fetch(`http://localhost:5000/students/${studentId}`)
        .then(res => res.json())
        .then(data => setStudent(data));
    }, [studentId]);

    return (
        <div className="frame">
            {
                student &&
                <div>
                    <h2>עריכת ציונים ל{student.user.firstName} {student.user.lastName}</h2>

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
                                        <td>{s.grade}</td>
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
