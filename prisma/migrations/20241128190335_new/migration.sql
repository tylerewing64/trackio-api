-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password_hash` VARCHAR(500) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `firstname` VARCHAR(45) NOT NULL,
    `lastname` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `username`(`username`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Applications` (
    `application_ID` INTEGER NOT NULL,
    `user_ID` INTEGER NULL,
    `job_ID` INTEGER NULL,
    `date_created` VARCHAR(45) NULL,
    `status` VARCHAR(45) NULL,

    PRIMARY KEY (`application_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jobs` (
    `job_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `job_title` VARCHAR(45) NOT NULL,
    `job_company` VARCHAR(255) NOT NULL,
    `job_location` VARCHAR(100) NOT NULL,
    `job_description` VARCHAR(500) NULL,
    `job_posting_date` DATE NULL,
    `job_posting_url` VARCHAR(500) NULL,
    `job_salary` INTEGER NULL,
    `db_created_on_date` DATE NULL,

    PRIMARY KEY (`job_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
