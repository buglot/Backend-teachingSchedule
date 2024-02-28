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
-- Table structure for table `autodetect`
--

DROP TABLE IF EXISTS `autodetect`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `autodetect` (
  `date` datetime NOT NULL,
  `latesedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autodetect`
--

LOCK TABLES `autodetect` WRITE;
/*!40000 ALTER TABLE `autodetect` DISABLE KEYS */;
/*!40000 ALTER TABLE `autodetect` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
INSERT INTO `file` VALUES (14,'2024-02-28 07:45:27','course_2565.xlsx','/download/course_2565.xlsx',NULL,2565);
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject_category`
--

LOCK TABLES `subject_category` WRITE;
/*!40000 ALTER TABLE `subject_category` DISABLE KEYS */;
INSERT INTO `subject_category` VALUES (1,'วิชาบังคับ'),(2,'วิชาเลือก'),(3,'วิชาเอก');
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
  `credit` int NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=1036 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (971,'03603111','Programming Fundamentals I',3,3,6,2,'2565',3,NULL,0,0),(972,'03603112','Programming Fundamentals II',3,3,6,2,'2565',3,NULL,0,0),(973,'01204111','Computers and Programming',3,3,6,2,'2565',3,NULL,0,0),(974,'03603101','Introduction to Computer Programming',3,3,6,2,'2565',3,NULL,0,0),(975,'03603171','Introduction to Computer Engineering and Informatics',3,0,6,3,'2565',1,NULL,0,0),(976,'03603352','Laws and Ethics in Information Technology',3,0,6,3,'2565',1,NULL,0,0),(977,'03603251','Database Systems',3,0,6,3,'2565',1,NULL,0,0),(978,'03603252','Database Systems Laboratory',1,3,2,0,'2565',1,NULL,0,0),(979,'03603212','Abstract Data Types and Problem Solving',3,0,6,3,'2565',1,NULL,0,0),(980,'03603213','Algorithm Design and Analysis',3,0,6,3,'2565',1,NULL,0,0),(981,'03603214','Programming Skills Development Laboratory',1,3,2,0,'2565',1,NULL,0,0),(982,'03603241','Application Development',3,0,6,3,'2565',1,NULL,0,0),(983,'03603341','Software Engineering',4,3,8,3,'2565',1,NULL,0,0),(984,'00360334','Combined Information Technology for Software Development Laboratory',1,3,2,0,'2565',1,NULL,0,0),(985,'03603211','Discrete Mathematics',3,0,6,3,'2565',1,NULL,0,0),(986,'03603312','Probability and Statistics for Informatics',3,0,6,3,'2565',1,NULL,0,0),(987,'03603325','Data Communications and Computer Networks',3,0,6,3,'2565',1,NULL,0,0),(988,'03603332','Operating Systems',3,0,6,3,'2565',1,NULL,0,0),(989,'03603221','Digital Systems Design',3,0,6,3,'2565',1,NULL,0,0),(990,'03603222','Logic Circuit Laboratory',1,3,2,0,'2565',1,NULL,0,0),(991,'03603223','Computer Architecture and Organization',3,0,6,3,'2565',1,NULL,0,0),(992,'03603323','Introduction to Embedded Systems',3,0,6,3,'2565',1,NULL,0,0),(993,'03603324','Embedded Systems Laboratory',1,3,2,0,'2565',1,NULL,0,0),(994,'03603497','Seminar',1,0,0,0,'2565',1,NULL,0,1),(995,'03603321','Computer Networks Laboratory',3,6,6,1,'2565',2,NULL,0,0),(996,'03603421','Internetworking with TCP/IP',3,0,6,3,'2565',2,NULL,0,0),(997,'03603422','Wireless and Mobile Networks',3,0,6,3,'2565',2,NULL,0,0),(998,'03603423','Network Programming',3,0,6,3,'2565',2,NULL,0,0),(999,'03603426','Cyber Security',3,0,6,3,'2565',2,NULL,0,0),(1000,'03603427','Mobile Computing',3,0,6,3,'2565',2,NULL,0,0),(1001,'03603428','Internet of Things',3,0,6,3,'2565',2,NULL,0,0),(1002,'03603429','Cryptography and Blockchain Technology',3,0,6,3,'2565',2,NULL,0,0),(1003,'03603411','Functional Programming',3,0,6,3,'2565',2,NULL,0,0),(1004,'03603435','Cloud Computing',3,0,6,3,'2565',2,NULL,0,0),(1005,'03603436','Web Application Development',3,0,6,3,'2565',2,NULL,0,0),(1006,'03603437','Mobile Application Development',3,0,6,3,'2565',2,NULL,0,0),(1007,'03603482','User Experience Design',3,0,6,3,'2565',2,NULL,0,0),(1008,'03603484','Computer Game Development',3,0,6,3,'2565',2,NULL,0,0),(1009,'03603441','Software Testing',3,0,6,3,'2565',2,NULL,0,0),(1010,'03603351','Introduction to Data Science',3,0,6,3,'2565',2,NULL,0,0),(1011,'03603452','Mining Big Data',3,0,6,3,'2565',2,NULL,0,0),(1012,'03603461','Artificial Intelligence',3,0,6,3,'2565',2,NULL,0,0),(1013,'03603462','Machine Learning',3,0,6,3,'2565',2,NULL,0,0),(1014,'03603463','Biologically-Inspired Computational Intelligence',3,0,6,3,'2565',2,NULL,0,0),(1015,'03603465','Natural Language Processing',3,0,6,3,'2565',2,NULL,0,0),(1016,'03603381','Digital Signal Processing for Computer Engineers',3,0,6,3,'2565',2,NULL,0,0),(1017,'03603382','Digital Image Processing',3,0,6,3,'2565',2,NULL,0,0),(1018,'03603383','Digital Identification',3,0,6,3,'2565',2,NULL,0,0),(1019,'03603464','Computer Vision',3,0,6,3,'2565',2,NULL,0,0),(1020,'03603481','Computer Graphics',3,0,6,3,'2565',2,NULL,0,0),(1021,'03603484','Computer Game Development',3,0,6,3,'2565',2,NULL,0,0),(1022,'03603485','Digital Audio and Computer Music',3,0,6,3,'2565',2,NULL,0,0),(1023,'03603371','Application Development for Embedded Devices',3,0,6,3,'2565',2,NULL,0,0),(1024,'03603471','Embedded Systems Interfacing',3,0,6,3,'2565',2,NULL,0,0),(1025,'03603472','Industrial Automation and Control',3,0,6,3,'2565',2,NULL,0,0),(1026,'03603473','Digital Circuit Design with VHDL',3,0,6,3,'2565',2,NULL,0,0),(1027,'03603474','Real-Time Operating System',3,0,6,3,'2565',2,NULL,0,0),(1028,'03603475','Sensors and Transducer',3,0,6,3,'2565',2,NULL,0,0),(1029,'03603476','Embedded System Circuit Design',3,0,6,3,'2565',2,NULL,0,0),(1030,'03603495','Computer Engineering and Informatics Project Preparation',1,3,2,0,'2565',2,NULL,0,0),(1031,'03603499','Computer Engineering and Informatics Project',2,6,3,0,'2565',2,NULL,0,0),(1032,'03603432','Programming Language Concepts',3,0,6,3,'2565',2,NULL,0,0),(1033,'03603451','Information Technology Management',3,0,6,3,'2565',2,NULL,0,0),(1034,'03600390','Co-operative Education Preparation',3,0,6,3,'2565',2,NULL,0,0),(1035,'03600490','Co-operative Education',6,0,0,0,'2565',2,NULL,0,1);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timeSystem`
--

LOCK TABLES `timeSystem` WRITE;
/*!40000 ALTER TABLE `timeSystem` DISABLE KEYS */;
INSERT INTO `timeSystem` VALUES (1,NULL,NULL,NULL,NULL,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'yongkeat.s@ku.th','ยงเกียรติ หล่อ',2),(2,'jenny.yatika@gmail.com','gen',2),(3,'jakkapop80@gmail.com','mann โต',2),(4,'revoitz158@gmail.com','ใคร',2),(5,'nitharee2@gmail.com','ฟ้า',2),(12,'ptii2x@gmail.com','ปีเตอร์',3);
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

-- Dump completed on 2024-02-28 14:48:45
