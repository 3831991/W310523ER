-- רשימת סטודנטים עם עמודה של כמות המבחנים
SELECT
    students.firstName,
    students.lastName,
    COUNT(test_grades.id) 'gradeAmount'
FROM
    students
LEFT JOIN test_grades ON students.id = test_grades.studentId
GROUP BY
    students.id;

-- רשימה של סטודנטים עם ממוצע מבחנים


-- רשימה של מבחנים עם ממוצע ציונים וכמות נבחנים