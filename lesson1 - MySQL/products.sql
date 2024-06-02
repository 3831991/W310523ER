
DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `price` float NOT NULL,
  `description` varchar(200) NOT NULL DEFAULT '',
  `size` varchar(5) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;

INSERT INTO `products` (`name`, `price`, `description`, `size`, `quantity`) VALUES
('מלפפון', 7.1, '', NULL, 0),
('עגבניה', 6.2, '', NULL, 0),
('גמבה', 8, '', NULL, 0),
('חסה', 6, '', NULL, 0),
('כרוב', 12.3, '', NULL, 0),
('אבטיח', 4.2, '', NULL, 0);