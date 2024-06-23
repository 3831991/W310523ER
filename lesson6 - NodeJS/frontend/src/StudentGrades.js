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
        <div style={{ backgroundColor: 'white' }}>
            {
                student &&
                <h2>
                    עריכת ציונים ל{student.firstName} {student.lastName}
                </h2>
            }
        </div>
    )
}
