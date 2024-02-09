-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema teachingSchedule
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema teachingSchedule
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `teachingSchedule` DEFAULT CHARACTER SET utf8 ;
USE `teachingSchedule` ;

-- -----------------------------------------------------
-- Table `teachingSchedule`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teachingSchedule`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) BINARY NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teachingSchedule`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teachingSchedule`.`User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NULL,
  `name` VARCHAR(45) NULL,
  `role_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_User_role_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `fk_User_role`
    FOREIGN KEY (`role_id`)
    REFERENCES `teachingSchedule`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teachingSchedule`.`subject_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teachingSchedule`.`subject_category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teachingSchedule`.`Subjects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teachingSchedule`.`Subjects` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idsubject` VARCHAR(10) NULL,
  `name` VARCHAR(255) NOT NULL,
  `credit` INT NOT NULL,
  `practice_t` INT NULL,
  `lecture_t` INT NULL,
  `years` VARCHAR(45) NULL,
  `subject_category_id` INT NOT NULL,
  `term` INT NULL,
  `IsOpen` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Subjects_subject_category1_idx` (`subject_category_id` ASC) VISIBLE,
  CONSTRAINT `fk_Subjects_subject_category1`
    FOREIGN KEY (`subject_category_id`)
    REFERENCES `teachingSchedule`.`subject_category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teachingSchedule`.`day`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teachingSchedule`.`day` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teachingSchedule`.`status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teachingSchedule`.`status` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teachingSchedule`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teachingSchedule`.`category` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teachingSchedule`.`SubjectsRegister`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teachingSchedule`.`SubjectsRegister` (
  `id` INT NOT NULL,
  `User_id` INT NOT NULL,
  `st` TIME NULL,
  `et` TIME NULL,
  `day_id` INT NOT NULL,
  `sec` VARCHAR(3) NULL,
  `status_id` INT NOT NULL,
  `N_people` INT NOT NULL,
  `branch` JSON NOT NULL,
  `category_id` INT NOT NULL,
  `Subjects_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_SubjectsRegister_User1_idx` (`User_id` ASC) VISIBLE,
  INDEX `fk_SubjectsRegister_day1_idx` (`day_id` ASC) VISIBLE,
  INDEX `fk_SubjectsRegister_status1_idx` (`status_id` ASC) VISIBLE,
  INDEX `fk_SubjectsRegister_category1_idx` (`category_id` ASC) VISIBLE,
  INDEX `fk_SubjectsRegister_Subjects1_idx` (`Subjects_id` ASC) VISIBLE,
  CONSTRAINT `fk_SubjectsRegister_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `teachingSchedule`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SubjectsRegister_day1`
    FOREIGN KEY (`day_id`)
    REFERENCES `teachingSchedule`.`day` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SubjectsRegister_status1`
    FOREIGN KEY (`status_id`)
    REFERENCES `teachingSchedule`.`status` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SubjectsRegister_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `teachingSchedule`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SubjectsRegister_Subjects1`
    FOREIGN KEY (`Subjects_id`)
    REFERENCES `teachingSchedule`.`Subjects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teachingSchedule`.`TimeSystem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teachingSchedule`.`TimeSystem` (
  `status` INT NOT NULL,
  `S_date` DATE NULL,
  `E_date` DATE NULL,
  `S_time` TIME NULL,
  `E_time` TIME NULL,
  `id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teachingSchedule`.`AuToDetect`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teachingSchedule`.`AuToDetect` (
  `date` DATETIME NOT NULL,
  `latesedDate` DATETIME NULL,
  PRIMARY KEY (`date`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teachingSchedule`.`File`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teachingSchedule`.`File` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATETIME NOT NULL,
  `filename` VARCHAR(100) NOT NULL,
  `link` VARCHAR(1024) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `years` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
