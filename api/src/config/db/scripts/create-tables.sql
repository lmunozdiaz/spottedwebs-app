USE `spottedwebsdb`;

CREATE TABLE IF NOT EXISTS `User` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(255) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `createdOn` DATETIME NOT NULL DEFAULT NOW(),
  `updatedOn` DATETIME
);

CREATE TABLE IF NOT EXISTS `Image` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `objectKey` VARCHAR(255) UNIQUE NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `userId` BIGINT NOT NULL,
  `createdOn` DATETIME NOT NULL DEFAULT NOW(),
  `updatedOn` DATETIME,
  FOREIGN KEY (`userId`) REFERENCES User (`id`)
  );

CREATE TABLE IF NOT EXISTS `Collection` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `objectKey` VARCHAR(255) UNIQUE NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `subtitle` VARCHAR(255) NOT NULL,
    `blurb` TEXT NOT NULL,
    `createdOn` DATETIME NOT NULL DEFAULT NOW(),
    `updatedOn` DATETIME
);

CREATE TABLE IF NOT EXISTS `ImageCollection` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `imageId` BIGINT NOT NULL,
    `collectionId` BIGINT NOT NULL,
    `createdOn` DATETIME NOT NULL DEFAULT NOW(),
    `updatedOn` DATETIME,
    FOREIGN KEY (`imageId`) REFERENCES `Image` (`id`),
    FOREIGN KEY (`collectionId`) REFERENCES `Collection` (`id`)
);

