-- סדר עולה
SELECT * FROM `users` ORDER BY `id` ASC;

-- סדר יורד
SELECT * FROM `users` ORDER BY `id` DESC;

-- קבלת 10 אחרונים
SELECT * FROM `users` ORDER BY `id` DESC LIMIT 10;

-- כל מי שנולד באוג' 2000
SELECT `firstName`, `birthday` FROM `users` WHERE YEAR(`birthday`) = 2000 AND MONTH(`birthday`) = 8;

-- כל מי שנולד בין השנים 2000 ל-2005
SELECT `firstName`, `birthday` FROM `users` WHERE YEAR(`birthday`) BETWEEN 2000 AND 2005;

-- חישוב הגילאים של היוזרים
SELECT YEAR(FROM_DAYS(DATEDIFF(NOW(), `birthday`))) as age FROM `users`;
SELECT `id`, `firstName`, `lastName`, YEAR(FROM_DAYS(DATEDIFF(NOW(), `birthday`))) as age FROM `users`;

-- חילקנו ציונים רנדומליים (כמו רוב המורים בבית הספר)
UPDATE `users` SET `grade` = FLOOR(RAND() * 41) + 60;

-- ממוצע ציונים לפי עיר
SELECT `city`, AVG(`grade`) 'avg' FROM `users` GROUP BY `city`;

-- כמות משתמשים לפי עיר
SELECT `city`, COUNT(*) 'usersAmount' FROM `users` GROUP BY `city`;