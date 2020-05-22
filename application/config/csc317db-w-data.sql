-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: localhost    Database: csc317db
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `comment` varchar(4096) NOT NULL,
  `date` datetime NOT NULL,
  `author_id` int NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`),
  KEY `comments to users_idx` (`author_id`),
  KEY `comments to posts_idx` (`post_id`),
  CONSTRAINT `comments to posts` FOREIGN KEY (`post_id`) REFERENCES `Posts` (`ID`),
  CONSTRAINT `comments to users` FOREIGN KEY (`author_id`) REFERENCES `Users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'hi this is a test comment','2020-05-19 20:29:39',52,5),
(2,'hi this comment 2','2020-05-19 20:57:31',60,5),(3,'mocha cute','2020-05-20 21:11:29',52,16),
(4,'mocha dumb','2020-05-20 21:17:11',59,16),(5,'poopy','2020-05-20 21:59:09',59,12),
(7,'baby','2020-05-20 22:04:15',59,8),(8,'CHONKERS','2020-05-20 22:04:55',60,7),
(9,'blurry','2020-05-21 17:06:13',67,19),(10,'much floof','2020-05-21 17:21:39',60,18);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Posts`
--

DROP TABLE IF EXISTS `Posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Posts` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(128) NOT NULL,
  `Description` varchar(4096) NOT NULL,
  `Photopath` varchar(4096) NOT NULL,
  `Thumbnail` varchar(4096) NOT NULL,
  `Active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  `fk_userid` int NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`),
  KEY `posts to users_idx` (`fk_userid`),
  CONSTRAINT `posts to users` FOREIGN KEY (`fk_userid`) REFERENCES `Users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Posts`
--

LOCK TABLES `Posts` WRITE;
/*!40000 ALTER TABLE `Posts` DISABLE KEYS */;
INSERT INTO `Posts` VALUES (5,'mango3','mango3','public/images/uploads/6e86ae824306adb8d547dc610eab51.jpeg','public/images/uploads/thumbnail-6e86ae824306adb8d547dc610eab51.jpeg',0,'2020-05-17 23:07:48',52),
(6,'mocha1','mocha1','public/images/uploads/895856f32cfbdd065f1b09020cd554.jpeg','public/images/uploads/thumbnail-895856f32cfbdd065f1b09020cd554.jpeg',0,'2020-05-17 23:10:35',52),
(7,'ngasat1','ngasat1','public/images/uploads/34df31c41696e7e3c2a03af8ab8341.jpeg','public/images/uploads/thumbnail-34df31c41696e7e3c2a03af8ab8341.jpeg',0,'2020-05-17 23:13:09',52),
(8,'bob1','bob1','public/images/uploads/e0ab9f4900af9ab0a892088840e0f7.jpeg','public/images/uploads/thumbnail-e0ab9f4900af9ab0a892088840e0f7.jpeg',0,'2020-05-17 23:27:31',52),
(10,'우아ㅏㅏㅏㅏㅏ','우아ㅏㅏㅏㅏ','public/images/uploads/01b82158876db059e97e7a00c79f19.jpeg','public/images/uploads/thumbnail-01b82158876db059e97e7a00c79f19.jpeg',0,'2020-05-17 23:34:03',52),
(12,'mango2','mang2','public/images/uploads/f9289c191fffeb4a6f43d67c6da68f.jpeg','public/images/uploads/thumbnail-f9289c191fffeb4a6f43d67c6da68f.jpeg',0,'2020-05-18 19:39:11',53),
(13,'latte1','latte1','public/images/uploads/a3cbe2b9c1c7dfc6e918aa4db0715f.jpeg','public/images/uploads/thumbnail-a3cbe2b9c1c7dfc6e918aa4db0715f.jpeg',0,'2020-05-18 19:52:50',59),
(14,'mocha1','mocha1','public/images/uploads/405204fa18860affc63f07e3ad82e2.jpeg','public/images/uploads/thumbnail-405204fa18860affc63f07e3ad82e2.jpeg',0,'2020-05-18 19:56:09',59),
(15,'mango3','mangoo','public/images/uploads/a90d9b6ca3973f1929ae901d21acdc.jpeg','public/images/uploads/thumbnail-a90d9b6ca3973f1929ae901d21acdc.jpeg',0,'2020-05-19 00:13:56',35),
(16,'Mocha pretty','mocha with the sun','public/images/uploads/1eada7be56b6755ea1491b65d9a3fb.jpeg','public/images/uploads/thumbnail-1eada7be56b6755ea1491b65d9a3fb.jpeg',0,'2020-05-20 00:29:12',52),
(17,'reno','reno with me','public/images/uploads/60588eca20a02aaee5c665b6a810f6.jpeg','public/images/uploads/thumbnail-60588eca20a02aaee5c665b6a810f6.jpeg',0,'2020-05-21 15:23:22',52),
(18,'reno eating','reno eating from bowl','public/images/uploads/4f518985527ef30da1da44a4e917c8.jpeg','public/images/uploads/thumbnail-4f518985527ef30da1da44a4e917c8.jpeg',0,'2020-05-21 15:41:52',67),
(19,'mocha photoshoot','mocha filtered','public/images/uploads/04c8088a55c092029d46c7282eb401.jpeg','public/images/uploads/thumbnail-04c8088a55c092029d46c7282eb401.jpeg',0,'2020-05-21 15:52:32',67),
(20,'lattteeee','blurry','public/images/uploads/511228dafdd79f1b0de1c630ec4815.jpeg','public/images/uploads/thumbnail-511228dafdd79f1b0de1c630ec4815.jpeg',0,'2020-05-21 17:21:16',60);
/*!40000 ALTER TABLE `Posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(64) NOT NULL,
  `Email` varchar(128) NOT NULL,
  `Password` varchar(128) NOT NULL,
  `UserType` int NOT NULL DEFAULT '0',
  `Active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`),
  UNIQUE KEY `Username_UNIQUE` (`Username`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (33,'user7','user7@mail.com','$2b$10$MYUa/P/KR2DbsvgQWiIXkOH6LlNGDyTYe8S/xuSIkiMo5KSNZKI1y',0,0,'2020-05-09 20:19:39'),
(34,'user8','user8@mail.com','$2b$10$6cuxB03T0PhZve0cD7hwUeAS24GTBhjCHCuG1wWGoBZC0vAX2xLti',0,0,'2020-05-09 20:21:22'),
(35,'user9','user9@mail.com','$2b$10$4yYvQ0Fs3d/qHSS/VYtH2uyzC7T.ri26nePnadXh7actJls/ekxMC',0,0,'2020-05-11 18:33:54'),
(36,'user10','user10@mail.com','$2b$10$H/gWFQIq396ICIcPcsVZIuFCMWtbKAc3GOHF6Jg0lJYxMNvMh2H8.',0,0,'2020-05-11 19:48:07'),
(37,'user11','user11@mail.com','$2b$10$sC6X4btDTRcYhY3oBbVmzOk6yKZ3QPVVpIJvRdcuiGBSeGCjW7EvC',0,0,'2020-05-14 18:15:22'),
(38,'user12','user12@mail.com','$2b$10$Vn8ssuHceAf3CVppacJww.20DlfFpS8uwPfAy6ru/VFy0laj4lU1G',0,0,'2020-05-15 17:58:55'),
(39,'user13','user13@mail.com','$2b$10$7X.qxs8YRxVvXJgFdFWGEOkTG54Kb.GrovFanBsX/YRDGBCo64Ocq',0,0,'2020-05-15 18:25:07'),
(49,'u20','u20@mail.com','1234',0,0,'2020-05-16 21:33:14'),(50,'u21','u21@mail.com','1234',0,0,'2020-05-16 21:43:37'),
(51,'u22','u22@mail.com','1234',0,0,'2020-05-16 21:49:21'),
(52,'u23','u23@mail.com','$2b$10$lrtM/N3G/xgIA77VImDRhOhVsthE8HHW4csabj0RFB0bFBleU/.AS',0,0,'2020-05-16 22:04:51'),
(53,'u24','u24@mail.com','$2b$10$tbCtNXDUKGa0tDB1UtEJl.CTeFrxCktwtXSAgTXD1WmW9c.dl6y5q',0,0,'2020-05-16 22:07:19'),
(54,'u25','u25@mail.com','$2b$10$apecM1D86ic2W1Xbk3CSU.04.Wiiz5F.NQL620K2Iz3up/022vAHS',0,0,'2020-05-16 22:10:08'),
(57,'u28','u28@mail.com','$2b$10$L5pdl4CFyIYR6qoBfIZ2/euVF8lY4k23gyQ6WjS1GMVkyB/bpZTl2',0,0,'2020-05-16 22:22:17'),
(58,'u29','u29@mail.com','$2b$10$SGkOMzyF/zCFxtXyZkrzmu.vWLSTZlBFAwc.//dAcax1Ghm4uvon6',0,0,'2020-05-17 12:03:50'),
(59,'u30','u30@mail.com','$2b$10$3.ltG1D4WJsW/KeRgWQGC.zxiy.7Ori8LZYySrWruZdeOzJ2v1xHa',0,0,'2020-05-17 15:52:56'),
(60,'u31','u31@mail.com','$2b$10$bNbH/LdAtTE9PKIBeAesF.CwrYy7d9NNNnLKVg8pfiqK1qJ2T94Xy',0,0,'2020-05-17 15:55:11'),
(67,'mvc6','m6@mail.com','$2b$10$oH14i3VXcx7mQvO0QqwIZu5Z7xl5A5ZAL8H1UfLfQ0wrCruLQHUXK',0,0,'2020-05-21 14:13:10'),
(68,'mvc7','m7@mail.com','$2b$10$AnjuVhI3V.9FSxcJAi1ERuweRrc2lEBHcqWDrlR48Rw2KsVkxSDje',0,0,'2020-05-21 18:55:03');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-21 21:48:02
