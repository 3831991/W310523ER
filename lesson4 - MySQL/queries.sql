-- ממוצע לפי עיר
SELECT s.city, AVG(g.grade) FROM students AS s 
LEFT JOIN test_grades AS g ON s.id = g.studentId
GROUP BY city;

-- כמה סטודנטים קיבלו מכל ציון
SELECT grade, COUNT(*) FROM test_grades GROUP BY grade;

-- כמה סטודנטים קיבלו מכל ציון + פירוט של השמות
SELECT g.grade, COUNT(*) AS amount, GROUP_CONCAT(s.firstName) AS names
FROM test_grades AS g
LEFT JOIN students AS s ON g.studentId = s.id
GROUP BY g.grade;

-- ממוצע ציונים לפי מבחן
SELECT t.name, AVG(g.grade) AS grade FROM tests AS t
LEFT JOIN test_grades AS g ON t.id = g.testId
GROUP BY t.id;

-- שלושת הסטודנטים שקיבלו את הציון הנמוך
SELECT s.firstName, s.lastName, g.grade FROM test_grades AS g
LEFT JOIN students AS s ON g.studentId = s.id
ORDER BY g.grade ASC LIMIT 3;

-- חמשת הסטודנטים שקיבלו את הציון הגבוה. לשים עמודה של שם מלא
SELECT CONCAT(s.firstName, ' ', s.lastName) AS fullName, g.grade FROM test_grades AS g
LEFT JOIN students AS s ON g.studentId = s.id
ORDER BY g.grade DESC LIMIT 5;

-- כמות ציונים עוברים מכל עיר - (ציון עובר זה 70)
