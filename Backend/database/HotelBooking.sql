

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";



DROP TABLE IF EXISTS `hotels`;

CREATE TABLE `hotels` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `location` VARCHAR(150) NOT NULL,
    `description` TEXT DEFAULT NULL,
    `rating` DECIMAL(2,1) NOT NULL DEFAULT 4.5,
    `price_per_night` INT(11) NOT NULL DEFAULT 0,
    `images` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
              CHECK (json_valid(`images`)),
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `hotels` (
    `id`, `name`, `location`, `description`, `rating`, `price_per_night`, `images`, `createdAt`, `updatedAt`
) VALUES
    (1, 'Nova Vista – Jaffna', 'Jaffna, Sri Lanka', 'Comfortable stay in the heart of Jaffna.', 4.7, 4500, 
     '[\"/Images/Room_1.jpg\", \"/Images/Event_1.jpg\", \"/Images/jaffna.jpg\"]', '2026-01-24 05:44:12', '2026-01-24 05:44:12'),
    (2, 'Nova Vista – Kilinochchi', 'Kilinochchi, Sri Lanka', 'Modern facilities, great events hall.', 4.6, 4200, 
     '[\"/Images/Room_2.jpg\", \"/Images/Event_2.jpg\", \"/Images/kilinochchi.jpg\"]', '2026-01-24 05:57:52', '2026-01-24 05:57:52'),
    (3, 'Nova Vista – Mannar', 'Mannar, Sri Lanka', 'Seaside comfort with welcoming staff.', 4.8, 4600, 
     '[\"/Images/Room_3.jpg\", \"/Images/Event_3.jpg\", \"/Images/mannar.jpg\"]', '2026-01-24 05:57:52', '2026-01-24 05:57:52');


ALTER TABLE `hotels` AUTO_INCREMENT = 4;

COMMIT;

