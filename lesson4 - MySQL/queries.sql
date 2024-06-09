-- ממוצע לפי עיר
SELECT s.city, AVG(g.grade) FROM students AS s 
LEFT JOIN test_grades AS g ON s.id = g.studentId
GROUP BY city;

-- כמה סטודנטים קיבלו מכל ציון


-- ממוצע ציונים לפי מבחן


-- שלושת הסטודנטים שקיבלו את הציון הנמוך


-- חמשת הסטודנטים שקיבלו את הציון הגבוה