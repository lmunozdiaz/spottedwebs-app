USE `spottedwebsdb`;

CREATE TABLE IF NOT EXISTS `image` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `object_key` VARCHAR(255) UNIQUE NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `user_id` BIGINT NOT NULL,
  `created_on` DATETIME NOT NULL DEFAULT NOW(),
  `updated_on` DATETIME NOT NULL DEFAULT NOW(),
  FOREIGN KEY (`user_id`) REFERENCES user (`id`)
  );

CREATE TABLE IF NOT EXISTS `collection` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `object_key` VARCHAR(255) UNIQUE NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `subtitle` VARCHAR(255) NOT NULL,
    `blurb` TEXT NOT NULL,
    `created_on` DATETIME NOT NULL DEFAULT NOW(),
    `updated_on` DATETIME NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS `image_collection` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `image_id` BIGINT NOT NULL,
    `collection_id` BIGINT NOT NULL,
    `created_on` DATETIME NOT NULL DEFAULT NOW(),
    `updated_on` DATETIME NOT NULL DEFAULT NOW(),
    FOREIGN KEY (`image_id`) REFERENCES `image` (`id`),
    FOREIGN KEY (`collection_id`) REFERENCES `collection` (`id`)
);

CREATE TABLE IF NOT EXISTS `user` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(255) UNIQUE NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `created_on` DATETIME NOT NULL DEFAULT NOW(),
  `updated_on` DATETIME NOT NULL DEFAULT NOW()
);

