DROP TABLE IF EXISTS `tests`;
CREATE TABLE IF NOT EXISTS `tests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

INSERT INTO `tests` (`id`, `name`, `date`) VALUES
(1, 'לא דובים ולא יער', '2024-05-26'),
(2, 'סייג לחכמה שתיקה', '2023-08-01'),
(3, 'איזהו חכם הרואה את הנולד', '2024-04-06'),
(4, 'כל הפוסל - במומו פוסל', '2024-06-02'),
(5, 'שתיקה שווה זהב', '2024-02-12'),
(6, 'אין הנחתום מעיד על עיסתו', '2024-01-23'),
(7, 'דברי חכמים בנחת נשמעים', '2024-04-03'),
(8, 'אם בארזים נפלה שלהבת מה יעשו אזובי הקיר', '2024-03-22'),
(9, 'מי שטרח בערב שבת - יאכל בשבת', '2024-05-22'),
(10, 'אם אין אני לי', '2024-02-29'),
(11, 'מי לי? וכשאני לעצמי', '2023-11-08'),
(12, 'מה אני? ואם לא עכשיו - אימתי?', '2023-07-25'),
(13, 'חושך שבטו שונא בנו', '2023-08-19'),
(14, 'אל יתהלל חוגר כמפתח', '2023-09-08'),
(15, 'טובים השניים מן האחד', '2024-05-10'),
(16, 'על ראש הגנב בוער הכובע', '2023-10-04'),
(17, 'אמור מעט ועשה הרבה', '2023-09-14'),
(18, 'טוב שם טוב משמן טוב', '2023-10-28'),
(19, 'הוה זנב לאריות ואל תהי ראש לשועלים', '2023-11-29'),
(20, 'עבר זמנו בטל קורבנו', '2023-09-26'),
(21, 'קנאת סופרים תרבה חכמה', '2024-05-05'),
(22, 'שלח לחמך על פני המים כי ברב הימים תמצאנו', '2024-02-19'),
(23, 'רצונו של אדם - כבודו', '2023-07-12'),
(24, 'מוטב להיכשל באהבת חינם מאשר להיכשל בשנאת חינם', '2023-09-27'),
(25, 'אל תסתכל בקנקן אלא במה שיש בו; יש קנקן חדש מלא - ישן וישן - אפילו חדש אין בו', '2024-05-05'),
(26, 'לך אל הנמלה עצל ראה דרכיה וחכם', '2023-11-21'),
(27, 'כל המרחם על אכזרים סופו להתאכזר לרחמנים', '2024-01-06'),
(28, 'עדיף כישלון מפואר מחלומות במגירה', '2024-03-07'),
(29, 'כל המלבין פני חברו ברבים - כאילו שופך דמים הוא', '2023-12-20'),
(30, 'יהי כבוד חברך חביב עליך כשלך', '2024-05-14');