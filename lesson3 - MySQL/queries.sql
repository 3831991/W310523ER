-- רשימת סטודנטים עם עמודה של כמות המבחנים
SELECT
    students.firstName,
    students.lastName,
    COUNT(test_grades.id) 'gradeAmount'
FROM
    students
LEFT JOIN
    test_grades ON students.id = test_grades.studentId
GROUP BY
    students.id;

-- רשימה של סטודנטים עם ממוצע מבחנים
SELECT
    students.firstName,
    students.lastName,
    AVG(test_grades.grade) 'average'
FROM
    students
LEFT JOIN
    test_grades ON students.id = test_grades.studentId
GROUP BY
    students.id;

-- רשימה של מבחנים עם ממוצע ציונים וכמות נבחנים
SELECT
    tests.name,
    tests.date,
    AVG(test_grades.grade) 'average',
    COUNT(test_grades.id) 'studentAmount'
FROM
    tests
LEFT JOIN
    test_grades ON tests.id = test_grades.testId
GROUP BY
    tests.id;