CREATE DATABASE  IF NOT EXISTS `teachingschedule` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `teachingschedule`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: teachingschedule
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `allowlink`
--

DROP TABLE IF EXISTS `allowlink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `allowlink` (
  `id` int NOT NULL,
  `linapath` varchar(1024) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `linapath_UNIQUE` (`linapath`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allowlink`
--

LOCK TABLES `allowlink` WRITE;
/*!40000 ALTER TABLE `allowlink` DISABLE KEYS */;
/*!40000 ALTER TABLE `allowlink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `allowlink_has_role`
--

DROP TABLE IF EXISTS `allowlink_has_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `allowlink_has_role` (
  `allowlink_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`allowlink_id`,`role_id`),
  KEY `fk_allowlink_has_role_role1_idx` (`role_id`),
  KEY `fk_allowlink_has_role_allowlink1_idx` (`allowlink_id`),
  CONSTRAINT `fk_allowlink_has_role_allowlink1` FOREIGN KEY (`allowlink_id`) REFERENCES `allowlink` (`id`),
  CONSTRAINT `fk_allowlink_has_role_role1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allowlink_has_role`
--

LOCK TABLES `allowlink_has_role` WRITE;
/*!40000 ALTER TABLE `allowlink_has_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `allowlink_has_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `autoday`
--

DROP TABLE IF EXISTS `autoday`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `autoday` (
  `id` int NOT NULL AUTO_INCREMENT,
  `day_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_autoday_day1_idx` (`day_id`),
  CONSTRAINT `fk_autoday_day1` FOREIGN KEY (`day_id`) REFERENCES `day` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autoday`
--

LOCK TABLES `autoday` WRITE;
/*!40000 ALTER TABLE `autoday` DISABLE KEYS */;
INSERT INTO `autoday` VALUES (3,2),(6,4),(4,6);
/*!40000 ALTER TABLE `autoday` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'บรรยาย'),(3,'บรรยาย/ปฏิบัติ'),(2,'ปฏิบัติ');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `day`
--

DROP TABLE IF EXISTS `day`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `day` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `day`
--

LOCK TABLES `day` WRITE;
/*!40000 ALTER TABLE `day` DISABLE KEYS */;
INSERT INTO `day` VALUES (1,'วันจันทร์'),(4,'วันพฤหัส'),(3,'วันพุธ'),(5,'วันศุกร์'),(2,'วันอังคาร'),(7,'วันอาทิตย์'),(6,'วันเสาร์');
/*!40000 ALTER TABLE `day` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `filename` varchar(100) NOT NULL,
  `link` varchar(1024) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  `years` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
INSERT INTO `file` VALUES (15,'2024-03-22 16:55:42','course_2565.xlsx','/download/course_2565.xlsx',NULL,2565),(17,'2024-03-22 16:55:42','course_2563.xlsx','/download/course_2563.xlsx',NULL,2563);
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `focus_sub_cat`
--

DROP TABLE IF EXISTS `focus_sub_cat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `focus_sub_cat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject_category_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_focus_sub_cat_subject_category1_idx` (`subject_category_id`),
  CONSTRAINT `fk_focus_sub_cat_subject_category1` FOREIGN KEY (`subject_category_id`) REFERENCES `subject_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `focus_sub_cat`
--

LOCK TABLES `focus_sub_cat` WRITE;
/*!40000 ALTER TABLE `focus_sub_cat` DISABLE KEYS */;
INSERT INTO `focus_sub_cat` VALUES (1,1),(3,2);
/*!40000 ALTER TABLE `focus_sub_cat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historyautodetect`
--

DROP TABLE IF EXISTS `historyautodetect`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historyautodetect` (
  `Timer` time NOT NULL,
  `latesedDate` datetime DEFAULT NULL,
  `id` int NOT NULL,
  `statuslog` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historyautodetect`
--

LOCK TABLES `historyautodetect` WRITE;
/*!40000 ALTER TABLE `historyautodetect` DISABLE KEYS */;
INSERT INTO `historyautodetect` VALUES ('17:47:30',NULL,1,1),('00:00:00',NULL,2,1);
/*!40000 ALTER TABLE `historyautodetect` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log_auto_detect`
--

DROP TABLE IF EXISTS `log_auto_detect`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log_auto_detect` (
  `id` int NOT NULL AUTO_INCREMENT,
  `msg` text,
  `datetime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=197 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_auto_detect`
--

LOCK TABLES `log_auto_detect` WRITE;
/*!40000 ALTER TABLE `log_auto_detect` DISABLE KEYS */;
INSERT INTO `log_auto_detect` VALUES (20,'ได้ทำตรวจสอบแล้ว','2024-03-11 15:30:08'),(21,'ได้ทำตรวจสอบแล้ว','2024-03-11 15:30:17'),(22,'ได้ทำตรวจสอบแล้ว','2024-03-11 15:30:26'),(23,'ได้ทำตรวจสอบแล้ว','2024-03-11 15:31:42'),(24,'ได้ทำตรวจสอบแล้ว','2024-03-11 15:32:10'),(25,'ได้ทำตรวจสอบแล้ว','2024-03-11 15:32:55'),(26,'ได้ทำตรวจสอบแล้ว','2024-03-11 15:33:34'),(27,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 15:40:46'),(28,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 15:42:32'),(29,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 15:42:46'),(30,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 15:43:25'),(31,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 15:44:45'),(32,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 15:45:05'),(33,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 15:49:00'),(34,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 15:49:11'),(35,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 15:49:40'),(36,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 15:50:16'),(37,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 15:50:46'),(38,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 15:56:17'),(39,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 15:57:09'),(40,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 15:58:34'),(41,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 16:04:34'),(42,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 16:06:23'),(43,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 16:14:21'),(44,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 16:15:52'),(45,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 17:44:30'),(46,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 17:44:56'),(47,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 17:46:56'),(48,'ไม่มีวิชาให้ตรวจสอบ','2024-03-22 23:37:38'),(49,'ไม่มีวิชาให้ตรวจสอบ','2024-03-22 23:42:51'),(50,'ไม่มีวิชาให้ตรวจสอบ','2024-03-22 23:42:53'),(51,'ไม่มีวิชาให้ตรวจสอบ','2024-03-22 23:42:56'),(52,'ไม่มีวิชาให้ตรวจสอบ','2024-03-23 00:19:24'),(53,'เปลี่ยนวิชา 8 จาก user_id 1 เป็น สถานะผ่าน','2024-03-23 01:08:00'),(54,'เปลี่ยนวิชา 9 จาก user_id 1 เป็น สถานะผ่าน','2024-03-23 01:08:00'),(55,'เปลี่ยนวิชา 10 จาก user_id 1 เป็น สถานะผ่าน','2024-03-23 01:08:00'),(56,'เปลี่ยนวิชา 11 จาก user_id 13 เป็น สถานะผ่าน','2024-03-23 01:08:00'),(57,'เปลี่ยนวิชา 12 จาก user_id 13 เป็น สถานะผ่าน','2024-03-23 01:08:00'),(58,'ได้ทำตรวจสอบแล้ว','2024-03-23 01:08:00'),(59,'เปลี่ยนวิชา 9 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-23 01:13:00'),(60,'เปลี่ยนวิชา 11 จาก user_id 13 เป็น สถานะ ไม่ผ่าน','2024-03-23 01:13:00'),(61,'เปลี่ยนวิชา 8 จาก user_id 1 เป็น สถานะผ่าน','2024-03-23 01:13:00'),(62,'เปลี่ยนวิชา 10 จาก user_id 1 เป็น สถานะผ่าน','2024-03-23 01:13:00'),(63,'เปลี่ยนวิชา 12 จาก user_id 13 เป็น สถานะผ่าน','2024-03-23 01:13:00'),(64,'ได้ทำตรวจสอบแล้ว','2024-03-23 01:13:00'),(65,'ได้ทำตรวจสอบแล้ว','2024-03-23 15:19:09'),(66,'ได้ทำตรวจสอบแล้ว','2024-03-23 15:22:36'),(67,'ได้ทำตรวจสอบแล้ว','2024-03-23 15:24:53'),(68,'ได้ทำตรวจสอบแล้ว','2024-03-23 15:25:44'),(69,'ได้ทำตรวจสอบแล้ว','2024-03-23 15:26:17'),(70,'ได้ทำตรวจสอบแล้ว','2024-03-23 15:26:22'),(71,'ได้ทำตรวจสอบแล้ว','2024-03-23 15:28:04'),(72,'ได้ทำตรวจสอบแล้ว','2024-03-23 15:28:59'),(73,'ได้ทำตรวจสอบแล้ว','2024-03-23 15:29:31'),(74,'ได้ทำตรวจสอบแล้ว','2024-03-23 15:46:37'),(75,'เปลี่ยนวิชา 9 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:41:00'),(76,'เปลี่ยนวิชา 9 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:41:00'),(77,'เปลี่ยนวิชา 10 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:41:00'),(78,'เปลี่ยนวิชา 10 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:41:00'),(79,'เปลี่ยนวิชา 11 จาก user_id 13 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:41:00'),(80,'เปลี่ยนวิชา 11 จาก user_id 13 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:41:00'),(81,'เปลี่ยนวิชา 14 จาก user_id 4 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:41:00'),(82,'เปลี่ยนวิชา 14 จาก user_id 4 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:41:00'),(83,'เปลี่ยนวิชา 14 จาก user_id 4 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:41:00'),(84,'เปลี่ยนวิชา 15 จาก user_id 5 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:41:00'),(85,'เปลี่ยนวิชา 8 จาก user_id 1 เป็น สถานะผ่าน','2024-03-23 17:41:00'),(86,'เปลี่ยนวิชา 12 จาก user_id 13 เป็น สถานะผ่าน','2024-03-23 17:41:00'),(87,'เปลี่ยนวิชา 13 จาก user_id 2 เป็น สถานะผ่าน','2024-03-23 17:41:00'),(88,'ได้ทำตรวจสอบแล้ว','2024-03-23 17:41:00'),(89,'เปลี่ยนวิชา 9 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:45:00'),(90,'เปลี่ยนวิชา 9 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:45:00'),(91,'เปลี่ยนวิชา 10 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:45:00'),(92,'เปลี่ยนวิชา 10 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:45:00'),(93,'เปลี่ยนวิชา 11 จาก user_id 13 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:45:00'),(94,'เปลี่ยนวิชา 11 จาก user_id 13 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:45:00'),(95,'เปลี่ยนวิชา 14 จาก user_id 4 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:45:00'),(96,'เปลี่ยนวิชา 14 จาก user_id 4 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:45:00'),(97,'เปลี่ยนวิชา 14 จาก user_id 4 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:45:00'),(98,'เปลี่ยนวิชา 15 จาก user_id 5 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:45:00'),(99,'เปลี่ยนวิชา 8 จาก user_id 1 เป็น สถานะผ่าน','2024-03-23 17:45:00'),(100,'เปลี่ยนวิชา 12 จาก user_id 13 เป็น สถานะผ่าน','2024-03-23 17:45:00'),(101,'เปลี่ยนวิชา 13 จาก user_id 2 เป็น สถานะผ่าน','2024-03-23 17:45:00'),(102,'ได้ทำตรวจสอบแล้ว','2024-03-23 17:45:00'),(103,'เปลี่ยนวิชา 9 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:47:30'),(104,'เปลี่ยนวิชา 9 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:47:30'),(105,'เปลี่ยนวิชา 10 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:47:30'),(106,'เปลี่ยนวิชา 10 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:47:30'),(107,'เปลี่ยนวิชา 11 จาก user_id 13 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:47:30'),(108,'เปลี่ยนวิชา 11 จาก user_id 13 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:47:30'),(109,'เปลี่ยนวิชา 14 จาก user_id 4 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:47:30'),(110,'เปลี่ยนวิชา 14 จาก user_id 4 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:47:30'),(111,'เปลี่ยนวิชา 14 จาก user_id 4 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:47:30'),(112,'เปลี่ยนวิชา 15 จาก user_id 5 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:47:30'),(113,'เปลี่ยนวิชา 8 จาก user_id 1 เป็น สถานะผ่าน','2024-03-23 17:47:30'),(114,'เปลี่ยนวิชา 12 จาก user_id 13 เป็น สถานะผ่าน','2024-03-23 17:47:30'),(115,'เปลี่ยนวิชา 13 จาก user_id 2 เป็น สถานะผ่าน','2024-03-23 17:47:30'),(116,'ได้ทำตรวจสอบแล้ว','2024-03-23 17:47:30'),(117,'เปลี่ยนวิชา 9 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:51:55'),(118,'เปลี่ยนวิชา 9 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:51:55'),(119,'เปลี่ยนวิชา 10 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:51:55'),(120,'เปลี่ยนวิชา 10 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:51:55'),(121,'เปลี่ยนวิชา 11 จาก user_id 13 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:51:55'),(122,'เปลี่ยนวิชา 11 จาก user_id 13 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:51:55'),(123,'เปลี่ยนวิชา 14 จาก user_id 4 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:51:55'),(124,'เปลี่ยนวิชา 14 จาก user_id 4 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:51:55'),(125,'เปลี่ยนวิชา 14 จาก user_id 4 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:51:55'),(126,'เปลี่ยนวิชา 15 จาก user_id 5 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:51:55'),(127,'เปลี่ยนวิชา 8 จาก user_id 1 เป็น สถานะผ่าน','2024-03-23 17:51:56'),(128,'เปลี่ยนวิชา 12 จาก user_id 13 เป็น สถานะผ่าน','2024-03-23 17:51:56'),(129,'เปลี่ยนวิชา 13 จาก user_id 2 เป็น สถานะผ่าน','2024-03-23 17:51:56'),(130,'ได้ทำตรวจสอบแล้ว','2024-03-23 17:51:56'),(131,'ได้ทำตรวจสอบแล้ว','2024-03-23 17:57:13'),(132,'เปลี่ยนวิชา 9 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:57:37'),(133,'เปลี่ยนวิชา 9 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:57:37'),(134,'เปลี่ยนวิชา 10 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:57:37'),(135,'เปลี่ยนวิชา 10 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:57:37'),(136,'เปลี่ยนวิชา 11 จาก user_id 13 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:57:37'),(137,'เปลี่ยนวิชา 11 จาก user_id 13 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:57:37'),(138,'เปลี่ยนวิชา 14 จาก user_id 4 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:57:37'),(139,'เปลี่ยนวิชา 14 จาก user_id 4 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:57:37'),(140,'เปลี่ยนวิชา 14 จาก user_id 4 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:57:37'),(141,'เปลี่ยนวิชา 15 จาก user_id 5 เป็น สถานะ ไม่ผ่าน','2024-03-23 17:57:37'),(142,'เปลี่ยนวิชา 8 จาก user_id 1 เป็น สถานะผ่าน','2024-03-23 17:57:37'),(143,'เปลี่ยนวิชา 12 จาก user_id 13 เป็น สถานะผ่าน','2024-03-23 17:57:37'),(144,'เปลี่ยนวิชา 13 จาก user_id 2 เป็น สถานะผ่าน','2024-03-23 17:57:37'),(145,'ได้ทำตรวจสอบแล้ว','2024-03-23 17:57:37'),(146,'ได้ทำตรวจสอบแล้ว','2024-03-23 17:58:36'),(147,'ได้ทำตรวจสอบแล้ว','2024-03-23 17:59:14'),(148,'ได้ทำตรวจสอบแล้ว','2024-03-23 17:59:46'),(149,'ได้ทำตรวจสอบแล้ว','2024-03-23 18:01:19'),(150,'ได้ทำตรวจสอบแล้ว','2024-03-23 18:01:33'),(151,'เปลี่ยนวิชา 9 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-23 18:02:23'),(152,'เปลี่ยนวิชา 9 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-23 18:02:23'),(153,'เปลี่ยนวิชา 10 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-23 18:02:23'),(154,'เปลี่ยนวิชา 10 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-23 18:02:23'),(155,'เปลี่ยนวิชา 11 จาก user_id 13 เป็น สถานะ ไม่ผ่าน','2024-03-23 18:02:23'),(156,'เปลี่ยนวิชา 11 จาก user_id 13 เป็น สถานะ ไม่ผ่าน','2024-03-23 18:02:23'),(157,'เปลี่ยนวิชา 14 จาก user_id 4 เป็น สถานะ ไม่ผ่าน','2024-03-23 18:02:23'),(158,'เปลี่ยนวิชา 14 จาก user_id 4 เป็น สถานะ ไม่ผ่าน','2024-03-23 18:02:23'),(159,'เปลี่ยนวิชา 14 จาก user_id 4 เป็น สถานะ ไม่ผ่าน','2024-03-23 18:02:23'),(160,'เปลี่ยนวิชา 15 จาก user_id 5 เป็น สถานะ ไม่ผ่าน','2024-03-23 18:02:23'),(161,'เปลี่ยนวิชา 8 จาก user_id 1 เป็น สถานะผ่าน','2024-03-23 18:02:23'),(162,'เปลี่ยนวิชา 12 จาก user_id 13 เป็น สถานะผ่าน','2024-03-23 18:02:23'),(163,'เปลี่ยนวิชา 13 จาก user_id 2 เป็น สถานะผ่าน','2024-03-23 18:02:23'),(164,'ได้ทำตรวจสอบแล้ว','2024-03-23 18:02:23'),(165,'ได้ทำตรวจสอบแล้ว','2024-03-23 18:02:40'),(166,'ได้ทำตรวจสอบแล้ว','2024-03-23 18:25:04'),(167,'ได้ทำตรวจสอบแล้ว','2024-03-23 18:52:47'),(168,'ได้ทำตรวจสอบแล้ว','2024-03-23 18:54:21'),(169,'ได้ทำตรวจสอบแล้ว','2024-03-23 18:54:33'),(170,'ได้ทำตรวจสอบแล้ว','2024-03-23 18:58:47'),(171,'ได้ทำตรวจสอบแล้ว','2024-03-23 18:59:25'),(172,'ได้ทำตรวจสอบแล้ว','2024-03-23 18:59:38'),(173,'ได้ทำตรวจสอบแล้ว','2024-03-23 19:00:50'),(174,'ได้ทำตรวจสอบแล้ว','2024-03-23 19:02:33'),(175,'ได้ทำตรวจสอบแล้ว','2024-03-23 19:02:41'),(176,'ได้ทำตรวจสอบแล้ว','2024-03-23 19:03:14'),(177,'ได้ทำตรวจสอบแล้ว','2024-03-23 19:04:33'),(178,'ได้ทำตรวจสอบแล้ว','2024-03-23 20:17:46'),(179,'ได้ทำตรวจสอบแล้ว','2024-03-24 16:59:44'),(180,'เปลี่ยนวิชา 9 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-24 17:07:07'),(181,'เปลี่ยนวิชา 9 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-24 17:07:07'),(182,'เปลี่ยนวิชา 10 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-24 17:07:07'),(183,'เปลี่ยนวิชา 10 จาก user_id 1 เป็น สถานะ ไม่ผ่าน','2024-03-24 17:07:07'),(184,'เปลี่ยนวิชา 11 จาก user_id 13 เป็น สถานะ ไม่ผ่าน','2024-03-24 17:07:07'),(185,'เปลี่ยนวิชา 11 จาก user_id 13 เป็น สถานะ ไม่ผ่าน','2024-03-24 17:07:07'),(186,'เปลี่ยนวิชา 14 จาก user_id 4 เป็น สถานะ ไม่ผ่าน','2024-03-24 17:07:07'),(187,'เปลี่ยนวิชา 14 จาก user_id 4 เป็น สถานะ ไม่ผ่าน','2024-03-24 17:07:07'),(188,'เปลี่ยนวิชา 14 จาก user_id 4 เป็น สถานะ ไม่ผ่าน','2024-03-24 17:07:07'),(189,'เปลี่ยนวิชา 15 จาก user_id 5 เป็น สถานะ ไม่ผ่าน','2024-03-24 17:07:07'),(190,'เปลี่ยนวิชา 8 จาก user_id 1 เป็น สถานะผ่าน','2024-03-24 17:07:07'),(191,'เปลี่ยนวิชา 12 จาก user_id 13 เป็น สถานะผ่าน','2024-03-24 17:07:07'),(192,'เปลี่ยนวิชา 13 จาก user_id 2 เป็น สถานะผ่าน','2024-03-24 17:07:07'),(193,'ได้ทำตรวจสอบแล้ว','2024-03-24 17:07:07'),(194,'ได้ทำตรวจสอบแล้ว','2024-03-24 17:07:12'),(195,'เปลี่ยนวิชา 11 จาก user_id 13 เป็น สถานะผ่าน','2024-03-24 17:15:39'),(196,'ได้ทำตรวจสอบแล้ว','2024-03-24 17:15:39');
/*!40000 ALTER TABLE `log_auto_detect` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log_tablechange`
--

DROP TABLE IF EXISTS `log_tablechange`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log_tablechange` (
  `id` int NOT NULL AUTO_INCREMENT,
  `datetime` datetime DEFAULT NULL,
  `msg` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_tablechange`
--

LOCK TABLES `log_tablechange` WRITE;
/*!40000 ALTER TABLE `log_tablechange` DISABLE KEYS */;
INSERT INTO `log_tablechange` VALUES (1,'2024-03-11 15:45:52','undefined เพิ่มใน มาม่า ในroleที่ id=15'),(2,'2024-03-11 15:47:43','yongkeat.s@ku.th เพิ่มใน ใคร ในroleที่ id=54'),(3,'2024-03-11 15:47:52','yongkeat.s@ku.th ทำการลบ role 54'),(4,'2024-03-11 15:47:59','yongkeat.s@ku.th ทำการลบ role 15'),(5,'2024-03-11 15:48:03','yongkeat.s@ku.th ทำการลบ role 12'),(6,'2024-03-11 15:48:06','yongkeat.s@ku.th ทำการลบ role 8'),(7,'2024-03-11 15:48:10','yongkeat.s@ku.th ทำการลบ role 7'),(8,'2024-03-11 15:49:49','yongkeat.s@ku.th เปลี่ยนชื่อเป็น อาจารย์ ใน tablerole 1'),(9,'2024-03-11 15:51:13','yongkeat.s@ku.th  เปลี่ยนชื่อที่ id=1 เป็น ผ่านแล้วนะครับ ใน table status'),(10,'2024-03-11 15:53:04','yongkeat.s@ku.th ทำการลบ table autoday ที่ 1'),(11,'2024-03-11 16:18:35','yongkeat.s@ku.th เปิดบันทึก log id=1'),(12,'2024-03-11 16:18:59','yongkeat.s@ku.th ยกเลิกบันทึก log id=1'),(13,'2024-03-11 16:19:02','yongkeat.s@ku.th เปิดบันทึก log id=1'),(14,'2024-03-23 01:06:42','undefined แก้เวลาตรวจสอบ เป็น 01:08'),(15,'2024-03-23 17:40:00','undefined แก้เวลาตรวจสอบ เป็น 17:41');
/*!40000 ALTER TABLE `log_tablechange` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'อาจารย์'),(2,'แอดมิน'),(3,'ฝ่ายการศึกษา');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'ผ่าน'),(2,'รอ'),(3,'ไม่ผ่าน');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject_category`
--

DROP TABLE IF EXISTS `subject_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject_category`
--

LOCK TABLES `subject_category` WRITE;
/*!40000 ALTER TABLE `subject_category` DISABLE KEYS */;
INSERT INTO `subject_category` VALUES (1,'วิชาบังคับ'),(2,'วิชาแกน'),(3,'วิชาเลือก');
/*!40000 ALTER TABLE `subject_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idsubject` varchar(10) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `credit` varchar(10) NOT NULL,
  `practice_t` int DEFAULT NULL,
  `m_t` int DEFAULT NULL,
  `lecture_t` int DEFAULT NULL,
  `years` varchar(45) DEFAULT NULL,
  `subject_category_id` int NOT NULL,
  `term` int DEFAULT NULL,
  `IsOpen` tinyint NOT NULL,
  `exsub` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Subjects_subject_category1_idx` (`subject_category_id`),
  CONSTRAINT `fk_Subjects_subject_category1` FOREIGN KEY (`subject_category_id`) REFERENCES `subject_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1300 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (1166,'03603171','Introduction to Computer Engineering and Informatics','3',0,6,3,'2565',1,NULL,1,0),(1167,'03603352','Laws and Ethics in Information Technology','3',0,6,3,'2565',1,NULL,1,0),(1168,'03603251','Database Systems','3',0,6,3,'2565',1,NULL,1,0),(1169,'03603252','Database Systems Laboratory','1',3,2,0,'2565',1,NULL,1,0),(1170,'03603212','Abstract Data Types and Problem Solving','3',0,6,3,'2565',1,NULL,1,0),(1171,'03603213','Algorithm Design and Analysis','3',0,6,3,'2565',1,NULL,1,0),(1172,'03603214','Programming Skills Development Laboratory','1',3,2,0,'2565',1,NULL,1,0),(1173,'03603241','Application Development','3',0,6,3,'2565',1,NULL,0,0),(1174,'03603341','Software Engineering','4',3,8,3,'2565',1,NULL,0,0),(1175,'00360334','Combined Information Technology for Software Development Laboratory','1',3,2,0,'2565',1,NULL,0,0),(1176,'03603211','Discrete Mathematics','3',0,6,3,'2565',1,NULL,0,0),(1177,'03603312','Probability and Statistics for Informatics','3',0,6,3,'2565',1,NULL,0,0),(1178,'03603325','Data Communications and Computer Networks','3',0,6,3,'2565',1,NULL,0,0),(1179,'03603332','Operating Systems','3',0,6,3,'2565',1,NULL,0,0),(1180,'03603221','Digital Systems Design','3',0,6,3,'2565',1,NULL,0,0),(1181,'03603222','Logic Circuit Laboratory','1',3,2,0,'2565',1,NULL,0,0),(1182,'03603223','Computer Architecture and Organization','3',0,6,3,'2565',1,NULL,0,0),(1183,'03603323','Introduction to Embedded Systems','3',0,6,3,'2565',1,NULL,0,0),(1184,'03603324','Embedded Systems Laboratory','1',3,2,0,'2565',1,NULL,0,0),(1185,'03603497','Seminar','1',0,0,0,'2565',1,NULL,0,1),(1186,'03603321','Computer Networks Laboratory','3',6,6,1,'2565',3,NULL,1,0),(1187,'03603421','Internetworking with TCP/IP','3',0,6,3,'2565',3,NULL,1,0),(1188,'03603422','Wireless and Mobile Networks','3',0,6,3,'2565',3,NULL,1,0),(1189,'03603423','Network Programming','3',0,6,3,'2565',3,NULL,1,0),(1190,'03603426','Cyber Security','3',0,6,3,'2565',3,NULL,0,0),(1191,'03603427','Mobile Computing','3',0,6,3,'2565',3,NULL,0,0),(1192,'03603428','Internet of Things','3',0,6,3,'2565',3,NULL,0,0),(1193,'03603429','Cryptography and Blockchain Technology','3',0,6,3,'2565',3,NULL,0,0),(1194,'03603411','Functional Programming','3',0,6,3,'2565',3,NULL,0,0),(1195,'03603435','Cloud Computing','3',0,6,3,'2565',3,NULL,0,0),(1196,'03603436','Web Application Development','3',0,6,3,'2565',3,NULL,0,0),(1197,'03603437','Mobile Application Development','3',0,6,3,'2565',3,NULL,0,0),(1198,'03603482','User Experience Design','3',0,6,3,'2565',3,NULL,0,0),(1199,'03603484','Computer Game Development','3',0,6,3,'2565',3,NULL,0,0),(1200,'03603441','Software Testing','3',0,6,3,'2565',3,NULL,0,0),(1201,'03603351','Introduction to Data Science','3',0,6,3,'2565',3,NULL,0,0),(1202,'03603452','Mining Big Data','3',0,6,3,'2565',3,NULL,0,0),(1203,'03603461','Artificial Intelligence','3',0,6,3,'2565',3,NULL,0,0),(1204,'03603462','Machine Learning','3',0,6,3,'2565',3,NULL,0,0),(1205,'03603463','Biologically-Inspired Computational Intelligence','3',0,6,3,'2565',3,NULL,0,0),(1206,'03603465','Natural Language Processing','3',0,6,3,'2565',3,NULL,1,0),(1207,'03603381','Digital Signal Processing for Computer Engineers','3',0,6,3,'2565',3,NULL,1,0),(1208,'03603382','Digital Image Processing','3',0,6,3,'2565',3,NULL,1,0),(1209,'03603383','Digital Identification','3',0,6,3,'2565',3,NULL,1,0),(1210,'03603464','Computer Vision','3',0,6,3,'2565',3,NULL,1,0),(1211,'03603481','Computer Graphics','3',0,6,3,'2565',3,NULL,0,0),(1212,'03603484','Computer Game Development','3',0,6,3,'2565',3,NULL,0,0),(1213,'03603485','Digital Audio and Computer Music','3',0,6,3,'2565',3,NULL,0,0),(1214,'03603371','Application Development for Embedded Devices','3',0,6,3,'2565',3,NULL,0,0),(1215,'03603471','Embedded Systems Interfacing','3',0,6,3,'2565',3,NULL,0,0),(1216,'03603472','Industrial Automation and Control','3',0,6,3,'2565',3,NULL,0,0),(1217,'03603473','Digital Circuit Design with VHDL','3',0,6,3,'2565',3,NULL,0,0),(1218,'03603474','Real-Time Operating System','3',0,6,3,'2565',3,NULL,0,0),(1219,'03603475','Sensors and Transducer','3',0,6,3,'2565',3,NULL,0,0),(1220,'03603476','Embedded System Circuit Design','3',0,6,3,'2565',3,NULL,0,0),(1221,'03603495','Computer Engineering and Informatics Project Preparation','1',3,2,0,'2565',3,NULL,0,0),(1222,'03603499','Computer Engineering and Informatics Project','2',6,3,0,'2565',3,NULL,0,0),(1223,'03603432','Programming Language Concepts','3',0,6,3,'2565',3,NULL,0,0),(1224,'03603451','Information Technology Management','3',0,6,3,'2565',3,NULL,0,0),(1225,'03603496','Selected Topics in Computer Engineering and Informatics','1-3',0,0,0,'2565',3,NULL,1,1),(1226,'03603498','Special Problems','1-3',0,0,0,'2565',3,NULL,1,1),(1227,'03600390','Co-operative Education Preparation','3',0,6,3,'2565',3,NULL,1,0),(1228,'03600490','Co-operative Education','6',0,0,0,'2565',3,NULL,1,1),(1229,'03603111','Programming Fundamentals I','3',3,6,2,'2565',2,NULL,0,0),(1230,'03603112','Programming Fundamentals II','3',3,6,2,'2565',2,NULL,1,0),(1231,'01204111','Computers and Programming','3',3,6,2,'2565',2,NULL,1,0),(1232,'03603101','Introduction to Computer Programming','3',3,6,2,'2565',2,NULL,1,0),(1233,'03603111','Programming Fundamentals I','3',3,6,2,'2563',2,NULL,0,0),(1234,'03603112','Programming Fundamentals II','3',3,6,2,'2563',2,NULL,0,0),(1235,'01204111','Computers and Programming','3',3,6,2,'2563',2,NULL,0,0),(1236,'03603101','Introduction to Computer Programming','3',3,6,2,'2563',2,NULL,0,0),(1237,'03603171','Introduction to Computer Engineering and Informatics','3',0,6,3,'2563',1,NULL,1,0),(1238,'03603352','Laws and Ethics in Information Technology','3',0,6,3,'2563',1,NULL,1,0),(1239,'03603251','Database Systems','3',0,6,3,'2563',1,NULL,1,0),(1240,'03603252','Database Systems Laboratory','1',3,2,0,'2563',1,NULL,0,0),(1241,'03603212','Abstract Data Types and Problem Solving','3',0,6,3,'2563',1,NULL,0,0),(1242,'03603213','Algorithm Design and Analysis','3',0,6,3,'2563',1,NULL,0,0),(1243,'03603214','Programming Skills Development Laboratory','1',3,2,0,'2563',1,NULL,0,0),(1244,'03603241','Application Development','3',0,6,3,'2563',1,NULL,0,0),(1245,'03603341','Software Engineering','4',3,8,3,'2563',1,NULL,0,0),(1246,'00360334','Combined Information Technology for Software Development Laboratory','1',3,2,0,'2563',1,NULL,0,0),(1247,'03603211','Discrete Mathematics','3',0,6,3,'2563',1,NULL,0,0),(1248,'03603312','Probability and Statistics for Informatics','3',0,6,3,'2563',1,NULL,0,0),(1249,'03603325','Data Communications and Computer Networks','3',0,6,3,'2563',1,NULL,0,0),(1250,'03603332','Operating Systems','3',0,6,3,'2563',1,NULL,0,0),(1251,'03603221','Digital Systems Design','3',0,6,3,'2563',1,NULL,0,0),(1252,'03603222','Logic Circuit Laboratory','1',3,2,0,'2563',1,NULL,0,0),(1253,'03603223','Computer Architecture and Organization','3',0,6,3,'2563',1,NULL,0,0),(1254,'03603323','Introduction to Embedded Systems','3',0,6,3,'2563',1,NULL,0,0),(1255,'03603324','Embedded Systems Laboratory','1',3,2,0,'2563',1,NULL,0,0),(1256,'03603497','Seminar','1',0,0,0,'2563',1,NULL,0,1),(1257,'03603321','Computer Networks Laboratory','3',6,6,1,'2563',3,NULL,0,0),(1258,'03603421','Internetworking with TCP/IP','3',0,6,3,'2563',3,NULL,0,0),(1259,'03603422','Wireless and Mobile Networks','3',0,6,3,'2563',3,NULL,0,0),(1260,'03603423','Network Programming','3',0,6,3,'2563',3,NULL,0,0),(1261,'03603426','Cyber Security','3',0,6,3,'2563',3,NULL,0,0),(1262,'03603427','Mobile Computing','3',0,6,3,'2563',3,NULL,0,0),(1263,'03603428','Internet of Things','3',0,6,3,'2563',3,NULL,0,0),(1264,'03603429','Cryptography and Blockchain Technology','3',0,6,3,'2563',3,NULL,0,0),(1265,'03603411','Functional Programming','3',0,6,3,'2563',3,NULL,0,0),(1266,'03603435','Cloud Computing','3',0,6,3,'2563',3,NULL,0,0),(1267,'03603436','Web Application Development','3',0,6,3,'2563',3,NULL,0,0),(1268,'03603437','Mobile Application Development','3',0,6,3,'2563',3,NULL,0,0),(1269,'03603482','User Experience Design','3',0,6,3,'2563',3,NULL,0,0),(1270,'03603484','Computer Game Development','3',0,6,3,'2563',3,NULL,0,0),(1271,'03603441','Software Testing','3',0,6,3,'2563',3,NULL,0,0),(1272,'03603351','Introduction to Data Science','3',0,6,3,'2563',3,NULL,0,0),(1273,'03603452','Mining Big Data','3',0,6,3,'2563',3,NULL,0,0),(1274,'03603461','Artificial Intelligence','3',0,6,3,'2563',3,NULL,0,0),(1275,'03603462','Machine Learning','3',0,6,3,'2563',3,NULL,0,0),(1276,'03603463','Biologically-Inspired Computational Intelligence','3',0,6,3,'2563',3,NULL,0,0),(1277,'03603465','Natural Language Processing','3',0,6,3,'2563',3,NULL,0,0),(1278,'03603381','Digital Signal Processing for Computer Engineers','3',0,6,3,'2563',3,NULL,0,0),(1279,'03603382','Digital Image Processing','3',0,6,3,'2563',3,NULL,0,0),(1280,'03603383','Digital Identification','3',0,6,3,'2563',3,NULL,0,0),(1281,'03603464','Computer Vision','3',0,6,3,'2563',3,NULL,0,0),(1282,'03603481','Computer Graphics','3',0,6,3,'2563',3,NULL,0,0),(1283,'03603484','Computer Game Development','3',0,6,3,'2563',3,NULL,0,0),(1284,'03603485','Digital Audio and Computer Music','3',0,6,3,'2563',3,NULL,0,0),(1285,'03603371','Application Development for Embedded Devices','3',0,6,3,'2563',3,NULL,0,0),(1286,'03603471','Embedded Systems Interfacing','3',0,6,3,'2563',3,NULL,0,0),(1287,'03603472','Industrial Automation and Control','3',0,6,3,'2563',3,NULL,0,0),(1288,'03603473','Digital Circuit Design with VHDL','3',0,6,3,'2563',3,NULL,0,0),(1289,'03603474','Real-Time Operating System','3',0,6,3,'2563',3,NULL,0,0),(1290,'03603475','Sensors and Transducer','3',0,6,3,'2563',3,NULL,0,0),(1291,'03603476','Embedded System Circuit Design','3',0,6,3,'2563',3,NULL,0,0),(1292,'03603495','Computer Engineering and Informatics Project Preparation','1',3,2,0,'2563',3,NULL,0,0),(1293,'03603499','Computer Engineering and Informatics Project','2',6,3,0,'2563',3,NULL,0,0),(1294,'03603432','Programming Language Concepts','3',0,6,3,'2563',3,NULL,0,0),(1295,'03603451','Information Technology Management','3',0,6,3,'2563',3,NULL,0,0),(1296,'03603496','Selected Topics in Computer Engineering and Informatics','1-3',0,0,0,'2563',3,NULL,0,1),(1297,'03603498','Special Problems','1-3',0,0,0,'2563',3,NULL,0,1),(1298,'03600390','Co-operative Education Preparation','3',0,6,3,'2563',3,NULL,0,0),(1299,'03600490','Co-operative Education','6',0,0,0,'2563',3,NULL,0,1);
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjectsRegister`
--

DROP TABLE IF EXISTS `subjectsRegister`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjectsRegister` (
  `id` int NOT NULL AUTO_INCREMENT,
  `User_id` int NOT NULL,
  `st` time DEFAULT NULL,
  `et` time DEFAULT NULL,
  `day_id` int NOT NULL,
  `sec` varchar(10) DEFAULT NULL,
  `status_id` int NOT NULL,
  `N_people` int NOT NULL,
  `branch` json NOT NULL,
  `category_id` int NOT NULL,
  `Subjects_id` int NOT NULL,
  `realcredit` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_SubjectsRegister_User1_idx` (`User_id`),
  KEY `fk_SubjectsRegister_day1_idx` (`day_id`),
  KEY `fk_SubjectsRegister_status1_idx` (`status_id`),
  KEY `fk_SubjectsRegister_category1_idx` (`category_id`),
  KEY `fk_SubjectsRegister_Subjects1_idx` (`Subjects_id`),
  CONSTRAINT `fk_SubjectsRegister_category1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `fk_SubjectsRegister_day1` FOREIGN KEY (`day_id`) REFERENCES `day` (`id`),
  CONSTRAINT `fk_SubjectsRegister_status1` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  CONSTRAINT `fk_SubjectsRegister_Subjects1` FOREIGN KEY (`Subjects_id`) REFERENCES `subjects` (`id`),
  CONSTRAINT `fk_SubjectsRegister_User1` FOREIGN KEY (`User_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjectsRegister`
--

LOCK TABLES `subjectsRegister` WRITE;
/*!40000 ALTER TABLE `subjectsRegister` DISABLE KEYS */;
INSERT INTO `subjectsRegister` VALUES (8,1,'09:00:00','12:00:00',1,'800',1,120,'{\"T12\": [2]}',1,1239,0),(9,1,'13:00:00','16:00:00',1,'830',3,50,'{\"T12\": [2]}',2,1169,0),(10,1,'16:30:00','19:30:00',1,'831',3,70,'{\"T12\": [2]}',2,1169,0),(11,13,'14:00:00','15:00:00',3,'800',1,120,'{\"T12\": [1]}',1,1171,0),(12,13,'09:00:00','12:00:00',1,'800',1,50,'{\"T12\": [3, 4]}',1,1189,0),(13,2,'13:00:00','15:00:00',1,'801',1,50,'{\"T12\": [3, 4]}',1,1189,0),(14,4,'15:00:00','17:00:00',1,'801/830',3,60,'{\"T12\": [3, 4]}',3,1171,0),(15,5,'17:00:00','17:50:00',1,'800/830',3,10,'{\"T12\": [3, 4]}',3,1174,0);
/*!40000 ALTER TABLE `subjectsRegister` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timeSystem`
--

DROP TABLE IF EXISTS `timeSystem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timeSystem` (
  `status` int NOT NULL,
  `S_date` date DEFAULT NULL,
  `E_date` date DEFAULT NULL,
  `S_time` time DEFAULT NULL,
  `E_time` time DEFAULT NULL,
  `id` int NOT NULL,
  `type` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timeSystem`
--

LOCK TABLES `timeSystem` WRITE;
/*!40000 ALTER TABLE `timeSystem` DISABLE KEYS */;
INSERT INTO `timeSystem` VALUES (1,'2024-02-21','2024-03-07','09:42:00','10:43:00',1,0);
/*!40000 ALTER TABLE `timeSystem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_User_role_idx` (`role_id`),
  CONSTRAINT `fk_User_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'yongkeat.s@ku.th','ยงเกียรติ หล่อ',1),(2,'jenny.yatika@gmail.com','gen',2),(3,'jakkapop80@gmail.com','mann โต',2),(4,'revoitz158@gmail.com','ใคร',2),(5,'nitharee2@gmail.com','ฟ้า',2),(6,'nattapon.ron@ku.th','เฟ้ม',1),(7,'gamertvgentleman@gmail.com ','กานต์2',2),(8,'choakthawee.n@ku.th ','กานต์1',1),(13,'ptii2x@gmail.com','ปีเตอร์',3);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-24 19:28:07
