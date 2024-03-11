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
INSERT INTO `day` VALUES (4,'วันพฤหัส'),(3,'วันพุธ'),(5,'วันศุกร์'),(1,'วันอะไรคือวันแรกของสัปดา'),(2,'วันอังคาร'),(7,'วันอาทิตย์'),(6,'วันเสาร์');
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
INSERT INTO `file` VALUES (15,'2024-02-28 10:12:41','course_2565.xlsx','/download/course_2565.xlsx',NULL,2565),(16,'2024-02-28 10:12:41','course_2567.xlsx','/download/course_2567.xlsx',NULL,2567);
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
INSERT INTO `focus_sub_cat` VALUES (3,2);
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
INSERT INTO `historyautodetect` VALUES ('04:12:00',NULL,1,1),('00:00:00',NULL,2,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_auto_detect`
--

LOCK TABLES `log_auto_detect` WRITE;
/*!40000 ALTER TABLE `log_auto_detect` DISABLE KEYS */;
INSERT INTO `log_auto_detect` VALUES (1,'ได้ทำตรวจสอบแล้ว','2024-03-11 13:34:14'),(2,'ได้ทำตรวจสอบแล้ว','2024-03-11 13:34:27'),(3,'ได้ทำตรวจสอบแล้ว','2024-03-11 13:37:17'),(4,'ได้ทำตรวจสอบแล้ว','2024-03-11 13:37:33'),(5,'ได้ทำตรวจสอบแล้ว','2024-03-11 14:13:00'),(6,'ได้ทำตรวจสอบแล้ว','2024-03-11 14:13:07'),(7,'ได้ทำตรวจสอบแล้ว','2024-03-11 14:21:22'),(8,'ได้ทำตรวจสอบแล้ว','2024-03-11 14:22:39'),(9,'ได้ทำตรวจสอบแล้ว','2024-03-11 14:22:48'),(10,'ได้ทำตรวจสอบแล้ว','2024-03-11 14:23:11'),(11,'ได้ทำตรวจสอบแล้ว','2024-03-11 14:23:26'),(12,'ได้ทำตรวจสอบแล้ว','2024-03-11 14:24:03'),(13,'ได้ทำตรวจสอบแล้ว','2024-03-11 14:30:11'),(14,'ได้ทำตรวจสอบแล้ว','2024-03-11 15:21:12'),(15,'ได้ทำตรวจสอบแล้ว','2024-03-11 15:25:40'),(16,'ได้ทำตรวจสอบแล้ว','2024-03-11 15:25:43'),(17,'ได้ทำตรวจสอบแล้ว','2024-03-11 15:25:44'),(18,'ได้ทำตรวจสอบแล้ว','2024-03-11 15:26:42'),(19,'ได้ทำตรวจสอบแล้ว','2024-03-11 15:28:38'),(20,'ได้ทำตรวจสอบแล้ว','2024-03-11 15:30:08'),(21,'ได้ทำตรวจสอบแล้ว','2024-03-11 15:30:17'),(22,'ได้ทำตรวจสอบแล้ว','2024-03-11 15:30:26'),(23,'ได้ทำตรวจสอบแล้ว','2024-03-11 15:31:42'),(24,'ได้ทำตรวจสอบแล้ว','2024-03-11 15:32:10'),(25,'ได้ทำตรวจสอบแล้ว','2024-03-11 15:32:55'),(26,'ได้ทำตรวจสอบแล้ว','2024-03-11 15:33:34'),(27,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 15:40:46'),(28,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 15:42:32'),(29,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 15:42:46'),(30,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 15:43:25'),(31,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 15:44:45'),(32,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 15:45:05'),(33,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 15:49:00'),(34,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 15:49:11'),(35,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 15:49:40'),(36,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 15:50:16'),(37,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 15:50:46'),(38,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 15:56:17'),(39,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 15:57:09'),(40,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 15:58:34'),(41,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 16:04:34'),(42,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 16:06:23'),(43,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 16:14:21'),(44,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 16:15:52'),(45,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 17:44:30'),(46,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 17:44:56'),(47,'ไม่มีวิชาให้ตรวจสอบ','2024-03-11 17:46:56');
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_tablechange`
--

LOCK TABLES `log_tablechange` WRITE;
/*!40000 ALTER TABLE `log_tablechange` DISABLE KEYS */;
INSERT INTO `log_tablechange` VALUES (1,'2024-03-11 15:45:52','undefined เพิ่มใน มาม่า ในroleที่ id=15'),(2,'2024-03-11 15:47:43','yongkeat.s@ku.th เพิ่มใน ใคร ในroleที่ id=54'),(3,'2024-03-11 15:47:52','yongkeat.s@ku.th ทำการลบ role 54'),(4,'2024-03-11 15:47:59','yongkeat.s@ku.th ทำการลบ role 15'),(5,'2024-03-11 15:48:03','yongkeat.s@ku.th ทำการลบ role 12'),(6,'2024-03-11 15:48:06','yongkeat.s@ku.th ทำการลบ role 8'),(7,'2024-03-11 15:48:10','yongkeat.s@ku.th ทำการลบ role 7'),(8,'2024-03-11 15:49:49','yongkeat.s@ku.th เปลี่ยนชื่อเป็น อาจารย์ ใน tablerole 1'),(9,'2024-03-11 15:51:13','yongkeat.s@ku.th  เปลี่ยนชื่อที่ id=1 เป็น ผ่านแล้วนะครับ ใน table status'),(10,'2024-03-11 15:53:04','yongkeat.s@ku.th ทำการลบ table autoday ที่ 1'),(11,'2024-03-11 16:18:35','yongkeat.s@ku.th เปิดบันทึก log id=1'),(12,'2024-03-11 16:18:59','yongkeat.s@ku.th ยกเลิกบันทึก log id=1'),(13,'2024-03-11 16:19:02','yongkeat.s@ku.th เปิดบันทึก log id=1');
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
INSERT INTO `status` VALUES (1,'ผ่านแล้วนะครับ'),(2,'รอ'),(3,'ไม่ผ่าน');
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
INSERT INTO `subject_category` VALUES (2,'วิชาเอก'),(3,'วิชาเลือก');
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
) ENGINE=InnoDB AUTO_INCREMENT=1166 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (1036,'03603111','Programming Fundamentals I','3',3,6,2,'2565',3,NULL,0,0),(1037,'03603112','Programming Fundamentals II','3',3,6,2,'2565',3,NULL,0,0),(1038,'01204111','Computers and Programming','3',3,6,2,'2565',3,NULL,0,0),(1039,'03603101','Introduction to Computer Programming','3',3,6,2,'2565',3,NULL,0,0),(1060,'03603321','Computer Networks Laboratory','3',6,6,1,'2565',2,NULL,0,0),(1061,'03603421','Internetworking with TCP/IP','3',0,6,3,'2565',2,NULL,0,0),(1062,'03603422','Wireless and Mobile Networks','3',0,6,3,'2565',2,NULL,0,0),(1063,'03603423','Network Programming','3',0,6,3,'2565',2,NULL,0,0),(1064,'03603426','Cyber Security','3',0,6,3,'2565',2,NULL,0,0),(1065,'03603427','Mobile Computing','3',0,6,3,'2565',2,NULL,0,0),(1066,'03603428','Internet of Things','3',0,6,3,'2565',2,NULL,0,0),(1067,'03603429','Cryptography and Blockchain Technology','3',0,6,3,'2565',2,NULL,0,0),(1068,'03603411','Functional Programming','3',0,6,3,'2565',2,NULL,0,0),(1069,'03603435','Cloud Computing','3',0,6,3,'2565',2,NULL,0,0),(1070,'03603436','Web Application Development','3',0,6,3,'2565',2,NULL,0,0),(1071,'03603437','Mobile Application Development','3',0,6,3,'2565',2,NULL,0,0),(1072,'03603482','User Experience Design','3',0,6,3,'2565',2,NULL,0,0),(1073,'03603484','Computer Game Development','3',0,6,3,'2565',2,NULL,0,0),(1074,'03603441','Software Testing','3',0,6,3,'2565',2,NULL,0,0),(1075,'03603351','Introduction to Data Science','3',0,6,3,'2565',2,NULL,0,0),(1076,'03603452','Mining Big Data','3',0,6,3,'2565',2,NULL,0,0),(1077,'03603461','Artificial Intelligence','3',0,6,3,'2565',2,NULL,0,0),(1078,'03603462','Machine Learning','3',0,6,3,'2565',2,NULL,0,0),(1079,'03603463','Biologically-Inspired Computational Intelligence','3',0,6,3,'2565',2,NULL,0,0),(1080,'03603465','Natural Language Processing','3',0,6,3,'2565',2,NULL,0,0),(1081,'03603381','Digital Signal Processing for Computer Engineers','3',0,6,3,'2565',2,NULL,0,0),(1082,'03603382','Digital Image Processing','3',0,6,3,'2565',2,NULL,0,0),(1083,'03603383','Digital Identification','3',0,6,3,'2565',2,NULL,0,0),(1084,'03603464','Computer Vision','3',0,6,3,'2565',2,NULL,0,0),(1085,'03603481','Computer Graphics','3',0,6,3,'2565',2,NULL,0,0),(1086,'03603484','Computer Game Development','3',0,6,3,'2565',2,NULL,0,0),(1087,'03603485','Digital Audio and Computer Music','3',0,6,3,'2565',2,NULL,0,0),(1088,'03603371','Application Development for Embedded Devices','3',0,6,3,'2565',2,NULL,0,0),(1089,'03603471','Embedded Systems Interfacing','3',0,6,3,'2565',2,NULL,0,0),(1090,'03603472','Industrial Automation and Control','3',0,6,3,'2565',2,NULL,0,0),(1091,'03603473','Digital Circuit Design with VHDL','3',0,6,3,'2565',2,NULL,0,0),(1092,'03603474','Real-Time Operating System','3',0,6,3,'2565',2,NULL,0,0),(1093,'03603475','Sensors and Transducer','3',0,6,3,'2565',2,NULL,0,0),(1094,'03603476','Embedded System Circuit Design','3',0,6,3,'2565',2,NULL,0,0),(1095,'03603495','Computer Engineering and Informatics Project Preparation','1',3,2,0,'2565',2,NULL,0,0),(1096,'03603499','Computer Engineering and Informatics Project','2',6,3,0,'2565',2,NULL,0,0),(1097,'03603432','Programming Language Concepts','3',0,6,3,'2565',2,NULL,0,0),(1098,'03603451','Information Technology Management','3',0,6,3,'2565',2,NULL,0,0),(1099,'03600390','Co-operative Education Preparation','3',0,6,3,'2565',2,NULL,0,0),(1100,'03600490','Co-operative Education','6',0,0,0,'2565',2,NULL,0,1),(1101,'03603111','Programming Fundamentals I','3',3,6,2,'2567',3,NULL,1,0),(1102,'03603112','Programming Fundamentals II','3',3,6,2,'2567',3,NULL,0,0),(1103,'01204111','Computers and Programming','3',3,6,2,'2567',3,NULL,1,0),(1104,'03603101','Introduction to Computer Programming','3',3,6,2,'2567',3,NULL,0,0),(1125,'03603321','Computer Networks Laboratory','3',6,6,1,'2567',2,NULL,0,0),(1126,'03603421','Internetworking with TCP/IP','3',0,6,3,'2567',2,NULL,0,0),(1127,'03603422','Wireless and Mobile Networks','3',0,6,3,'2567',2,NULL,0,0),(1128,'03603423','Network Programming','3',0,6,3,'2567',2,NULL,0,0),(1129,'03603426','Cyber Security','3',0,6,3,'2567',2,NULL,0,0),(1130,'03603427','Mobile Computing','3',0,6,3,'2567',2,NULL,0,0),(1131,'03603428','Internet of Things','3',0,6,3,'2567',2,NULL,0,0),(1132,'03603429','Cryptography and Blockchain Technology','3',0,6,3,'2567',2,NULL,0,0),(1133,'03603411','Functional Programming','3',0,6,3,'2567',2,NULL,0,0),(1134,'03603435','Cloud Computing','3',0,6,3,'2567',2,NULL,0,0),(1135,'03603436','Web Application Development','3',0,6,3,'2567',2,NULL,0,0),(1136,'03603437','Mobile Application Development','3',0,6,3,'2567',2,NULL,0,0),(1137,'03603482','User Experience Design','3',0,6,3,'2567',2,NULL,0,0),(1138,'03603484','Computer Game Development','3',0,6,3,'2567',2,NULL,0,0),(1139,'03603441','Software Testing','3',0,6,3,'2567',2,NULL,0,0),(1140,'03603351','Introduction to Data Science','3',0,6,3,'2567',2,NULL,0,0),(1141,'03603452','Mining Big Data','3',0,6,3,'2567',2,NULL,0,0),(1142,'03603461','Artificial Intelligence','3',0,6,3,'2567',2,NULL,0,0),(1143,'03603462','Machine Learning','3',0,6,3,'2567',2,NULL,0,0),(1144,'03603463','Biologically-Inspired Computational Intelligence','3',0,6,3,'2567',2,NULL,0,0),(1145,'03603465','Natural Language Processing','3',0,6,3,'2567',2,NULL,0,0),(1146,'03603381','Digital Signal Processing for Computer Engineers','3',0,6,3,'2567',2,NULL,0,0),(1147,'03603382','Digital Image Processing','3',0,6,3,'2567',2,NULL,0,0),(1148,'03603383','Digital Identification','3',0,6,3,'2567',2,NULL,0,0),(1149,'03603464','Computer Vision','3',0,6,3,'2567',2,NULL,0,0),(1150,'03603481','Computer Graphics','3',0,6,3,'2567',2,NULL,0,0),(1151,'03603484','Computer Game Development','3',0,6,3,'2567',2,NULL,0,0),(1152,'03603485','Digital Audio and Computer Music','3',0,6,3,'2567',2,NULL,0,0),(1153,'03603371','Application Development for Embedded Devices','3',0,6,3,'2567',2,NULL,0,0),(1154,'03603471','Embedded Systems Interfacing','3',0,6,3,'2567',2,NULL,0,0),(1155,'03603472','Industrial Automation and Control','3',0,6,3,'2567',2,NULL,0,0),(1156,'03603473','Digital Circuit Design with VHDL','3',0,6,3,'2567',2,NULL,0,0),(1157,'03603474','Real-Time Operating System','3',0,6,3,'2567',2,NULL,0,0),(1158,'03603475','Sensors and Transducer','3',0,6,3,'2567',2,NULL,0,0),(1159,'03603476','Embedded System Circuit Design','3',0,6,3,'2567',2,NULL,0,0),(1160,'03603495','Computer Engineering and Informatics Project Preparation','1',3,2,0,'2567',2,NULL,0,0),(1161,'03603499','Computer Engineering and Informatics Project','2',6,3,0,'2567',2,NULL,0,0),(1162,'03603432','Programming Language Concepts','3',0,6,3,'2567',2,NULL,0,0),(1163,'03603451','Information Technology Management','3',0,6,3,'2567',2,NULL,0,0),(1164,'03600390','Co-operative Education Preparation','3',0,6,3,'2567',2,NULL,0,0),(1165,'03600490','Co-operative Education','6',0,0,0,'2567',2,NULL,0,1);
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
  `sec` varchar(3) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjectsRegister`
--

LOCK TABLES `subjectsRegister` WRITE;
/*!40000 ALTER TABLE `subjectsRegister` DISABLE KEYS */;
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
INSERT INTO `user` VALUES (1,'yongkeat.s@ku.th','ยงเกียรติ หล่อ',2),(2,'jenny.yatika@gmail.com','gen',2),(3,'jakkapop80@gmail.com','mann โต',2),(4,'revoitz158@gmail.com','ใคร',2),(5,'nitharee2@gmail.com','ฟ้า',2),(13,'ptii2x@gmail.com','ปีเตอร์',3);
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

-- Dump completed on 2024-03-11 20:09:25
