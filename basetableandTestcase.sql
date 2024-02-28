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
INSERT INTO `subjects` VALUES (1036,'03603111','Programming Fundamentals I','3',3,6,2,'2565',3,NULL,0,0),(1037,'03603112','Programming Fundamentals II','3',3,6,2,'2565',3,NULL,0,0),(1038,'01204111','Computers and Programming','3',3,6,2,'2565',3,NULL,0,0),(1039,'03603101','Introduction to Computer Programming','3',3,6,2,'2565',3,NULL,0,0),(1040,'03603171','Introduction to Computer Engineering and Informatics','3',0,6,3,'2565',1,NULL,0,0),(1041,'03603352','Laws and Ethics in Information Technology','3',0,6,3,'2565',1,NULL,0,0),(1042,'03603251','Database Systems','3',0,6,3,'2565',1,NULL,0,0),(1043,'03603252','Database Systems Laboratory','1',3,2,0,'2565',1,NULL,0,0),(1044,'03603212','Abstract Data Types and Problem Solving','3',0,6,3,'2565',1,NULL,0,0),(1045,'03603213','Algorithm Design and Analysis','3',0,6,3,'2565',1,NULL,0,0),(1046,'03603214','Programming Skills Development Laboratory','1',3,2,0,'2565',1,NULL,0,0),(1047,'03603241','Application Development','3',0,6,3,'2565',1,NULL,0,0),(1048,'03603341','Software Engineering','4',3,8,3,'2565',1,NULL,0,0),(1049,'00360334','Combined Information Technology for Software Development Laboratory','1',3,2,0,'2565',1,NULL,0,0),(1050,'03603211','Discrete Mathematics','3',0,6,3,'2565',1,NULL,0,0),(1051,'03603312','Probability and Statistics for Informatics','3',0,6,3,'2565',1,NULL,0,0),(1052,'03603325','Data Communications and Computer Networks','3',0,6,3,'2565',1,NULL,0,0),(1053,'03603332','Operating Systems','3',0,6,3,'2565',1,NULL,0,0),(1054,'03603221','Digital Systems Design','3',0,6,3,'2565',1,NULL,0,0),(1055,'03603222','Logic Circuit Laboratory','1',3,2,0,'2565',1,NULL,0,0),(1056,'03603223','Computer Architecture and Organization','3',0,6,3,'2565',1,NULL,0,0),(1057,'03603323','Introduction to Embedded Systems','3',0,6,3,'2565',1,NULL,0,0),(1058,'03603324','Embedded Systems Laboratory','1',3,2,0,'2565',1,NULL,0,0),(1059,'03603497','Seminar','1',0,0,0,'2565',1,NULL,0,1),(1060,'03603321','Computer Networks Laboratory','3',6,6,1,'2565',2,NULL,0,0),(1061,'03603421','Internetworking with TCP/IP','3',0,6,3,'2565',2,NULL,0,0),(1062,'03603422','Wireless and Mobile Networks','3',0,6,3,'2565',2,NULL,0,0),(1063,'03603423','Network Programming','3',0,6,3,'2565',2,NULL,0,0),(1064,'03603426','Cyber Security','3',0,6,3,'2565',2,NULL,0,0),(1065,'03603427','Mobile Computing','3',0,6,3,'2565',2,NULL,0,0),(1066,'03603428','Internet of Things','3',0,6,3,'2565',2,NULL,0,0),(1067,'03603429','Cryptography and Blockchain Technology','3',0,6,3,'2565',2,NULL,0,0),(1068,'03603411','Functional Programming','3',0,6,3,'2565',2,NULL,0,0),(1069,'03603435','Cloud Computing','3',0,6,3,'2565',2,NULL,0,0),(1070,'03603436','Web Application Development','3',0,6,3,'2565',2,NULL,0,0),(1071,'03603437','Mobile Application Development','3',0,6,3,'2565',2,NULL,0,0),(1072,'03603482','User Experience Design','3',0,6,3,'2565',2,NULL,0,0),(1073,'03603484','Computer Game Development','3',0,6,3,'2565',2,NULL,0,0),(1074,'03603441','Software Testing','3',0,6,3,'2565',2,NULL,0,0),(1075,'03603351','Introduction to Data Science','3',0,6,3,'2565',2,NULL,0,0),(1076,'03603452','Mining Big Data','3',0,6,3,'2565',2,NULL,0,0),(1077,'03603461','Artificial Intelligence','3',0,6,3,'2565',2,NULL,0,0),(1078,'03603462','Machine Learning','3',0,6,3,'2565',2,NULL,0,0),(1079,'03603463','Biologically-Inspired Computational Intelligence','3',0,6,3,'2565',2,NULL,0,0),(1080,'03603465','Natural Language Processing','3',0,6,3,'2565',2,NULL,0,0),(1081,'03603381','Digital Signal Processing for Computer Engineers','3',0,6,3,'2565',2,NULL,0,0),(1082,'03603382','Digital Image Processing','3',0,6,3,'2565',2,NULL,0,0),(1083,'03603383','Digital Identification','3',0,6,3,'2565',2,NULL,0,0),(1084,'03603464','Computer Vision','3',0,6,3,'2565',2,NULL,0,0),(1085,'03603481','Computer Graphics','3',0,6,3,'2565',2,NULL,0,0),(1086,'03603484','Computer Game Development','3',0,6,3,'2565',2,NULL,0,0),(1087,'03603485','Digital Audio and Computer Music','3',0,6,3,'2565',2,NULL,0,0),(1088,'03603371','Application Development for Embedded Devices','3',0,6,3,'2565',2,NULL,0,0),(1089,'03603471','Embedded Systems Interfacing','3',0,6,3,'2565',2,NULL,0,0),(1090,'03603472','Industrial Automation and Control','3',0,6,3,'2565',2,NULL,0,0),(1091,'03603473','Digital Circuit Design with VHDL','3',0,6,3,'2565',2,NULL,0,0),(1092,'03603474','Real-Time Operating System','3',0,6,3,'2565',2,NULL,0,0),(1093,'03603475','Sensors and Transducer','3',0,6,3,'2565',2,NULL,0,0),(1094,'03603476','Embedded System Circuit Design','3',0,6,3,'2565',2,NULL,0,0),(1095,'03603495','Computer Engineering and Informatics Project Preparation','1',3,2,0,'2565',2,NULL,0,0),(1096,'03603499','Computer Engineering and Informatics Project','2',6,3,0,'2565',2,NULL,0,0),(1097,'03603432','Programming Language Concepts','3',0,6,3,'2565',2,NULL,0,0),(1098,'03603451','Information Technology Management','3',0,6,3,'2565',2,NULL,0,0),(1099,'03600390','Co-operative Education Preparation','3',0,6,3,'2565',2,NULL,0,0),(1100,'03600490','Co-operative Education','6',0,0,0,'2565',2,NULL,0,1),(1101,'03603111','Programming Fundamentals I','3',3,6,2,'2567',3,NULL,0,0),(1102,'03603112','Programming Fundamentals II','3',3,6,2,'2567',3,NULL,0,0),(1103,'01204111','Computers and Programming','3',3,6,2,'2567',3,NULL,0,0),(1104,'03603101','Introduction to Computer Programming','3',3,6,2,'2567',3,NULL,0,0),(1105,'03603171','Introduction to Computer Engineering and Informatics','3',0,6,3,'2567',1,NULL,0,0),(1106,'03603352','Laws and Ethics in Information Technology','3',0,6,3,'2567',1,NULL,0,0),(1107,'03603251','Database Systems','3',0,6,3,'2567',1,NULL,0,0),(1108,'03603252','Database Systems Laboratory','1',3,2,0,'2567',1,NULL,0,0),(1109,'03603212','Abstract Data Types and Problem Solving','3',0,6,3,'2567',1,NULL,0,0),(1110,'03603213','Algorithm Design and Analysis','3',0,6,3,'2567',1,NULL,0,0),(1111,'03603214','Programming Skills Development Laboratory','1',3,2,0,'2567',1,NULL,0,0),(1112,'03603241','Application Development','3',0,6,3,'2567',1,NULL,0,0),(1113,'03603341','Software Engineering','4',3,8,3,'2567',1,NULL,0,0),(1114,'00360334','Combined Information Technology for Software Development Laboratory','1',3,2,0,'2567',1,NULL,0,0),(1115,'03603211','Discrete Mathematics','3',0,6,3,'2567',1,NULL,0,0),(1116,'03603312','Probability and Statistics for Informatics','3',0,6,3,'2567',1,NULL,0,0),(1117,'03603325','Data Communications and Computer Networks','3',0,6,3,'2567',1,NULL,0,0),(1118,'03603332','Operating Systems','3',0,6,3,'2567',1,NULL,0,0),(1119,'03603221','Digital Systems Design','3',0,6,3,'2567',1,NULL,0,0),(1120,'03603222','Logic Circuit Laboratory','1',3,2,0,'2567',1,NULL,0,0),(1121,'03603223','Computer Architecture and Organization','3',0,6,3,'2567',1,NULL,0,0),(1122,'03603323','Introduction to Embedded Systems','3',0,6,3,'2567',1,NULL,0,0),(1123,'03603324','Embedded Systems Laboratory','1',3,2,0,'2567',1,NULL,0,0),(1124,'03603497','Seminar','1',0,0,0,'2567',1,NULL,0,1),(1125,'03603321','Computer Networks Laboratory','3',6,6,1,'2567',2,NULL,0,0),(1126,'03603421','Internetworking with TCP/IP','3',0,6,3,'2567',2,NULL,0,0),(1127,'03603422','Wireless and Mobile Networks','3',0,6,3,'2567',2,NULL,0,0),(1128,'03603423','Network Programming','3',0,6,3,'2567',2,NULL,0,0),(1129,'03603426','Cyber Security','3',0,6,3,'2567',2,NULL,0,0),(1130,'03603427','Mobile Computing','3',0,6,3,'2567',2,NULL,0,0),(1131,'03603428','Internet of Things','3',0,6,3,'2567',2,NULL,0,0),(1132,'03603429','Cryptography and Blockchain Technology','3',0,6,3,'2567',2,NULL,0,0),(1133,'03603411','Functional Programming','3',0,6,3,'2567',2,NULL,0,0),(1134,'03603435','Cloud Computing','3',0,6,3,'2567',2,NULL,0,0),(1135,'03603436','Web Application Development','3',0,6,3,'2567',2,NULL,0,0),(1136,'03603437','Mobile Application Development','3',0,6,3,'2567',2,NULL,0,0),(1137,'03603482','User Experience Design','3',0,6,3,'2567',2,NULL,0,0),(1138,'03603484','Computer Game Development','3',0,6,3,'2567',2,NULL,0,0),(1139,'03603441','Software Testing','3',0,6,3,'2567',2,NULL,0,0),(1140,'03603351','Introduction to Data Science','3',0,6,3,'2567',2,NULL,0,0),(1141,'03603452','Mining Big Data','3',0,6,3,'2567',2,NULL,0,0),(1142,'03603461','Artificial Intelligence','3',0,6,3,'2567',2,NULL,0,0),(1143,'03603462','Machine Learning','3',0,6,3,'2567',2,NULL,0,0),(1144,'03603463','Biologically-Inspired Computational Intelligence','3',0,6,3,'2567',2,NULL,0,0),(1145,'03603465','Natural Language Processing','3',0,6,3,'2567',2,NULL,0,0),(1146,'03603381','Digital Signal Processing for Computer Engineers','3',0,6,3,'2567',2,NULL,0,0),(1147,'03603382','Digital Image Processing','3',0,6,3,'2567',2,NULL,0,0),(1148,'03603383','Digital Identification','3',0,6,3,'2567',2,NULL,0,0),(1149,'03603464','Computer Vision','3',0,6,3,'2567',2,NULL,0,0),(1150,'03603481','Computer Graphics','3',0,6,3,'2567',2,NULL,0,0),(1151,'03603484','Computer Game Development','3',0,6,3,'2567',2,NULL,0,0),(1152,'03603485','Digital Audio and Computer Music','3',0,6,3,'2567',2,NULL,0,0),(1153,'03603371','Application Development for Embedded Devices','3',0,6,3,'2567',2,NULL,0,0),(1154,'03603471','Embedded Systems Interfacing','3',0,6,3,'2567',2,NULL,0,0),(1155,'03603472','Industrial Automation and Control','3',0,6,3,'2567',2,NULL,0,0),(1156,'03603473','Digital Circuit Design with VHDL','3',0,6,3,'2567',2,NULL,0,0),(1157,'03603474','Real-Time Operating System','3',0,6,3,'2567',2,NULL,0,0),(1158,'03603475','Sensors and Transducer','3',0,6,3,'2567',2,NULL,0,0),(1159,'03603476','Embedded System Circuit Design','3',0,6,3,'2567',2,NULL,0,0),(1160,'03603495','Computer Engineering and Informatics Project Preparation','1',3,2,0,'2567',2,NULL,0,0),(1161,'03603499','Computer Engineering and Informatics Project','2',6,3,0,'2567',2,NULL,0,0),(1162,'03603432','Programming Language Concepts','3',0,6,3,'2567',2,NULL,0,0),(1163,'03603451','Information Technology Management','3',0,6,3,'2567',2,NULL,0,0),(1164,'03600390','Co-operative Education Preparation','3',0,6,3,'2567',2,NULL,0,0),(1165,'03600490','Co-operative Education','6',0,0,0,'2567',2,NULL,0,1);
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
  `type` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timeSystem`
--

LOCK TABLES `timeSystem` WRITE;
/*!40000 ALTER TABLE `timeSystem` DISABLE KEYS */;
INSERT INTO `timeSystem` VALUES (1,'2024-02-21','2024-03-02','09:42:00','10:43:00',1,1);
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

-- Dump completed on 2024-02-28 17:18:46
