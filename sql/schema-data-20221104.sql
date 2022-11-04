-- MySQL dump 10.19  Distrib 10.3.34-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: cosho
-- ------------------------------------------------------
-- Server version	10.3.34-MariaDB-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `balances`
--

DROP TABLE IF EXISTS `balances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `balances` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uid` int(10) unsigned DEFAULT NULL,
  `amount` varchar(20) DEFAULT NULL,
  `paymeansid` int(10) unsigned DEFAULT NULL,
  `paymeansname` varchar(80) DEFAULT NULL,
  `nettype` varchar(60) DEFAULT NULL,
  `nettypeid` int(10) unsigned DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `type` tinyint(4) DEFAULT NULL COMMENT '1: token , 2: coin , 3: fiat',
  `typestr` varchar(20) DEFAULT NULL COMMENT '1: token , 2: coin , 3: fiat',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `balances`
--

LOCK TABLES `balances` WRITE;
/*!40000 ALTER TABLE `balances` DISABLE KEYS */;
INSERT INTO `balances` VALUES (1,'2022-10-31 14:40:53','2022-11-03 05:40:16',11,'1000000',1,'PURE','ETH_TESTNET_GOERLI',NULL,NULL,NULL,'TOKEN'),(2,'2022-11-03 02:57:37','2022-11-03 05:40:16',10,'1000000',2,'PURE','ETH_TESTNET_GOERLI',NULL,NULL,NULL,'TOKEN');
/*!40000 ALTER TABLE `balances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carriers`
--

DROP TABLE IF EXISTS `carriers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carriers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `name` varchar(60) DEFAULT NULL,
  `phone` varchar(60) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  `idcode` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carriers`
--

LOCK TABLES `carriers` WRITE;
/*!40000 ALTER TABLE `carriers` DISABLE KEYS */;
/*!40000 ALTER TABLE `carriers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coupons` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uid` int(10) unsigned DEFAULT NULL,
  `couponid` int(10) unsigned DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  `startingtimestamp` bigint(20) unsigned DEFAULT NULL,
  `expiry` bigint(20) unsigned DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `code` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupons`
--

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;
/*!40000 ALTER TABLE `coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery`
--

DROP TABLE IF EXISTS `delivery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `delivery` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `itemid` int(10) unsigned DEFAULT NULL,
  `logsalesid` int(10) unsigned DEFAULT NULL,
  `carrierid` int(10) unsigned DEFAULT NULL,
  `requesttimestamp` bigint(20) unsigned DEFAULT NULL,
  `pickuptimestamp` bigint(20) unsigned DEFAULT NULL,
  `arrivaltimestamp` bigint(20) unsigned DEFAULT NULL,
  `currentplace` varchar(100) DEFAULT NULL COMMENT 'last spotted place',
  `currentplacekind` tinyint(3) unsigned DEFAULT NULL COMMENT '0: at storehouse , 1: held by delivery , 2: delivered and held by customer',
  `status` tinyint(3) unsigned DEFAULT NULL COMMENT '0: delivery request made, 1: done , 2: on transit ',
  `streetaddress` varchar(300) DEFAULT NULL,
  `zipcode` varchar(20) DEFAULT NULL,
  `receiverphone` varchar(60) DEFAULT NULL,
  `tracknumber` varchar(100) DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  `expectedarrival` varchar(20) DEFAULT NULL,
  `expectedarrivalstamp` bigint(20) unsigned DEFAULT NULL,
  `statusstr` varchar(60) DEFAULT NULL,
  `orderid` int(10) unsigned DEFAULT NULL,
  `orderuuid` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery`
--

LOCK TABLES `delivery` WRITE;
/*!40000 ALTER TABLE `delivery` DISABLE KEYS */;
/*!40000 ALTER TABLE `delivery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emailverifycodes`
--

DROP TABLE IF EXISTS `emailverifycodes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emailverifycodes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uid` int(10) unsigned DEFAULT NULL,
  `code` varchar(10) DEFAULT NULL,
  `expiry` bigint(20) unsigned DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emailverifycodes`
--

LOCK TABLES `emailverifycodes` WRITE;
/*!40000 ALTER TABLE `emailverifycodes` DISABLE KEYS */;
INSERT INTO `emailverifycodes` VALUES (1,'2022-10-19 02:06:42','2022-10-31 04:32:23',NULL,'182344',1666145802,'cheny5dyh@gmail.com',0),(2,'2022-10-28 08:58:06','2022-10-31 04:28:09',NULL,'791838',1666948086,'bakujin.dev@gmail.com',0),(3,'2022-10-28 08:59:38','2022-10-31 04:28:09',NULL,'935721',1666948178,'bakujin.dev@gmail.com',0),(4,'2022-10-28 09:11:17','2022-10-31 04:28:09',NULL,'579768',1666948877,'bakujin.dev@gmail.com',0),(5,'2022-10-30 01:23:30','2022-10-31 04:32:23',NULL,'369183',1667093190,'cheny5dyh@gmail.com',0),(6,'2022-10-31 03:18:05','2022-10-31 04:28:09',NULL,'904708',1667186465,'bakujin.dev@gmail.com',0),(7,'2022-10-31 03:45:49','2022-10-31 04:28:09',NULL,'930909',1667188129,'bakujin.dev@gmail.com',0),(8,'2022-10-31 04:28:09','2022-10-31 04:28:11',NULL,'805477',1667190669,'bakujin.dev@gmail.com',0),(9,'2022-10-31 04:28:11','2022-10-31 04:28:13',NULL,'139326',1667190671,'bakujin.dev@gmail.com',0),(10,'2022-10-31 04:28:13','2022-10-31 04:29:06',NULL,'348422',1667190673,'bakujin.dev@gmail.com',0),(11,'2022-10-31 04:29:06','2022-10-31 04:43:16',NULL,'787144',1667190726,'bakujin.dev@gmail.com',0),(12,'2022-10-31 04:32:23','2022-11-02 01:22:41',NULL,'615612',1667190923,'cheny5dyh@gmail.com',0),(13,'2022-10-31 04:43:16','2022-10-31 04:43:58',NULL,'174208',1667191576,'bakujin.dev@gmail.com',0),(14,'2022-10-31 04:43:58',NULL,NULL,'575542',1667191618,'bakujin.dev@gmail.com',1),(15,'2022-11-02 01:22:41',NULL,NULL,'848406',1667352341,'cheny5dyh@gmail.com',1),(16,'2022-11-02 12:28:00','2022-11-02 12:28:37',NULL,'730610',1667392260,'aus7inmar7in@gmail.com',0),(17,'2022-11-02 12:28:37','2022-11-02 12:32:02',NULL,'944937',1667392297,'aus7inmar7in@gmail.com',0),(18,'2022-11-02 12:32:02',NULL,NULL,'283247',1667392502,'aus7inmar7in@gmail.com',1),(19,'2022-11-02 13:36:12','2022-11-02 14:03:01',NULL,'741666',1667396352,'salokhiddinov0727@gmail.com',0),(20,'2022-11-02 13:43:39',NULL,NULL,'817232',1667396799,'salokhiddinov19980727@gmail.com',1),(21,'2022-11-02 13:49:02','2022-11-02 14:00:16',NULL,'176659',1667397122,'salokhiddinov6727@gmail.com',0),(22,'2022-11-02 14:00:16',NULL,NULL,'222686',1667397796,'salokhiddinov6727@gmail.com',1),(23,'2022-11-02 14:03:01',NULL,NULL,'646389',1667397961,'salokhiddinov0727@gmail.com',1);
/*!40000 ALTER TABLE `emailverifycodes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `favorites` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `itemuuid` varchar(60) DEFAULT NULL,
  `itemid` int(10) unsigned DEFAULT NULL,
  `uid` int(10) unsigned DEFAULT NULL,
  `status` tinyint(3) unsigned DEFAULT NULL,
  `active` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `featureditem`
--

DROP TABLE IF EXISTS `featureditem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `featureditem` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `itemid` int(10) unsigned DEFAULT NULL,
  `itemuuid` varchar(60) DEFAULT NULL,
  `isfeatured` tinyint(4) DEFAULT NULL COMMENT '0 / 1',
  `active` tinyint(4) DEFAULT NULL COMMENT '0 / 1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `featureditem`
--

LOCK TABLES `featureditem` WRITE;
/*!40000 ALTER TABLE `featureditem` DISABLE KEYS */;
/*!40000 ALTER TABLE `featureditem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `infocarriers`
--

DROP TABLE IF EXISTS `infocarriers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `infocarriers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `name` varchar(60) DEFAULT NULL,
  `phone` varchar(60) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  `idcode` varchar(60) DEFAULT NULL,
  `symbol` varchar(60) DEFAULT NULL,
  `active` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=170 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `infocarriers`
--

LOCK TABLES `infocarriers` WRITE;
/*!40000 ALTER TABLE `infocarriers` DISABLE KEYS */;
INSERT INTO `infocarriers` VALUES (107,'2022-11-01 03:28:31',NULL,'CJ대한통운',NULL,NULL,NULL,NULL,'04','CJ',1),(108,'2022-11-01 03:28:31',NULL,'한진택배',NULL,NULL,NULL,NULL,'05','HANJIN',1),(109,'2022-11-01 03:28:31',NULL,'롯데택배',NULL,NULL,NULL,NULL,'08','LOTTE',1),(110,'2022-11-01 03:28:31',NULL,'우체국택배',NULL,NULL,NULL,NULL,'01','POST',1),(111,'2022-11-01 03:28:31',NULL,'로젠택배',NULL,NULL,NULL,NULL,'06','LOGEN',1),(112,'2022-11-01 03:28:31',NULL,'일양로지스',NULL,NULL,NULL,NULL,'11','ILYANG',1),(113,'2022-11-01 03:28:31',NULL,'한덱스',NULL,NULL,NULL,NULL,'20','HANDEX',1),(114,'2022-11-01 03:28:31',NULL,'대신택배',NULL,NULL,NULL,NULL,'22','DAESIN',1),(115,'2022-11-01 03:28:31',NULL,'경동택배',NULL,NULL,NULL,NULL,'23','GYUNGDONG',1),(116,'2022-11-01 03:28:31',NULL,'합동택배',NULL,NULL,NULL,NULL,'32','HABDONG',1),(117,'2022-11-01 03:28:31',NULL,'CU 편의점택배',NULL,NULL,NULL,NULL,'46','CU',1),(118,'2022-11-01 03:28:31',NULL,'GS Postbox 택배',NULL,NULL,NULL,NULL,'24','GS',1),(119,'2022-11-01 03:28:31',NULL,'한의사랑택배',NULL,NULL,NULL,NULL,'16','HANI',1),(120,'2022-11-01 03:28:31',NULL,'천일택배',NULL,NULL,NULL,NULL,'17','CHUNIL',1),(121,'2022-11-01 03:28:31',NULL,'건영택배',NULL,NULL,NULL,NULL,'18','GUNYOUNG',1),(122,'2022-11-01 03:28:31',NULL,'SLX택배',NULL,NULL,NULL,NULL,'44','SLX',1),(123,'2022-11-01 03:28:31',NULL,'우리택배(구호남택배)',NULL,NULL,NULL,NULL,'45','URI',1),(124,'2022-11-01 03:28:31',NULL,'우리한방택배',NULL,NULL,NULL,NULL,'47','URIHAN',1),(125,'2022-11-01 03:28:31',NULL,'농협택배',NULL,NULL,NULL,NULL,'53','NONGHYUP',1),(126,'2022-11-01 03:28:31',NULL,'홈픽택배',NULL,NULL,NULL,NULL,'54','HOMEPICK',1),(127,'2022-11-01 03:28:31',NULL,'IK물류',NULL,NULL,NULL,NULL,'71','IK',1),(128,'2022-11-01 03:28:31',NULL,'성훈물류',NULL,NULL,NULL,NULL,'72','SUNGHOON',1),(129,'2022-11-01 03:28:31',NULL,'용마로지스',NULL,NULL,NULL,NULL,'74','YONGMA',1),(130,'2022-11-01 03:28:31',NULL,'원더스퀵',NULL,NULL,NULL,NULL,'75','WONDERS',1),(131,'2022-11-01 03:28:31',NULL,'로지스밸리택배',NULL,NULL,NULL,NULL,'79','LOGIS',1),(132,'2022-11-01 03:28:31',NULL,'컬리로지스',NULL,NULL,NULL,NULL,'82','CURLY',1),(133,'2022-11-01 03:28:31',NULL,'풀앳홈',NULL,NULL,NULL,NULL,'85','FULL',1),(134,'2022-11-01 03:28:31',NULL,'삼성전자물류',NULL,NULL,NULL,NULL,'86','SAMSUNG',1),(135,'2022-11-01 03:28:31',NULL,'큐런택배',NULL,NULL,NULL,NULL,'88','CURUN',1),(136,'2022-11-01 03:28:31',NULL,'두발히어로',NULL,NULL,NULL,NULL,'89','DOOBAL',1),(137,'2022-11-01 03:28:31',NULL,'위니아딤채',NULL,NULL,NULL,NULL,'90','WINIA',1),(138,'2022-11-01 03:28:31',NULL,'지니고 당일배송',NULL,NULL,NULL,NULL,'92','GENI',1),(139,'2022-11-01 03:28:31',NULL,'오늘의픽업',NULL,NULL,NULL,NULL,'94','TODAYSP',1),(140,'2022-11-01 03:28:31',NULL,'로지스밸리',NULL,NULL,NULL,NULL,'96','LOGISVAL',1),(141,'2022-11-01 03:28:31',NULL,'한샘서비스원 택배',NULL,NULL,NULL,NULL,'101','HANSAM',1),(142,'2022-11-01 03:28:31',NULL,'NDEX KOREA',NULL,NULL,NULL,NULL,'103','NDEX',1),(143,'2022-11-01 03:28:31',NULL,'도도플렉스(dodoflex)',NULL,NULL,NULL,NULL,'104','DODO',1),(144,'2022-11-01 03:28:31',NULL,'LG전자(판토스)',NULL,NULL,NULL,NULL,'107','LG',1),(145,'2022-11-01 03:28:31',NULL,'1004홈',NULL,NULL,NULL,NULL,'112','ANGEL',1),(146,'2022-11-01 03:28:31',NULL,'썬더히어로',NULL,NULL,NULL,NULL,'113','THUNDER',1),(147,'2022-11-01 03:28:31',NULL,'(주)팀프레시',NULL,NULL,NULL,NULL,'116','FRESH',1),(148,'2022-11-01 03:28:31',NULL,'롯데칠성',NULL,NULL,NULL,NULL,'118','LOTTE7',1),(149,'2022-11-01 03:28:31',NULL,'핑퐁',NULL,NULL,NULL,NULL,'119','PING',1),(150,'2022-11-01 03:28:31',NULL,'발렉스 특수물류',NULL,NULL,NULL,NULL,'120','VALEX',1),(151,'2022-11-01 03:28:31',NULL,'엔티엘피스',NULL,NULL,NULL,NULL,'123','NTL',1),(152,'2022-11-01 03:28:31',NULL,'GTS로지스',NULL,NULL,NULL,NULL,'125','GTS',1),(153,'2022-11-01 03:28:31',NULL,'로지스팟',NULL,NULL,NULL,NULL,'127','LOGISPOT',1),(154,'2022-11-01 03:28:31',NULL,'홈픽 오늘도착',NULL,NULL,NULL,NULL,'129','HOMEPICKT',1),(155,'2022-11-01 03:28:31',NULL,'UFO로지스',NULL,NULL,NULL,NULL,'130','UFO',1),(156,'2022-11-01 03:28:31',NULL,'딜리래빗',NULL,NULL,NULL,NULL,'131','DELI',1),(157,'2022-11-01 03:28:31',NULL,'지오피',NULL,NULL,NULL,NULL,'132','GOP',1),(158,'2022-11-01 03:28:31',NULL,'에이치케이홀딩스',NULL,NULL,NULL,NULL,'134','HK',1),(159,'2022-11-01 03:28:31',NULL,'HTNS',NULL,NULL,NULL,NULL,'135','HTNS',1),(160,'2022-11-01 03:28:31',NULL,'케이제이티',NULL,NULL,NULL,NULL,'136','KJT',1),(161,'2022-11-01 03:28:31',NULL,'더바오',NULL,NULL,NULL,NULL,'137','THEBAO',1),(162,'2022-11-01 03:28:31',NULL,'라스트마일',NULL,NULL,NULL,NULL,'138','LAST',1),(163,'2022-11-01 03:28:31',NULL,'오늘회 러쉬',NULL,NULL,NULL,NULL,'139','TODAYSH',1),(164,'2022-11-01 03:28:31',NULL,'탱고앤고',NULL,NULL,NULL,NULL,'142','TANGO',1),(165,'2022-11-01 03:28:31',NULL,'현대글로비스',NULL,NULL,NULL,NULL,'145','GLOVIS',1),(166,'2022-11-01 03:28:31',NULL,'ARGO',NULL,NULL,NULL,NULL,'148','ARGO',1),(167,'2022-11-01 03:28:33',NULL,'자이언트',NULL,NULL,NULL,NULL,'151','GIANT',1),(168,'2022-11-01 03:32:39',NULL,'굿투럭',NULL,NULL,NULL,NULL,'40','GOOD',1),(169,'2022-11-01 03:33:04',NULL,'부릉',NULL,NULL,NULL,NULL,'110','VOORNG',1);
/*!40000 ALTER TABLE `infocarriers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `infocategory`
--

DROP TABLE IF EXISTS `infocategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `infocategory` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `name` varchar(100) DEFAULT NULL,
  `code` varchar(20) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  `registrar` varchar(60) DEFAULT NULL,
  `registrarid` bigint(20) unsigned DEFAULT NULL,
  `level` int(10) unsigned DEFAULT NULL,
  `parent` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `infocategory`
--

LOCK TABLES `infocategory` WRITE;
/*!40000 ALTER TABLE `infocategory` DISABLE KEYS */;
/*!40000 ALTER TABLE `infocategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `infocoupons`
--

DROP TABLE IF EXISTS `infocoupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `infocoupons` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uuid` varchar(60) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `code` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `infocoupons`
--

LOCK TABLES `infocoupons` WRITE;
/*!40000 ALTER TABLE `infocoupons` DISABLE KEYS */;
/*!40000 ALTER TABLE `infocoupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `infohtscatcodes`
--

DROP TABLE IF EXISTS `infohtscatcodes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `infohtscatcodes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `section` varchar(10) DEFAULT NULL,
  `hscode` varchar(15) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `parent` varchar(15) DEFAULT NULL,
  `level` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `infohtscatcodes`
--

LOCK TABLES `infohtscatcodes` WRITE;
/*!40000 ALTER TABLE `infohtscatcodes` DISABLE KEYS */;
/*!40000 ALTER TABLE `infohtscatcodes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `infonettypes`
--

DROP TABLE IF EXISTS `infonettypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `infonettypes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `name` varchar(60) DEFAULT NULL,
  `chainid` int(10) unsigned DEFAULT NULL,
  `isprimary` tinyint(4) DEFAULT NULL,
  `active` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `infonettypes`
--

LOCK TABLES `infonettypes` WRITE;
/*!40000 ALTER TABLE `infonettypes` DISABLE KEYS */;
INSERT INTO `infonettypes` VALUES (1,'2022-10-01 12:38:59','2022-10-07 08:12:35','ETH_MAINNET',1,1,0),(3,'2022-10-01 12:39:35','2022-10-03 06:58:44','ETH_TESTNET_ROPSTEN',3,NULL,0),(5,'2022-10-01 12:39:44','2022-10-03 04:30:40','ETH_TESTNET_GOERLI',5,NULL,1),(56,'2022-10-01 12:39:05','2022-10-07 09:32:33','BSC_MAINNET',56,1,1),(97,'2022-10-01 16:51:01','2022-10-03 06:59:01','BSC_TESTNET',97,NULL,0),(137,'2022-10-01 12:39:12','2022-10-03 06:59:01','POLYGON_MAINNET',137,NULL,0);
/*!40000 ALTER TABLE `infonettypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `infopaymeans`
--

DROP TABLE IF EXISTS `infopaymeans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `infopaymeans` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `name` varchar(60) DEFAULT NULL,
  `address` varchar(80) DEFAULT NULL,
  `nettype` varchar(60) DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  `registrar` varchar(60) DEFAULT NULL,
  `registrarid` bigint(20) unsigned DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `isprimary` tinyint(4) DEFAULT NULL,
  `urllogo` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `infopaymeans`
--

LOCK TABLES `infopaymeans` WRITE;
/*!40000 ALTER TABLE `infopaymeans` DISABLE KEYS */;
INSERT INTO `infopaymeans` VALUES (1,'2022-10-30 01:12:00',NULL,'USDT_BINOPT','0x5217fD89B12B61d866359fAbf40B706199197af5','ETH_TESTNET_GOERLI',NULL,'admin00',NULL,NULL,NULL,NULL),(2,'2022-11-02 05:29:48','2022-11-02 14:20:09','PURE','0x5217fD89B12B61d866359fAbf40B706199197af5','ETH_TESTNET_GOERLI',NULL,'admin00',NULL,1,1,'https://cosho.shop/assets/PURE.jpg');
/*!40000 ALTER TABLE `infopaymeans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `infouserlevels`
--

DROP TABLE IF EXISTS `infouserlevels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `infouserlevels` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `level` tinyint(3) unsigned DEFAULT NULL,
  `name` varchar(60) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `infouserlevels`
--

LOCK TABLES `infouserlevels` WRITE;
/*!40000 ALTER TABLE `infouserlevels` DISABLE KEYS */;
/*!40000 ALTER TABLE `infouserlevels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inquiries`
--

DROP TABLE IF EXISTS `inquiries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inquiries` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uid` int(10) unsigned DEFAULT NULL,
  `titlename` varchar(300) DEFAULT NULL,
  `contentbody` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `categoryid` int(10) unsigned DEFAULT NULL,
  `issecret` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inquiries`
--

LOCK TABLES `inquiries` WRITE;
/*!40000 ALTER TABLE `inquiries` DISABLE KEYS */;
/*!40000 ALTER TABLE `inquiries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `itemid` bigint(20) unsigned DEFAULT NULL,
  `storehouseid` bigint(20) unsigned DEFAULT NULL,
  `quantity` bigint(20) unsigned DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  `itemuuid` varchar(60) DEFAULT NULL,
  `storeid` int(10) unsigned DEFAULT NULL,
  `storeuuid` varchar(60) DEFAULT NULL,
  `storehouseuuid` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (1,'2022-11-02 14:38:46','2022-11-02 14:48:25',NULL,NULL,157,'38d597c9-1088-427d-bfbf-22b2dc6bf100','2b639230-b908-4877-a01d-6084a62ee6f8',1,'742bfb93-019e-4925-b4fa-48a52ba7abd5',NULL),(2,'2022-11-02 15:03:21',NULL,NULL,NULL,314,'96699e15-f933-47a5-af79-6b586b661388','2b639230-b908-4877-a01d-6084a62ee6f8',2,'1fa12800-fdac-4767-b1c6-b8562ec5a7e2',NULL);
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iteminfo`
--

DROP TABLE IF EXISTS `iteminfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iteminfo` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `itemuuid` varchar(60) DEFAULT NULL,
  `contentbody` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iteminfo`
--

LOCK TABLES `iteminfo` WRITE;
/*!40000 ALTER TABLE `iteminfo` DISABLE KEYS */;
INSERT INTO `iteminfo` VALUES (1,'2022-11-02 10:24:31',NULL,'2b639230-b908-4877-a01d-6084a62ee6f8','{\"용량 또는 중량\":\"200g\",\"제품 주요 사양\":\"친환경 비누\",\"사용기한 또는 개봉 후 사용기간\":\"제조일로부터 1년\",\"사용방법\":\"거품을 내어 원하는 부위를 청결히 한다\",\"제조업자\":\"주) 아리따움\",\"제조국\":\"CN\",\"주요성분\":\"인공지방유 및 합성세제\",\"사용할 때 주의사항\":\"눈에 들어가지 않도록 주의하세요\",\"품질보증기준\":\"공정거래위원회의 보증기준을 따릅니다\",\"소비자 상담관련 전화번호\":\"+82-02-5676-5098\",\"AS 책임자\":\"Tian Shun\"}');
/*!40000 ALTER TABLE `iteminfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `name` varchar(200) DEFAULT NULL,
  `seller` varchar(200) DEFAULT NULL,
  `sellrid` int(10) unsigned DEFAULT NULL,
  `uuid` varchar(60) DEFAULT uuid(),
  `description` text DEFAULT NULL,
  `image00` varchar(500) DEFAULT NULL,
  `image01` varchar(500) DEFAULT NULL,
  `image02` varchar(500) DEFAULT NULL,
  `image03` varchar(500) DEFAULT NULL,
  `image04` varchar(500) DEFAULT NULL,
  `manufacturerid` varchar(100) DEFAULT NULL,
  `manufacturername` varchar(100) DEFAULT NULL,
  `manufactureritemid` varchar(100) DEFAULT NULL,
  `ratingsaverage` float unsigned DEFAULT NULL COMMENT 'reviewer ratings_ average',
  `ratingsmedian` float unsigned DEFAULT NULL COMMENT 'reviewer ratings_ median value',
  `imagedimensions00` varchar(60) DEFAULT NULL COMMENT 'eg) 100X100',
  `imagedimensions01` varchar(60) DEFAULT NULL COMMENT 'eg) 100X100',
  `imagedimensions02` varchar(60) DEFAULT NULL COMMENT 'eg) 100X100',
  `imagedimensions03` varchar(60) DEFAULT NULL COMMENT 'eg) 100X100',
  `imagedimensions04` varchar(60) DEFAULT NULL COMMENT 'eg) 100X100',
  `categoryid` int(10) unsigned DEFAULT NULL,
  `subcategoryid` int(10) unsigned DEFAULT NULL,
  `keywords` text DEFAULT NULL COMMENT 'words to be joined by commas',
  `imageurl00` varchar(500) DEFAULT NULL,
  `imageurl01` varchar(500) DEFAULT NULL,
  `imageurl02` varchar(500) DEFAULT NULL,
  `imageurl03` varchar(500) DEFAULT NULL,
  `htscode` varchar(20) DEFAULT NULL,
  `salescount` bigint(20) unsigned DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `ispromotion` tinyint(4) DEFAULT NULL,
  `isfeatured` tinyint(4) DEFAULT NULL,
  `price0` varchar(20) DEFAULT NULL COMMENT 'price before adjustment',
  `price1` varchar(20) DEFAULT NULL COMMENT 'price after adjustment',
  `msrp` varchar(20) DEFAULT NULL COMMENT 'msrp',
  `msrpunit` varchar(60) DEFAULT NULL COMMENT 'msrp units',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (31,'2022-10-30 12:28:02','2022-11-02 03:04:28','PLEUVOIR','PLEUVOIR',11,'2366e241-a843-4ea7-8e40-f6a273933052','PLEUVOIR',NULL,NULL,NULL,NULL,NULL,NULL,'플르부아 바디워시 250ml',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'https://s3.ap-northeast-2.amazonaws.com/ipfs.casa/products/2366e241-a843-4ea7-8e40-f6a273933052/image00.png','https://s3.ap-northeast-2.amazonaws.com/ipfs.casa/products/2366e241-a843-4ea7-8e40-f6a273933052/image01.png','https://s3.ap-northeast-2.amazonaws.com/ipfs.casa/products/2366e241-a843-4ea7-8e40-f6a273933052/image02.png','https://s3.ap-northeast-2.amazonaws.com/ipfs.casa/products/2366e241-a843-4ea7-8e40-f6a273933052/image03.png',NULL,NULL,23900,NULL,1,NULL,NULL,NULL,NULL),(32,'2022-10-30 12:28:52','2022-11-03 03:41:45','Perfume1','마르디마르디',11,'573f71bf-0e16-409b-be30-86007e5b4fba','마르디마르디',NULL,NULL,NULL,NULL,NULL,NULL,'락센트 바디워시 히노끼향 488ML',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'https://s3.ap-northeast-2.amazonaws.com/ipfs.casa/products/573f71bf-0e16-409b-be30-86007e5b4fba/image00.png','https://s3.ap-northeast-2.amazonaws.com/ipfs.casa/products/573f71bf-0e16-409b-be30-86007e5b4fba/image01.png','https://s3.ap-northeast-2.amazonaws.com/ipfs.casa/products/573f71bf-0e16-409b-be30-86007e5b4fba/image02.png','https://s3.ap-northeast-2.amazonaws.com/ipfs.casa/products/573f71bf-0e16-409b-be30-86007e5b4fba/image03.png',NULL,NULL,16000,1,NULL,NULL,NULL,NULL,NULL),(33,'2022-10-30 12:31:05','2022-11-03 14:15:10','Soap2','PLEUVOIR',11,'5267ec95-0f20-41ce-b035-928a1d10ff9e','PLEUVOIR',NULL,NULL,NULL,NULL,NULL,NULL,'플르부아 바디워시 250ml',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'https://s3.ap-northeast-2.amazonaws.com/ipfs.casa/products/5267ec95-0f20-41ce-b035-928a1d10ff9e/image00.png','https://s3.ap-northeast-2.amazonaws.com/ipfs.casa/products/5267ec95-0f20-41ce-b035-928a1d10ff9e/image01.png','https://s3.ap-northeast-2.amazonaws.com/ipfs.casa/products/5267ec95-0f20-41ce-b035-928a1d10ff9e/image02.png','https://s3.ap-northeast-2.amazonaws.com/ipfs.casa/products/5267ec95-0f20-41ce-b035-928a1d10ff9e/image03.png',NULL,NULL,68800,NULL,1,NULL,NULL,NULL,NULL),(34,'2022-10-30 12:44:15','2022-11-03 14:16:01','마르디마르디','마르디마르디',11,'2b639230-b908-4877-a01d-6084a62ee6f8','마르디마르디',NULL,NULL,NULL,NULL,NULL,NULL,'락센트 바디워시 히노끼향 488ML',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'https://s3.ap-northeast-2.amazonaws.com/ipfs.casa/products/2b639230-b908-4877-a01d-6084a62ee6f8/image00.png','https://s3.ap-northeast-2.amazonaws.com/ipfs.casa/products/2b639230-b908-4877-a01d-6084a62ee6f8/image01.png','https://s3.ap-northeast-2.amazonaws.com/ipfs.casa/products/2b639230-b908-4877-a01d-6084a62ee6f8/image02.png','https://s3.ap-northeast-2.amazonaws.com/ipfs.casa/products/2b639230-b908-4877-a01d-6084a62ee6f8/image03.png',NULL,NULL,30800,1,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logmileages`
--

DROP TABLE IF EXISTS `logmileages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logmileages` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uid` int(10) unsigned DEFAULT NULL,
  `type` tinyint(3) unsigned DEFAULT NULL,
  `typestr` varchar(40) DEFAULT NULL,
  `amountbefore` varchar(20) DEFAULT NULL,
  `amountafter` varchar(20) DEFAULT NULL,
  `amount` varchar(20) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `active` tinyint(3) unsigned DEFAULT NULL,
  `note` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logmileages`
--

LOCK TABLES `logmileages` WRITE;
/*!40000 ALTER TABLE `logmileages` DISABLE KEYS */;
/*!40000 ALTER TABLE `logmileages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logorders`
--

DROP TABLE IF EXISTS `logorders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logorders` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uid` int(10) unsigned DEFAULT NULL,
  `itemid` int(10) unsigned DEFAULT NULL,
  `unitprice` varchar(20) DEFAULT NULL,
  `quantity` int(10) unsigned DEFAULT NULL,
  `totalprice` varchar(20) DEFAULT NULL,
  `paymeansaddress` varchar(80) DEFAULT NULL,
  `paymeansname` varchar(80) DEFAULT NULL,
  `txhash` varchar(80) DEFAULT NULL,
  `deliveryaddress` varchar(300) DEFAULT NULL,
  `deliveryzip` varchar(20) DEFAULT NULL,
  `deliveryphone` varchar(60) DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  `sha256id` varchar(100) DEFAULT NULL,
  `streetaddress` varchar(300) DEFAULT NULL,
  `detailaddress` varchar(100) DEFAULT NULL,
  `zipcode` varchar(60) DEFAULT NULL,
  `nation` varchar(10) DEFAULT NULL,
  `salesid` int(10) unsigned DEFAULT NULL,
  `salesuuid` varchar(60) DEFAULT NULL,
  `merchantid` int(10) unsigned DEFAULT NULL,
  `merchantuuid` varchar(60) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL COMMENT '0: placed, 1: under review, 2: on delivery, 3: done delivery, 4: canceled, 5: refunded, 6: exchanged for another',
  `itemuuid` varchar(60) DEFAULT NULL,
  `reason` tinyint(4) DEFAULT NULL,
  `reasonstr` varchar(60) DEFAULT NULL COMMENT '1: delay, 2: defect',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logorders`
--

LOCK TABLES `logorders` WRITE;
/*!40000 ALTER TABLE `logorders` DISABLE KEYS */;
INSERT INTO `logorders` VALUES (11,'2022-11-03 11:15:49',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'81584e71-b1c5-4fae-836f-3ce25ba028f3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'2b639230-b908-4877-a01d-6084a62ee6f8',5,'PAST_EXPIRY'),(12,'2022-11-03 11:15:49',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'76333c55-8702-4386-a483-349efb99d84a',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,7,'573f71bf-0e16-409b-be30-86007e5b4fba',4,'DOES_NOT_FIT'),(13,'2022-11-03 11:15:49',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'42301b0e-556f-4ee4-9d1e-14802e242749',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'2366e241-a843-4ea7-8e40-f6a273933052',1,'DELAY'),(14,'2022-11-03 11:15:49',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0da2605b-3b34-42e6-a9ee-9a57d048912c',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'5267ec95-0f20-41ce-b035-928a1d10ff9e',5,'PAST_EXPIRY'),(15,'2022-11-03 11:15:49',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'60516d50-9a0b-45fb-bde2-86bafdb640c2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'573f71bf-0e16-409b-be30-86007e5b4fba',5,'PAST_EXPIRY'),(16,'2022-11-03 11:15:49',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'1c748201-e65b-417c-9810-534e4dc16bd4',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'5267ec95-0f20-41ce-b035-928a1d10ff9e',2,'DEFECT'),(17,'2022-11-03 11:15:49',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'a9f44dea-0af6-407c-bd16-62177064f518',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,7,'573f71bf-0e16-409b-be30-86007e5b4fba',4,'DOES_NOT_FIT'),(18,'2022-11-03 11:15:49',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2a995ae2-e737-4c40-b42f-24a8a555120d',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'2366e241-a843-4ea7-8e40-f6a273933052',3,'CHANGE_MIND'),(19,'2022-11-03 11:15:49',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'c7900c59-6bc6-41de-a2d7-1b9d9b9262a5',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'5267ec95-0f20-41ce-b035-928a1d10ff9e',2,'DEFECT'),(20,'2022-11-03 11:15:49',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'42e2005a-1a3b-4a45-97e4-edcebb0b725c',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'5267ec95-0f20-41ce-b035-928a1d10ff9e',2,'DEFECT'),(21,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2fdbbeb1-6b27-46c5-a0a8-d8c3bdb3c97c',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'573f71bf-0e16-409b-be30-86007e5b4fba',4,'DOES_NOT_FIT'),(22,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'96611c92-51a6-4a94-915e-2d7c3ad6c419',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'573f71bf-0e16-409b-be30-86007e5b4fba',3,'CHANGE_MIND'),(23,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dba33b25-957d-4664-87e0-d52dbc6ffbb3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,7,'573f71bf-0e16-409b-be30-86007e5b4fba',3,'CHANGE_MIND'),(24,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'52fe244b-6c52-4285-ac43-655db0d9d46d',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'573f71bf-0e16-409b-be30-86007e5b4fba',4,'DOES_NOT_FIT'),(25,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'066b6cac-f691-406a-bee5-4a47115f1811',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'5267ec95-0f20-41ce-b035-928a1d10ff9e',4,'DOES_NOT_FIT'),(26,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'f6e20704-8fc8-4c9b-8467-6e77900f0a56',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'573f71bf-0e16-409b-be30-86007e5b4fba',3,'CHANGE_MIND'),(27,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'8cd1018e-6c6b-4c3a-9e32-8d94c0b2b1f5',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,'573f71bf-0e16-409b-be30-86007e5b4fba',3,'CHANGE_MIND'),(28,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'f1be5f3b-f004-4579-8c2e-ce9ed0db57fa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'573f71bf-0e16-409b-be30-86007e5b4fba',4,'DOES_NOT_FIT'),(29,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ca4eef65-3cc2-4594-8993-c361ffcb2609',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,7,'573f71bf-0e16-409b-be30-86007e5b4fba',4,'DOES_NOT_FIT'),(30,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'128d87bc-7187-4a29-9a59-bda658bc645c',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'2366e241-a843-4ea7-8e40-f6a273933052',5,'PAST_EXPIRY'),(31,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'73ae912d-4fbf-44bb-83be-c79699838bda',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,'573f71bf-0e16-409b-be30-86007e5b4fba',5,'PAST_EXPIRY'),(32,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'d4045f32-6c4f-4b38-93dc-f552e102ad7e',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,'573f71bf-0e16-409b-be30-86007e5b4fba',5,'PAST_EXPIRY'),(33,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'005b7468-94e3-4f14-9ab1-ed2f6c60b538',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,'2b639230-b908-4877-a01d-6084a62ee6f8',2,'DEFECT'),(34,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'52cc90d1-9cb1-4d46-bf86-c60ca6cf0c1b',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'5267ec95-0f20-41ce-b035-928a1d10ff9e',4,'DOES_NOT_FIT'),(35,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'e4b9c116-be19-4180-ac4e-191bb18ce1d9',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,7,'5267ec95-0f20-41ce-b035-928a1d10ff9e',1,'DELAY'),(36,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'4dc18c54-37d3-4a7d-81aa-ce88a9388105',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'2366e241-a843-4ea7-8e40-f6a273933052',5,'PAST_EXPIRY'),(37,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'5c741b93-9759-4159-8ae7-5e80756b54a7',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'2b639230-b908-4877-a01d-6084a62ee6f8',3,'CHANGE_MIND'),(38,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'07c2395e-c25a-46ee-baae-c29d05bee275',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'5267ec95-0f20-41ce-b035-928a1d10ff9e',2,'DEFECT'),(39,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'f3956419-e962-45b4-8a94-f417b940cb5e',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'5267ec95-0f20-41ce-b035-928a1d10ff9e',4,'DOES_NOT_FIT'),(40,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'b8f6d101-85a4-4424-8a58-7bf437d3d402',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'2b639230-b908-4877-a01d-6084a62ee6f8',4,'DOES_NOT_FIT'),(41,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'469be380-40ea-463f-925b-7be2c023061b',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'573f71bf-0e16-409b-be30-86007e5b4fba',3,'CHANGE_MIND'),(42,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dee32671-1623-4816-840c-74ce4bf016a2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'573f71bf-0e16-409b-be30-86007e5b4fba',3,'CHANGE_MIND'),(43,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'c865bfb8-d7fb-43a1-a965-c1673d179c58',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'573f71bf-0e16-409b-be30-86007e5b4fba',3,'CHANGE_MIND'),(44,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'bbe634c0-d0d4-420c-9d25-d3cc2376283f',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'2366e241-a843-4ea7-8e40-f6a273933052',4,'DOES_NOT_FIT'),(45,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'8954c26b-8a95-44cc-9b81-b95c09ee1c14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'2b639230-b908-4877-a01d-6084a62ee6f8',2,'DEFECT'),(46,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'cebd28e4-d077-4243-b501-5aa41a05bcee',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'2366e241-a843-4ea7-8e40-f6a273933052',4,'DOES_NOT_FIT'),(47,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'4634f96d-422b-4dc0-aecd-4000fe1f84c9',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,7,'2366e241-a843-4ea7-8e40-f6a273933052',4,'DOES_NOT_FIT'),(48,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'127ccccd-aa34-4f7d-af73-44d5b82fb37f',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,'5267ec95-0f20-41ce-b035-928a1d10ff9e',2,'DEFECT'),(49,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'4bb69d50-2ccc-437d-9873-b00573b9fcd8',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'573f71bf-0e16-409b-be30-86007e5b4fba',2,'DEFECT'),(50,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'a336aef0-51ee-4e97-b1de-66d3ada90364',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'573f71bf-0e16-409b-be30-86007e5b4fba',3,'CHANGE_MIND'),(51,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'cf85e428-834e-4417-86d2-fc7516667f87',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'2b639230-b908-4877-a01d-6084a62ee6f8',2,'DEFECT'),(52,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'783a33d3-0af5-428f-8c41-89f5f130c641',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'573f71bf-0e16-409b-be30-86007e5b4fba',2,'DEFECT');
/*!40000 ALTER TABLE `logorders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logsales`
--

DROP TABLE IF EXISTS `logsales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logsales` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `userid` bigint(20) unsigned DEFAULT NULL,
  `itemid` bigint(20) unsigned DEFAULT NULL,
  `uuid` varchar(60) DEFAULT uuid(),
  `storehouseid` bigint(20) unsigned DEFAULT NULL,
  `quantity` int(10) unsigned DEFAULT NULL COMMENT 'qty sold',
  `unitprice` varchar(20) DEFAULT NULL,
  `paymeansname` varchar(60) DEFAULT NULL,
  `paymeansaddress` varchar(80) DEFAULT NULL,
  `txhash` varchar(80) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL COMMENT '0: order placed, 1:fulfilled, 2: there was an issue',
  `merchantid` bigint(20) unsigned DEFAULT NULL,
  `sha256id` varchar(80) DEFAULT NULL,
  `deliveryfee` varchar(20) DEFAULT NULL,
  `uid` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logsales`
--

LOCK TABLES `logsales` WRITE;
/*!40000 ALTER TABLE `logsales` DISABLE KEYS */;
/*!40000 ALTER TABLE `logsales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merchants`
--

DROP TABLE IF EXISTS `merchants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchants` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `name` varchar(100) DEFAULT NULL,
  `nation` varchar(20) DEFAULT NULL COMMENT '2 letter code',
  `phone` varchar(60) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `level` tinyint(4) DEFAULT NULL,
  `myreferercode` varchar(60) DEFAULT NULL,
  `uuid` varchar(60) DEFAULT uuid(),
  `uid` int(10) unsigned DEFAULT NULL,
  `businesslicenseid` varchar(60) DEFAULT NULL,
  `businesslicensenation` varchar(20) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL COMMENT '0: request, 1:approved, 2:denied',
  `requester` int(10) unsigned DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchants`
--

LOCK TABLES `merchants` WRITE;
/*!40000 ALTER TABLE `merchants` DISABLE KEYS */;
/*!40000 ALTER TABLE `merchants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mileages`
--

DROP TABLE IF EXISTS `mileages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mileages` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uid` int(10) unsigned DEFAULT NULL,
  `type` tinyint(3) unsigned DEFAULT NULL,
  `typestr` varchar(40) DEFAULT NULL,
  `amount` varchar(20) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `active` tinyint(3) unsigned DEFAULT NULL,
  `note` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mileages`
--

LOCK TABLES `mileages` WRITE;
/*!40000 ALTER TABLE `mileages` DISABLE KEYS */;
/*!40000 ALTER TABLE `mileages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uid` int(10) unsigned DEFAULT NULL,
  `itemid` int(10) unsigned DEFAULT NULL,
  `unitprice` varchar(20) DEFAULT NULL,
  `quantity` int(10) unsigned DEFAULT NULL,
  `totalprice` varchar(20) DEFAULT NULL,
  `paymeansaddress` varchar(80) DEFAULT NULL,
  `paymeansname` varchar(80) DEFAULT NULL,
  `txhash` varchar(80) DEFAULT NULL,
  `deliveryaddress` varchar(300) DEFAULT NULL,
  `deliveryzip` varchar(20) DEFAULT NULL,
  `deliveryphone` varchar(60) DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  `sha256id` varchar(100) DEFAULT NULL,
  `streetaddress` varchar(300) DEFAULT NULL,
  `detailaddress` varchar(100) DEFAULT NULL,
  `zipcode` varchar(60) DEFAULT NULL,
  `nation` varchar(10) DEFAULT NULL,
  `salesid` int(10) unsigned DEFAULT NULL,
  `salesuuid` varchar(60) DEFAULT NULL,
  `merchantid` int(10) unsigned DEFAULT NULL,
  `merchantuuid` varchar(60) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL COMMENT '0: placed, 1: under review, 2: on delivery, 3: done delivery',
  `itemuuid` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COMMENT='orders by users';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2022-11-01 13:27:31','2022-11-03 06:46:01',11,NULL,NULL,17,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'59ff67af-9bdf-4f5e-b938-e410eda4abbe',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2366e241-a843-4ea7-8e40-f6a273933052'),(4,'2022-11-03 13:55:37',NULL,10,33,'23900',2,'47800','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'ab829968-6acf-4c43-8d2f-f84be912ee3b',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'5267ec95-0f20-41ce-b035-928a1d10ff9e'),(5,'2022-11-03 13:55:37',NULL,10,33,'23900',4,'95600','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'033d29e9-9d9c-4785-be6f-cc6feaf4653e',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'5267ec95-0f20-41ce-b035-928a1d10ff9e'),(6,'2022-11-03 13:55:37',NULL,10,31,'23900',1,'23900','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'d617a876-9b81-45e2-bfd6-b357410e95f7',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2366e241-a843-4ea7-8e40-f6a273933052'),(7,'2022-11-03 13:55:37',NULL,10,32,'16000',4,'64000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'984588b2-4e3d-42aa-8554-2968dd645517',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,'573f71bf-0e16-409b-be30-86007e5b4fba'),(8,'2022-11-03 13:55:37',NULL,10,32,'16000',2,'32000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'0a498a31-c87b-4854-babd-eebeade0ecc2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'573f71bf-0e16-409b-be30-86007e5b4fba'),(9,'2022-11-03 13:55:37',NULL,10,31,'23900',5,'119500','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'fd8ff228-14bb-4324-9048-1a99021303c3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,'2366e241-a843-4ea7-8e40-f6a273933052'),(10,'2022-11-03 13:55:37',NULL,10,32,'16000',3,'48000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'ccbda2de-382e-4d9a-86bb-9a0f8a635dfc',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'573f71bf-0e16-409b-be30-86007e5b4fba'),(11,'2022-11-03 13:55:37',NULL,10,32,'16000',6,'96000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'00e2ac85-248c-4306-91d4-7f132e28ecc0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'573f71bf-0e16-409b-be30-86007e5b4fba'),(12,'2022-11-03 13:55:37',NULL,10,32,'16000',3,'48000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'c456b25a-3c84-4415-8ccc-ffff0be0cbaa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'573f71bf-0e16-409b-be30-86007e5b4fba'),(13,'2022-11-03 13:55:37',NULL,10,33,'23900',2,'47800','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'57995b91-8999-4883-bc56-cf93b011fbc8',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,'5267ec95-0f20-41ce-b035-928a1d10ff9e'),(14,'2022-11-03 13:55:37',NULL,10,33,'23900',3,'71700','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'446df8de-0271-40c4-ba13-ae1c78ff2de4',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'5267ec95-0f20-41ce-b035-928a1d10ff9e'),(15,'2022-11-03 13:55:37',NULL,10,31,'23900',4,'95600','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'ee23eabf-c71b-4d13-b4ea-9ebc2fb7aeb1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2366e241-a843-4ea7-8e40-f6a273933052'),(16,'2022-11-03 13:55:37',NULL,10,33,'23900',5,'119500','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'7f86eb1a-314b-4c46-96e7-db11c6fc6d51',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'5267ec95-0f20-41ce-b035-928a1d10ff9e'),(17,'2022-11-03 13:55:37',NULL,10,34,'26000',6,'156000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'8480c02c-99aa-4bf0-a80c-57a8f2896c10',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2b639230-b908-4877-a01d-6084a62ee6f8'),(18,'2022-11-03 13:55:37',NULL,10,33,'23900',2,'47800','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'3d1213f7-ff7d-4569-b1ad-6934a3723c17',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,'5267ec95-0f20-41ce-b035-928a1d10ff9e'),(19,'2022-11-03 13:55:37',NULL,10,34,'26000',2,'52000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'9578b272-6db7-44c9-bed3-64f09543e675',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2b639230-b908-4877-a01d-6084a62ee6f8'),(20,'2022-11-03 13:55:37',NULL,10,32,'16000',3,'48000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'c588c860-2ae2-4fa8-86db-a40ae3a82fa3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'573f71bf-0e16-409b-be30-86007e5b4fba'),(21,'2022-11-03 13:55:37',NULL,10,33,'23900',5,'119500','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'6e575f8b-3f8e-4732-9363-cf3c492e3952',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,'5267ec95-0f20-41ce-b035-928a1d10ff9e'),(22,'2022-11-03 13:55:37',NULL,10,33,'23900',6,'143400','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'90bffae5-0b8a-4048-afb0-eed51cafccbc',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,'5267ec95-0f20-41ce-b035-928a1d10ff9e'),(23,'2022-11-03 13:55:37',NULL,10,32,'16000',6,'96000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'23662f82-8972-4817-beba-3ab1786a8a7c',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,'573f71bf-0e16-409b-be30-86007e5b4fba'),(24,'2022-11-03 13:55:37',NULL,10,33,'23900',2,'47800','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'ac0191a8-134c-4ca5-b4c1-f46f1418ca13',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'5267ec95-0f20-41ce-b035-928a1d10ff9e'),(25,'2022-11-03 13:55:37',NULL,10,33,'23900',5,'119500','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'ea2a8122-75f2-4fe5-a2a1-c555f7a6420a',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,'5267ec95-0f20-41ce-b035-928a1d10ff9e'),(26,'2022-11-03 13:55:37',NULL,10,32,'16000',5,'80000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'41a0370c-3f76-40f0-a7d2-d4eab8fe95f1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'573f71bf-0e16-409b-be30-86007e5b4fba'),(27,'2022-11-03 13:55:37',NULL,10,34,'26000',1,'26000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'dc78e5ae-3979-41ee-8e9d-294185e5ed54',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2b639230-b908-4877-a01d-6084a62ee6f8'),(28,'2022-11-03 13:55:37',NULL,10,32,'16000',6,'96000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'1fbe3900-50e8-439e-84a5-8a309e7705d0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,'573f71bf-0e16-409b-be30-86007e5b4fba'),(29,'2022-11-03 13:55:37',NULL,10,32,'16000',2,'32000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'1d2b757e-730b-446e-9941-acff8af88665',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,'573f71bf-0e16-409b-be30-86007e5b4fba'),(30,'2022-11-03 13:55:37',NULL,10,32,'16000',1,'16000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'01fe4f94-66a3-4668-a55b-c2cc405298c0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,'573f71bf-0e16-409b-be30-86007e5b4fba'),(31,'2022-11-03 13:55:37',NULL,10,31,'23900',6,'143400','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'86bc98a6-a44e-47e3-8a7b-762627d5c0fc',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,'2366e241-a843-4ea7-8e40-f6a273933052'),(32,'2022-11-03 13:55:37',NULL,10,32,'16000',2,'32000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'d2d6779c-f8a7-4179-aac5-ab4b1772971f',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,'573f71bf-0e16-409b-be30-86007e5b4fba'),(33,'2022-11-03 13:55:37',NULL,10,34,'26000',4,'104000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'36acde78-47ac-437c-9add-bea302f9c6a9',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2b639230-b908-4877-a01d-6084a62ee6f8');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `physicaladdresses`
--

DROP TABLE IF EXISTS `physicaladdresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `physicaladdresses` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uid` int(10) unsigned DEFAULT NULL,
  `streetaddress` varchar(300) DEFAULT NULL,
  `detailaddress` varchar(100) DEFAULT NULL,
  `zipcode` varchar(20) DEFAULT NULL,
  `nation` varchar(10) DEFAULT NULL COMMENT 'two letter abbreviation',
  `active` tinyint(4) DEFAULT NULL,
  `isprimary` tinyint(4) DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `physicaladdresses`
--

LOCK TABLES `physicaladdresses` WRITE;
/*!40000 ALTER TABLE `physicaladdresses` DISABLE KEYS */;
INSERT INTO `physicaladdresses` VALUES (1,'2022-10-31 16:27:51','2022-11-01 17:06:39',11,'강남구 테헤란로25길','역삼현대벤쳐 텔(역삼동)','05622','korea',1,0,'75869950-5820-11ed-ae0f-0ad9133e76f6'),(2,'2022-11-01 17:06:39',NULL,11,'Seoul, Songpa-gu, ogeum-ro','15 gil 9-5 (Bangi-dong) B01','05622','korea',1,1,'3ce3c2fa-c3d4-5a03-bcf2-b46294e680e7');
/*!40000 ALTER TABLE `physicaladdresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pricings`
--

DROP TABLE IF EXISTS `pricings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pricings` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `itemid` int(10) unsigned DEFAULT NULL,
  `itemuuid` varchar(60) DEFAULT NULL,
  `price` varchar(20) DEFAULT NULL,
  `expiry` bigint(20) unsigned DEFAULT NULL,
  `startingtimestamp` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pricings`
--

LOCK TABLES `pricings` WRITE;
/*!40000 ALTER TABLE `pricings` DISABLE KEYS */;
/*!40000 ALTER TABLE `pricings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotions`
--

DROP TABLE IF EXISTS `promotions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `promotions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `itemid` int(10) unsigned DEFAULT NULL,
  `itemuuid` varchar(60) DEFAULT NULL,
  `deduction` varchar(20) DEFAULT NULL,
  `startingtimestamp` bigint(20) unsigned DEFAULT NULL,
  `expirytimestamp` bigint(20) unsigned DEFAULT NULL,
  `deductionunit` varchar(20) DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  `price0` varchar(20) DEFAULT NULL COMMENT 'price before adjustment',
  `price1` varchar(20) DEFAULT NULL COMMENT 'price after adjustment',
  `uid` int(10) unsigned DEFAULT NULL,
  `type` int(10) unsigned DEFAULT NULL COMMENT '1: deduction , 2: bogo',
  `typestr` varchar(60) DEFAULT NULL,
  `bogospec` varchar(100) DEFAULT NULL COMMENT 'eg: {"buy":1,"get":1}',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotions`
--

LOCK TABLES `promotions` WRITE;
/*!40000 ALTER TABLE `promotions` DISABLE KEYS */;
INSERT INTO `promotions` VALUES (1,'2022-10-31 01:22:25','2022-10-31 03:39:39',NULL,'573f71bf-0e16-409b-be30-86007e5b4fba','5',1667228400,1669734000,'%','a5e3f846-58cd-11ed-ae0f-0ad9133e76f6',NULL,NULL,NULL,NULL,NULL,NULL),(2,'2022-10-31 05:17:05',NULL,NULL,'2b639230-b908-4877-a01d-6084a62ee6f8','10',1667592917,1669302000,'USDT','d1c3b53c-2fb2-40c0-8108-4cefb481ea9d',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `promotions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qna`
--

DROP TABLE IF EXISTS `qna`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `qna` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `question` text DEFAULT NULL,
  `answer` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `categoryid` int(10) unsigned DEFAULT NULL,
  `writerid` int(10) unsigned DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  `itemuuid` varchar(60) DEFAULT NULL,
  `itemid` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qna`
--

LOCK TABLES `qna` WRITE;
/*!40000 ALTER TABLE `qna` DISABLE KEYS */;
/*!40000 ALTER TABLE `qna` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reports` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uid` int(10) unsigned DEFAULT NULL,
  `titlename` varchar(300) DEFAULT NULL,
  `contentbody` text DEFAULT NULL,
  `itemid` int(10) unsigned DEFAULT NULL,
  `itemuuid` varchar(60) DEFAULT NULL,
  `reviewuuid` varchar(60) DEFAULT NULL,
  `reviewid` int(10) unsigned DEFAULT NULL,
  `reason` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `requests` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uid` int(10) unsigned DEFAULT NULL,
  `type` tinyint(3) unsigned DEFAULT NULL,
  `typestr` varchar(40) DEFAULT NULL,
  `orderid` int(10) unsigned DEFAULT NULL,
  `orderuuid` varchar(60) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `note` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reviews` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uid` int(10) unsigned DEFAULT NULL,
  `itemid` int(10) unsigned DEFAULT NULL,
  `itemuuid` varchar(60) DEFAULT NULL,
  `titlename` varchar(300) DEFAULT NULL,
  `contentbody` text DEFAULT NULL,
  `rating` float DEFAULT NULL COMMENT 'number of stars : 1~1.5~5',
  `active` tinyint(4) DEFAULT NULL,
  `imageurl00` varchar(500) DEFAULT NULL,
  `imageurl01` varchar(500) DEFAULT NULL,
  `imageurl02` varchar(500) DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='user reviews products / items';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `name` varchar(200) DEFAULT NULL,
  `seller` varchar(200) DEFAULT NULL,
  `sellrid` int(10) unsigned DEFAULT NULL,
  `uuid` varchar(60) DEFAULT uuid(),
  `description` text DEFAULT NULL,
  `categoryid` int(10) unsigned DEFAULT NULL,
  `subcategoryid` int(10) unsigned DEFAULT NULL,
  `keywords` text DEFAULT NULL COMMENT 'words to be joined by commas',
  `salescount` bigint(20) unsigned DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `ispromotion` tinyint(4) DEFAULT NULL,
  `promotionuuid` varchar(60) DEFAULT NULL,
  `promotionid` bigint(20) unsigned DEFAULT NULL,
  `itemuuid` varchar(60) DEFAULT NULL,
  `isrefundable` tinyint(4) DEFAULT NULL,
  `feerefund` varchar(20) DEFAULT NULL,
  `feeexchange` varchar(20) DEFAULT NULL COMMENT 'fee to be charged on exchange for another item',
  `policyfee` text DEFAULT NULL,
  `policycer` text DEFAULT NULL COMMENT 'policy on cancel,exchanges and refund',
  `policydelivery` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES (1,'2022-11-02 12:37:00','2022-11-02 12:57:51',NULL,NULL,NULL,'0c0d2065-5aab-11ed-ae0f-0ad9133e76f6',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2b639230-b908-4877-a01d-6084a62ee6f8',NULL,NULL,NULL,'[\"공휴일 및 일요일에도 배송은 이루어지나 다소 지연될수 있습니다\",\"전국 동일하게 24시간 이내 배송을 원칙으로 하고 있습니다\"]','[\"반품 및 교환은 불가합니다\",\"배송과정 중 파손된 제품은 관리자에 문의하시어 환불 요청 가능합니다\"]','[\"공휴일 및 일요일에도 배송은 이루어지나 다소 지연될수 있습니다\",\"전국 동일하게 24시간 이내 배송을 원칙으로 하고 있습니다\"]'),(2,'2022-11-02 13:10:32',NULL,NULL,NULL,NULL,'bb187dd5-5aaf-11ed-ae0f-0ad9133e76f6',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2366e241-a843-4ea7-8e40-f6a273933052',1,NULL,NULL,'[\"공휴일 및 일요일에도 배송은 이루어지나 다소 지연될수 있습니다\",\"전국 동일하게 24시간 이내 배송을 원칙으로 하고 있습니다\"]','[\"공휴일 및 일요일에도 배송은 이루어지나 다소 지연될수 있습니다\",\"전국 동일하게 24시간 이내 배송을 원칙으로 하고 있습니다\"]','[\"공휴일 및 일요일에도 배송은 이루어지나 다소 지연될수 있습니다\",\"전국 동일하게 24시간 이내 배송을 원칙으로 하고 있습니다\"]');
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uid` int(10) unsigned DEFAULT NULL,
  `token` text DEFAULT NULL,
  `ipaddress` varchar(80) DEFAULT NULL,
  `logintimestamp` bigint(20) unsigned DEFAULT NULL,
  `logouttimestamp` bigint(20) unsigned DEFAULT NULL,
  `device` varchar(200) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tokenindex` (`token`(200))
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (1,'2022-11-03 02:25:53',NULL,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjEwLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAxVDAwOjQyOjEyLjAwMFoiLCJlbWFpbCI6ImNoZW55NWR5aEBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiM2RmMGJmYTctNGY2MC0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTYiLCJteXJlZmVyZXJjb2RlIjoiYWI2NTQ2YWFmZjEzZTkiLCJuZXR0eXBlIjoiRVRIX1RFU1RORVRfR09FUkxJIiwibmV0dHlwZWlkIjpudWxsLCJpc2FkbWluIjoyLCJsZXZlbCI6bnVsbCwiaXNlbWFpbHZlcmlmaWVkIjpudWxsLCJpc3Bob25ldmVyaWZpZWQiOm51bGwsInN0cmVldGFkZHJlc3MiOm51bGwsInppcGNvZGUiOm51bGwsInJlY2VpdmVycGhvbmUiOm51bGwsInNpbXBsZXBhc3N3b3JkIjpudWxsLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJmdWxsbmFtZSI6bnVsbCwiaXNhbGxvd2VtYWlsIjpudWxsLCJpc2FsbG93c21zIjpudWxsLCJzaW1wbGVwdyI6bnVsbCwidXJscHJvZmlsZWltYWdlIjpudWxsLCJ3YWxsZXQiOnsiaWQiOjEsImNyZWF0ZWRhdCI6IjIwMjItMTAtMTlUMDM6NDM6NDkuMDAwWiIsInVwZGF0ZWRhdCI6IjIwMjItMTEtMDFUMDA6NDM6MDguMDAwWiIsInVpZCI6MTAsIndhbGxldGFkZHJlc3MiOiIweEI2NkQ0YkNlYWM2NTIwOUZhQTc1YzMzMjJEQTFhZTFFRDgzYTA2ZTQiLCJwcml2YXRla2V5IjoiMHhlNTVhYmYzZDRhZTkyMmVhZTZmZDg1MGQ2ZjZhYjAwZTBmNTU4Nzg0ZjFmNGNhMDk2ZDM4OGQzYWZlOTFjN2UxIiwibmV0dHlwZSI6IkVUSF9URVNUTkVUX0dPRVJMSSIsImFtb3VudCI6bnVsbCwibmV0dHlwZWlkIjpudWxsfSwiaWF0IjoxNjY3NDQyMzUzLCJleHAiOjE2Njc2MTUxNTMsImlzcyI6IkVYUFJFU1MifQ.P5es881gszT-LnJdY3UEmw5SvmCRI_8QAggClobQQfI','::ffff:121.134.16.118',1667442353,NULL,'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',NULL),(2,'2022-11-03 02:27:39',NULL,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjEwLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAxVDAwOjQyOjEyLjAwMFoiLCJlbWFpbCI6ImNoZW55NWR5aEBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiM2RmMGJmYTctNGY2MC0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTYiLCJteXJlZmVyZXJjb2RlIjoiYWI2NTQ2YWFmZjEzZTkiLCJuZXR0eXBlIjoiRVRIX1RFU1RORVRfR09FUkxJIiwibmV0dHlwZWlkIjpudWxsLCJpc2FkbWluIjoyLCJsZXZlbCI6bnVsbCwiaXNlbWFpbHZlcmlmaWVkIjpudWxsLCJpc3Bob25ldmVyaWZpZWQiOm51bGwsInN0cmVldGFkZHJlc3MiOm51bGwsInppcGNvZGUiOm51bGwsInJlY2VpdmVycGhvbmUiOm51bGwsInNpbXBsZXBhc3N3b3JkIjpudWxsLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJmdWxsbmFtZSI6bnVsbCwiaXNhbGxvd2VtYWlsIjpudWxsLCJpc2FsbG93c21zIjpudWxsLCJzaW1wbGVwdyI6bnVsbCwidXJscHJvZmlsZWltYWdlIjpudWxsLCJ3YWxsZXQiOnsiaWQiOjEsImNyZWF0ZWRhdCI6IjIwMjItMTAtMTlUMDM6NDM6NDkuMDAwWiIsInVwZGF0ZWRhdCI6IjIwMjItMTEtMDFUMDA6NDM6MDguMDAwWiIsInVpZCI6MTAsIndhbGxldGFkZHJlc3MiOiIweEI2NkQ0YkNlYWM2NTIwOUZhQTc1YzMzMjJEQTFhZTFFRDgzYTA2ZTQiLCJwcml2YXRla2V5IjoiMHhlNTVhYmYzZDRhZTkyMmVhZTZmZDg1MGQ2ZjZhYjAwZTBmNTU4Nzg0ZjFmNGNhMDk2ZDM4OGQzYWZlOTFjN2UxIiwibmV0dHlwZSI6IkVUSF9URVNUTkVUX0dPRVJMSSIsImFtb3VudCI6bnVsbCwibmV0dHlwZWlkIjpudWxsfSwiaWF0IjoxNjY3NDQyNDU5LCJleHAiOjE2Njc2MTUyNTksImlzcyI6IkVYUFJFU1MifQ.CZqn4LuCo82MnKfVjDYCjmTQgGpk6LHVpSl9GOH_2Zo','::ffff:121.134.16.118',1667442459,NULL,'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36','cheny5dyh@gmail.com'),(3,'2022-11-03 10:56:19',NULL,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjEwLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAxVDAwOjQyOjEyLjAwMFoiLCJlbWFpbCI6ImNoZW55NWR5aEBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiM2RmMGJmYTctNGY2MC0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTYiLCJteXJlZmVyZXJjb2RlIjoiYWI2NTQ2YWFmZjEzZTkiLCJuZXR0eXBlIjoiRVRIX1RFU1RORVRfR09FUkxJIiwibmV0dHlwZWlkIjpudWxsLCJpc2FkbWluIjoyLCJsZXZlbCI6bnVsbCwiaXNlbWFpbHZlcmlmaWVkIjpudWxsLCJpc3Bob25ldmVyaWZpZWQiOm51bGwsInN0cmVldGFkZHJlc3MiOm51bGwsInppcGNvZGUiOm51bGwsInJlY2VpdmVycGhvbmUiOm51bGwsInNpbXBsZXBhc3N3b3JkIjpudWxsLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJmdWxsbmFtZSI6bnVsbCwiaXNhbGxvd2VtYWlsIjpudWxsLCJpc2FsbG93c21zIjpudWxsLCJzaW1wbGVwdyI6bnVsbCwidXJscHJvZmlsZWltYWdlIjpudWxsLCJ3YWxsZXQiOnsiaWQiOjEsImNyZWF0ZWRhdCI6IjIwMjItMTAtMTlUMDM6NDM6NDkuMDAwWiIsInVwZGF0ZWRhdCI6IjIwMjItMTEtMDFUMDA6NDM6MDguMDAwWiIsInVpZCI6MTAsIndhbGxldGFkZHJlc3MiOiIweEI2NkQ0YkNlYWM2NTIwOUZhQTc1YzMzMjJEQTFhZTFFRDgzYTA2ZTQiLCJwcml2YXRla2V5IjoiMHhlNTVhYmYzZDRhZTkyMmVhZTZmZDg1MGQ2ZjZhYjAwZTBmNTU4Nzg0ZjFmNGNhMDk2ZDM4OGQzYWZlOTFjN2UxIiwibmV0dHlwZSI6IkVUSF9URVNUTkVUX0dPRVJMSSIsImFtb3VudCI6bnVsbCwibmV0dHlwZWlkIjpudWxsfSwiaWF0IjoxNjY3NDcyOTc4LCJleHAiOjE2Njc2NDU3NzgsImlzcyI6IkVYUFJFU1MifQ.1szIpVPLgi0BFtAvo7rSfVs3WCn-sN_Yb3PtqAHz26w','::ffff:112.214.207.62',1667472978,NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','cheny5dyh@gmail.com'),(4,'2022-11-03 11:19:20',NULL,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjEwLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAxVDAwOjQyOjEyLjAwMFoiLCJlbWFpbCI6ImNoZW55NWR5aEBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiM2RmMGJmYTctNGY2MC0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTYiLCJteXJlZmVyZXJjb2RlIjoiYWI2NTQ2YWFmZjEzZTkiLCJuZXR0eXBlIjoiRVRIX1RFU1RORVRfR09FUkxJIiwibmV0dHlwZWlkIjpudWxsLCJpc2FkbWluIjoyLCJsZXZlbCI6bnVsbCwiaXNlbWFpbHZlcmlmaWVkIjpudWxsLCJpc3Bob25ldmVyaWZpZWQiOm51bGwsInN0cmVldGFkZHJlc3MiOm51bGwsInppcGNvZGUiOm51bGwsInJlY2VpdmVycGhvbmUiOm51bGwsInNpbXBsZXBhc3N3b3JkIjpudWxsLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJmdWxsbmFtZSI6bnVsbCwiaXNhbGxvd2VtYWlsIjpudWxsLCJpc2FsbG93c21zIjpudWxsLCJzaW1wbGVwdyI6bnVsbCwidXJscHJvZmlsZWltYWdlIjpudWxsLCJ3YWxsZXQiOnsiaWQiOjEsImNyZWF0ZWRhdCI6IjIwMjItMTAtMTlUMDM6NDM6NDkuMDAwWiIsInVwZGF0ZWRhdCI6IjIwMjItMTEtMDFUMDA6NDM6MDguMDAwWiIsInVpZCI6MTAsIndhbGxldGFkZHJlc3MiOiIweEI2NkQ0YkNlYWM2NTIwOUZhQTc1YzMzMjJEQTFhZTFFRDgzYTA2ZTQiLCJwcml2YXRla2V5IjoiMHhlNTVhYmYzZDRhZTkyMmVhZTZmZDg1MGQ2ZjZhYjAwZTBmNTU4Nzg0ZjFmNGNhMDk2ZDM4OGQzYWZlOTFjN2UxIiwibmV0dHlwZSI6IkVUSF9URVNUTkVUX0dPRVJMSSIsImFtb3VudCI6bnVsbCwibmV0dHlwZWlkIjpudWxsfSwiaWF0IjoxNjY3NDc0MzYwLCJleHAiOjE2Njc2NDcxNjAsImlzcyI6IkVYUFJFU1MifQ.J-9r-DK7Qq1PNNbCkda2T0RfLLyOFj5wbmAnc3w92YA','::ffff:121.134.16.118',1667474360,NULL,'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36','cheny5dyh@gmail.com'),(5,'2022-11-03 14:46:28',NULL,16,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjE2LCJjcmVhdGVkYXQiOiIyMDIyLTExLTAyVDEyOjMyOjQyLjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAzVDAxOjQyOjI1LjAwMFoiLCJlbWFpbCI6ImF1czdpbm1hcjdpbkBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiNzIyMGM0MWEtNWFhYS0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTZzIiwibXlyZWZlcmVyY29kZSI6IjBlOGJkNzE2ZjA0YWFhIiwibmV0dHlwZSI6IkVUSF9URVNUTkVUX0dPRVJMSSIsIm5ldHR5cGVpZCI6bnVsbCwiaXNhZG1pbiI6bnVsbCwibGV2ZWwiOm51bGwsImlzZW1haWx2ZXJpZmllZCI6bnVsbCwiaXNwaG9uZXZlcmlmaWVkIjpudWxsLCJzdHJlZXRhZGRyZXNzIjpudWxsLCJ6aXBjb2RlIjpudWxsLCJyZWNlaXZlcnBob25lIjpudWxsLCJzaW1wbGVwYXNzd29yZCI6bnVsbCwiZmlyc3RuYW1lIjpudWxsLCJsYXN0bmFtZSI6bnVsbCwiZnVsbG5hbWUiOm51bGwsImlzYWxsb3dlbWFpbCI6bnVsbCwiaXNhbGxvd3NtcyI6bnVsbCwic2ltcGxlcHciOiIyMjIyMjIiLCJ1cmxwcm9maWxlaW1hZ2UiOm51bGwsIndhbGxldCI6eyJpZCI6NCwiY3JlYXRlZGF0IjoiMjAyMi0xMS0wMlQxMjozMjo0Mi4wMDBaIiwidXBkYXRlZGF0IjpudWxsLCJ1aWQiOjE2LCJ3YWxsZXRhZGRyZXNzIjoiMHhlRjE4RjcwM0JjNzFlNDU2ZTYwQjc4NjJFNDliNTYwMTEyNjc5NUVkIiwicHJpdmF0ZWtleSI6IjB4MTNhYjQxODc0ODA1N2ZhODlmNzk2Y2NmNTkzZjM4YjU5ODkxMjgxMWI4ODg2YWFhNTk5YTdiZjIwZTRhYWE1NiIsIm5ldHR5cGUiOiJFVEhfVEVTVE5FVF9HT0VSTEkiLCJhbW91bnQiOm51bGwsIm5ldHR5cGVpZCI6bnVsbH0sImlhdCI6MTY2NzQ4Njc4OCwiZXhwIjoxNjY3NjU5NTg4LCJpc3MiOiJFWFBSRVNTIn0.wSSIFgOkmQHR-05e3sSlttvjQzNt47-kfhodQuFBDOo','::ffff:112.214.207.62',1667486788,NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','aus7inmar7in@gmail.com'),(6,'2022-11-04 00:54:55',NULL,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjEwLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAxVDAwOjQyOjEyLjAwMFoiLCJlbWFpbCI6ImNoZW55NWR5aEBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiM2RmMGJmYTctNGY2MC0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTYiLCJteXJlZmVyZXJjb2RlIjoiYWI2NTQ2YWFmZjEzZTkiLCJuZXR0eXBlIjoiRVRIX1RFU1RORVRfR09FUkxJIiwibmV0dHlwZWlkIjpudWxsLCJpc2FkbWluIjoyLCJsZXZlbCI6bnVsbCwiaXNlbWFpbHZlcmlmaWVkIjpudWxsLCJpc3Bob25ldmVyaWZpZWQiOm51bGwsInN0cmVldGFkZHJlc3MiOm51bGwsInppcGNvZGUiOm51bGwsInJlY2VpdmVycGhvbmUiOm51bGwsInNpbXBsZXBhc3N3b3JkIjpudWxsLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJmdWxsbmFtZSI6bnVsbCwiaXNhbGxvd2VtYWlsIjpudWxsLCJpc2FsbG93c21zIjpudWxsLCJzaW1wbGVwdyI6bnVsbCwidXJscHJvZmlsZWltYWdlIjpudWxsLCJ3YWxsZXQiOnsiaWQiOjEsImNyZWF0ZWRhdCI6IjIwMjItMTAtMTlUMDM6NDM6NDkuMDAwWiIsInVwZGF0ZWRhdCI6IjIwMjItMTEtMDFUMDA6NDM6MDguMDAwWiIsInVpZCI6MTAsIndhbGxldGFkZHJlc3MiOiIweEI2NkQ0YkNlYWM2NTIwOUZhQTc1YzMzMjJEQTFhZTFFRDgzYTA2ZTQiLCJwcml2YXRla2V5IjoiMHhlNTVhYmYzZDRhZTkyMmVhZTZmZDg1MGQ2ZjZhYjAwZTBmNTU4Nzg0ZjFmNGNhMDk2ZDM4OGQzYWZlOTFjN2UxIiwibmV0dHlwZSI6IkVUSF9URVNUTkVUX0dPRVJMSSIsImFtb3VudCI6bnVsbCwibmV0dHlwZWlkIjpudWxsfSwiaWF0IjoxNjY3NTIzMjk1LCJleHAiOjE2Njc2OTYwOTUsImlzcyI6IkVYUFJFU1MifQ.qi3Hgr0OL5A7bWVXz5RNIPz03WIYkpTaYvZzXjbT0ro','::ffff:121.134.16.118',1667523295,NULL,'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36','cheny5dyh@gmail.com'),(7,'2022-11-04 00:59:14',NULL,16,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjE2LCJjcmVhdGVkYXQiOiIyMDIyLTExLTAyVDEyOjMyOjQyLjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAzVDAxOjQyOjI1LjAwMFoiLCJlbWFpbCI6ImF1czdpbm1hcjdpbkBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiNzIyMGM0MWEtNWFhYS0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTZzIiwibXlyZWZlcmVyY29kZSI6IjBlOGJkNzE2ZjA0YWFhIiwibmV0dHlwZSI6IkVUSF9URVNUTkVUX0dPRVJMSSIsIm5ldHR5cGVpZCI6bnVsbCwiaXNhZG1pbiI6bnVsbCwibGV2ZWwiOm51bGwsImlzZW1haWx2ZXJpZmllZCI6bnVsbCwiaXNwaG9uZXZlcmlmaWVkIjpudWxsLCJzdHJlZXRhZGRyZXNzIjpudWxsLCJ6aXBjb2RlIjpudWxsLCJyZWNlaXZlcnBob25lIjpudWxsLCJzaW1wbGVwYXNzd29yZCI6bnVsbCwiZmlyc3RuYW1lIjpudWxsLCJsYXN0bmFtZSI6bnVsbCwiZnVsbG5hbWUiOm51bGwsImlzYWxsb3dlbWFpbCI6bnVsbCwiaXNhbGxvd3NtcyI6bnVsbCwic2ltcGxlcHciOiIyMjIyMjIiLCJ1cmxwcm9maWxlaW1hZ2UiOm51bGwsIndhbGxldCI6eyJpZCI6NCwiY3JlYXRlZGF0IjoiMjAyMi0xMS0wMlQxMjozMjo0Mi4wMDBaIiwidXBkYXRlZGF0IjpudWxsLCJ1aWQiOjE2LCJ3YWxsZXRhZGRyZXNzIjoiMHhlRjE4RjcwM0JjNzFlNDU2ZTYwQjc4NjJFNDliNTYwMTEyNjc5NUVkIiwicHJpdmF0ZWtleSI6IjB4MTNhYjQxODc0ODA1N2ZhODlmNzk2Y2NmNTkzZjM4YjU5ODkxMjgxMWI4ODg2YWFhNTk5YTdiZjIwZTRhYWE1NiIsIm5ldHR5cGUiOiJFVEhfVEVTVE5FVF9HT0VSTEkiLCJhbW91bnQiOm51bGwsIm5ldHR5cGVpZCI6bnVsbH0sImlhdCI6MTY2NzUyMzU1NCwiZXhwIjoxNjY3Njk2MzU0LCJpc3MiOiJFWFBSRVNTIn0.9Bhati7PKRtYPoNBmepsvD0l5uuhLoc5S5RHeZF2nXA','::ffff:121.134.16.118',1667523554,NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','aus7inmar7in@gmail.com'),(8,'2022-11-04 01:03:47',NULL,16,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjE2LCJjcmVhdGVkYXQiOiIyMDIyLTExLTAyVDEyOjMyOjQyLjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAzVDAxOjQyOjI1LjAwMFoiLCJlbWFpbCI6ImF1czdpbm1hcjdpbkBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiNzIyMGM0MWEtNWFhYS0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTZzIiwibXlyZWZlcmVyY29kZSI6IjBlOGJkNzE2ZjA0YWFhIiwibmV0dHlwZSI6IkVUSF9URVNUTkVUX0dPRVJMSSIsIm5ldHR5cGVpZCI6bnVsbCwiaXNhZG1pbiI6bnVsbCwibGV2ZWwiOm51bGwsImlzZW1haWx2ZXJpZmllZCI6bnVsbCwiaXNwaG9uZXZlcmlmaWVkIjpudWxsLCJzdHJlZXRhZGRyZXNzIjpudWxsLCJ6aXBjb2RlIjpudWxsLCJyZWNlaXZlcnBob25lIjpudWxsLCJzaW1wbGVwYXNzd29yZCI6bnVsbCwiZmlyc3RuYW1lIjpudWxsLCJsYXN0bmFtZSI6bnVsbCwiZnVsbG5hbWUiOm51bGwsImlzYWxsb3dlbWFpbCI6bnVsbCwiaXNhbGxvd3NtcyI6bnVsbCwic2ltcGxlcHciOiIyMjIyMjIiLCJ1cmxwcm9maWxlaW1hZ2UiOm51bGwsIndhbGxldCI6eyJpZCI6NCwiY3JlYXRlZGF0IjoiMjAyMi0xMS0wMlQxMjozMjo0Mi4wMDBaIiwidXBkYXRlZGF0IjpudWxsLCJ1aWQiOjE2LCJ3YWxsZXRhZGRyZXNzIjoiMHhlRjE4RjcwM0JjNzFlNDU2ZTYwQjc4NjJFNDliNTYwMTEyNjc5NUVkIiwicHJpdmF0ZWtleSI6IjB4MTNhYjQxODc0ODA1N2ZhODlmNzk2Y2NmNTkzZjM4YjU5ODkxMjgxMWI4ODg2YWFhNTk5YTdiZjIwZTRhYWE1NiIsIm5ldHR5cGUiOiJFVEhfVEVTVE5FVF9HT0VSTEkiLCJhbW91bnQiOm51bGwsIm5ldHR5cGVpZCI6bnVsbH0sImlhdCI6MTY2NzUyMzgyNywiZXhwIjoxNjY3Njk2NjI3LCJpc3MiOiJFWFBSRVNTIn0.ReMAu6UUaX8UILMJShSne23bRhiM1Q0s1QScxuv_Q9Q','::ffff:121.134.16.118',1667523827,NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','aus7inmar7in@gmail.com'),(9,'2022-11-04 01:13:29',NULL,16,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjE2LCJjcmVhdGVkYXQiOiIyMDIyLTExLTAyVDEyOjMyOjQyLjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAzVDAxOjQyOjI1LjAwMFoiLCJlbWFpbCI6ImF1czdpbm1hcjdpbkBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiNzIyMGM0MWEtNWFhYS0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTZzIiwibXlyZWZlcmVyY29kZSI6IjBlOGJkNzE2ZjA0YWFhIiwibmV0dHlwZSI6IkVUSF9URVNUTkVUX0dPRVJMSSIsIm5ldHR5cGVpZCI6bnVsbCwiaXNhZG1pbiI6bnVsbCwibGV2ZWwiOm51bGwsImlzZW1haWx2ZXJpZmllZCI6bnVsbCwiaXNwaG9uZXZlcmlmaWVkIjpudWxsLCJzdHJlZXRhZGRyZXNzIjpudWxsLCJ6aXBjb2RlIjpudWxsLCJyZWNlaXZlcnBob25lIjpudWxsLCJzaW1wbGVwYXNzd29yZCI6bnVsbCwiZmlyc3RuYW1lIjpudWxsLCJsYXN0bmFtZSI6bnVsbCwiZnVsbG5hbWUiOm51bGwsImlzYWxsb3dlbWFpbCI6bnVsbCwiaXNhbGxvd3NtcyI6bnVsbCwic2ltcGxlcHciOiIyMjIyMjIiLCJ1cmxwcm9maWxlaW1hZ2UiOm51bGwsIndhbGxldCI6eyJpZCI6NCwiY3JlYXRlZGF0IjoiMjAyMi0xMS0wMlQxMjozMjo0Mi4wMDBaIiwidXBkYXRlZGF0IjpudWxsLCJ1aWQiOjE2LCJ3YWxsZXRhZGRyZXNzIjoiMHhlRjE4RjcwM0JjNzFlNDU2ZTYwQjc4NjJFNDliNTYwMTEyNjc5NUVkIiwicHJpdmF0ZWtleSI6IjB4MTNhYjQxODc0ODA1N2ZhODlmNzk2Y2NmNTkzZjM4YjU5ODkxMjgxMWI4ODg2YWFhNTk5YTdiZjIwZTRhYWE1NiIsIm5ldHR5cGUiOiJFVEhfVEVTVE5FVF9HT0VSTEkiLCJhbW91bnQiOm51bGwsIm5ldHR5cGVpZCI6bnVsbH0sImlhdCI6MTY2NzUyNDQwOSwiZXhwIjoxNjY3Njk3MjA5LCJpc3MiOiJFWFBSRVNTIn0.YFrREWLFckIYOdZVqaRncBbmf51dtQO3sZPvjktoju4','::ffff:121.134.16.118',1667524409,NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','aus7inmar7in@gmail.com');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `key_` varchar(100) DEFAULT NULL,
  `value_` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  `subkey` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'2022-10-19 02:02:33','2022-10-28 10:06:00','EMAIL_CODE_EXPIRES_IN_SEC','180',NULL,1,NULL,NULL),(2,'2022-10-19 03:49:44','2022-10-20 01:25:33','TOKEN_EXPIRES_IN','3000h',NULL,1,NULL,'BSC_MAINNET'),(3,'2022-10-19 03:49:56','2022-10-20 01:25:33','TOKEN_EXPIRES_IN','3000h',NULL,1,NULL,'ETH_TESTNET_GOERLI'),(4,'2022-11-01 09:15:41','2022-11-01 09:16:47','MAX_COUNT_REVIEWS_PER_USER_PER_ITEM','4',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipments`
--

DROP TABLE IF EXISTS `shipments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shipments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `merchantid` bigint(20) unsigned DEFAULT NULL,
  `handlerid` bigint(20) unsigned DEFAULT NULL,
  `receiverid` bigint(20) unsigned DEFAULT NULL,
  `receiveaddress` varchar(300) DEFAULT NULL,
  `logsalesid` bigint(20) unsigned DEFAULT NULL,
  `tracknumber` varchar(100) DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipments`
--

LOCK TABLES `shipments` WRITE;
/*!40000 ALTER TABLE `shipments` DISABLE KEYS */;
/*!40000 ALTER TABLE `shipments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shoppingbaskets`
--

DROP TABLE IF EXISTS `shoppingbaskets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shoppingbaskets` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uid` int(10) unsigned DEFAULT NULL,
  `itemid` int(10) unsigned DEFAULT NULL,
  `itemuuid` varchar(60) DEFAULT NULL,
  `amount` int(10) unsigned DEFAULT NULL,
  `totalprice` varchar(20) DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `expiry` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shoppingbaskets`
--

LOCK TABLES `shoppingbaskets` WRITE;
/*!40000 ALTER TABLE `shoppingbaskets` DISABLE KEYS */;
/*!40000 ALTER TABLE `shoppingbaskets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shoppingcarts`
--

DROP TABLE IF EXISTS `shoppingcarts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shoppingcarts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uid` int(10) unsigned DEFAULT NULL,
  `itemid` int(10) unsigned DEFAULT NULL,
  `itemuuid` varchar(60) DEFAULT NULL,
  `amount` int(10) unsigned DEFAULT NULL,
  `totalprice` varchar(20) DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `expiry` bigint(20) unsigned DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  `unitprice` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shoppingcarts`
--

LOCK TABLES `shoppingcarts` WRITE;
/*!40000 ALTER TABLE `shoppingcarts` DISABLE KEYS */;
INSERT INTO `shoppingcarts` VALUES (1,'2022-10-31 14:18:30','2022-11-01 12:53:14',11,NULL,'2366e241-a843-4ea7-8e40-f6a273933052',17,NULL,1,NULL,'beef4876-8a87-52b9-a1a1-a31e4f766cb0',NULL),(2,'2022-11-03 01:52:12','2022-11-03 10:55:12',16,NULL,'2366e241-a843-4ea7-8e40-f6a273933052',3,NULL,1,NULL,'f2df674e-f5fa-5616-8410-089e767ee014',NULL);
/*!40000 ALTER TABLE `shoppingcarts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storehouses`
--

DROP TABLE IF EXISTS `storehouses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storehouses` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `name` varchar(60) DEFAULT NULL,
  `nation` varchar(20) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `phone` varchar(60) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `registrar` varchar(60) DEFAULT NULL,
  `registrarid` bigint(20) unsigned DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storehouses`
--

LOCK TABLES `storehouses` WRITE;
/*!40000 ALTER TABLE `storehouses` DISABLE KEYS */;
/*!40000 ALTER TABLE `storehouses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stores`
--

DROP TABLE IF EXISTS `stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stores` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `name` varchar(100) DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  `nation` varchar(10) DEFAULT NULL COMMENT 'two letter code',
  `address` varchar(300) DEFAULT NULL COMMENT 'street address',
  `phone` varchar(60) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `managername` varchar(200) DEFAULT NULL,
  `latitude` varchar(20) DEFAULT NULL,
  `longitude` varchar(20) DEFAULT NULL,
  `officehours` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `latitudedouble` double DEFAULT NULL,
  `longitudedouble` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stores`
--

LOCK TABLES `stores` WRITE;
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;
INSERT INTO `stores` VALUES (1,'2022-11-01 07:02:54','2022-11-03 13:08:13','Aritaum','742bfb93-019e-4925-b4fa-48a52ba7abd5','KR','강남대로 396','010-9086-3976','arita@um.com','Ren Yanlin','37.4983','127.028','{\"M\":\"9-21\",\"T\":\"9-21\",\"W\":\"9-21\",\"Th\":\"9-21\",\"F\":\"9-21\",\"Sat\":\"9-21\",\"Sun\":\"9-21\"}','아름다움을 생각하는 아리따움 강남점입니다;',37.4983,127.028),(2,'2022-11-02 15:12:44','2022-11-03 13:08:37','Faceshop','1fa12800-fdac-4767-b1c6-b8562ec5a7e2','KR','잠실동 190-11','02-2202-1179','marag24850@keshitv.com','Meng Chen','37.5104','127.082','{\"M\":\"9-21\",\"T\":\"9-21\",\"W\":\"9-21\",\"Th\":\"9-21\",\"F\":\"9-21\",\"Sat\":\"9-21\",\"Sun\":\"9-21\"}','먹자골목에서 미용을 생각하다',37.5104,127.082);
/*!40000 ALTER TABLE `stores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uid` int(10) unsigned DEFAULT NULL,
  `txhash` varchar(80) DEFAULT NULL,
  `nettype` varchar(60) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `paymeansname` varchar(80) DEFAULT NULL,
  `from_` varchar(80) DEFAULT NULL,
  `to_` varchar(80) DEFAULT NULL,
  `nettypeid` int(10) unsigned DEFAULT NULL,
  `direction` tinyint(4) DEFAULT NULL COMMENT '+1: deposit , -1: withdraw',
  `status` tinyint(3) unsigned DEFAULT NULL COMMENT '1: success, 2: fail',
  `active` tinyint(4) DEFAULT NULL,
  `contractaddress` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,'2022-11-03 10:45:38',NULL,10,'0xd9c0891b969c571ee1538f6c502b8e9a0e061d3772bb1de18f30a4c22ef813d1','ETH_TESTNET_GOERLI',292,'PURE','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4','0x27650a87f448f40bef9ea0b2d1f6d2cf320a4537',NULL,-1,1,1,NULL),(2,'2022-11-03 10:45:38',NULL,10,'0x5a8d741808556b947280cba45c9e671a5a4acf2618e667bff69545997a7cdb76','ETH_TESTNET_GOERLI',126,'PURE','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4','0xdcd80745b9f842665d12703100d66298dcac41fc',NULL,-1,2,1,NULL),(3,'2022-11-03 10:45:38',NULL,10,'0x82b5147f7c6d993a2b528531613929c8e83d8726cdb311cd7d0a3fa4795eb29a','ETH_TESTNET_GOERLI',823,'PURE','0xab803ae79551162caeaa7816e27ad2bcfc817fd6','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4',NULL,1,1,1,NULL),(4,'2022-11-03 10:45:38',NULL,10,'0xcdf603526d65eec957654fabaeb4e2ba460f2577629f9e74dc5ad628e7a4b19d','ETH_TESTNET_GOERLI',790,'PURE','0x90d8e71c5bb70f649fe46f3f73ff908d7cc7f3e8','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4',NULL,1,1,1,NULL),(5,'2022-11-03 10:45:38',NULL,10,'0x72511772d7cf9638b3f7d7876ef8e1dc6f8959e2c586e3cdd11ca5164a2b5fa2','ETH_TESTNET_GOERLI',260,'PURE','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4','0x807c024a22f1ca73541792a2a89696f5690885bf',NULL,-1,1,1,NULL),(6,'2022-11-03 10:45:38',NULL,10,'0xd09576b65d02d612681e7dbbd6b201b5512903e5b7c8b0f3586696bab967ba2e','ETH_TESTNET_GOERLI',609,'PURE','0xdb582dc4e9401408e163625ccd890f7ad45bb6e5','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4',NULL,1,1,1,NULL),(7,'2022-11-03 10:45:38',NULL,10,'0xbec856933557cf6e77aea29d32c300aec007e672ea91ea23ab0fdfc315f8df3a','ETH_TESTNET_GOERLI',435,'PURE','0x83ac7b4c73e4dfac18c4e3243b8a1b4f49786d83','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4',NULL,1,2,1,NULL),(8,'2022-11-03 10:45:38',NULL,10,'0x92c3d2de55d266892c0c2a5d3dbeeedc0641273204e7dddb3176dc0bfcf1168c','ETH_TESTNET_GOERLI',392,'PURE','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4','0xe84e295f31560882201abf5c66c5a5c947961da4',NULL,-1,1,1,NULL),(9,'2022-11-03 10:45:38',NULL,10,'0x740ec901b904d41c6af610b874e8df6a5c8905df46354ca2ef09f1f0b948db33','ETH_TESTNET_GOERLI',383,'PURE','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4','0x5efb14e19626ac13917135e2bbfabc93dde1da6e',NULL,-1,1,1,NULL),(10,'2022-11-03 10:45:38',NULL,10,'0x039dd06827408d78d36e460b9657dd10a375ed38688df07a36634896fbcab8ef','ETH_TESTNET_GOERLI',117,'PURE','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4','0x10b8b83a2b2a3e1cfc8a82a2b2d6e9d821494c4f',NULL,-1,1,1,NULL);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `useractions`
--

DROP TABLE IF EXISTS `useractions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `useractions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uid` int(10) unsigned DEFAULT NULL,
  `type` tinyint(3) unsigned DEFAULT NULL,
  `typestr` varchar(40) DEFAULT NULL,
  `orderid` int(10) unsigned DEFAULT NULL,
  `orderuuid` varchar(60) DEFAULT NULL,
  `itemid` int(10) unsigned DEFAULT NULL,
  `itemuuid` varchar(60) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `note` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `useractions`
--

LOCK TABLES `useractions` WRITE;
/*!40000 ALTER TABLE `useractions` DISABLE KEYS */;
/*!40000 ALTER TABLE `useractions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userprefs`
--

DROP TABLE IF EXISTS `userprefs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userprefs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uid` int(10) unsigned DEFAULT NULL,
  `key_` varchar(100) DEFAULT NULL,
  `value` varchar(100) DEFAULT NULL,
  `group_` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userprefs`
--

LOCK TABLES `userprefs` WRITE;
/*!40000 ALTER TABLE `userprefs` DISABLE KEYS */;
/*!40000 ALTER TABLE `userprefs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(60) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `nickname` varchar(100) DEFAULT NULL,
  `uuid` varchar(60) DEFAULT uuid(),
  `password` varchar(60) DEFAULT NULL,
  `myreferercode` varchar(20) DEFAULT NULL,
  `nettype` varchar(60) DEFAULT NULL,
  `nettypeid` int(10) unsigned DEFAULT NULL,
  `isadmin` tinyint(4) DEFAULT NULL COMMENT '0: not admin, 1:admin common , >=2:privileged admin',
  `level` int(10) unsigned DEFAULT NULL,
  `isemailverified` tinyint(4) DEFAULT NULL,
  `isphoneverified` tinyint(4) DEFAULT NULL,
  `streetaddress` varchar(300) DEFAULT NULL,
  `zipcode` varchar(20) DEFAULT NULL,
  `receiverphone` varchar(60) DEFAULT NULL,
  `simplepassword` varchar(20) DEFAULT NULL,
  `firstname` varchar(100) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `fullname` varchar(200) DEFAULT NULL,
  `isallowemail` tinyint(4) DEFAULT NULL,
  `isallowsms` tinyint(4) DEFAULT NULL,
  `simplepw` varchar(10) DEFAULT NULL,
  `urlprofileimage` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `emailnettype` (`email`,`nettype`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (10,'2022-10-19 03:43:49','2022-11-01 00:42:12','cheny5dyh@gmail.com',NULL,NULL,NULL,'3df0bfa7-4f60-11ed-ae0f-0ad9133e76f6','123456','ab6546aaff13e9','ETH_TESTNET_GOERLI',NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,'2022-10-30 06:59:55','2022-11-01 01:25:54','merchant00@gmail.com',NULL,'merchant',NULL,'75869950-5820-11ed-ae0f-0ad9133e76f6','123456',NULL,'ETH_TESTNET_GOERLI',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,'2022-10-31 03:34:57','2022-11-01 00:42:12','bakujin.dev@gmail.com',NULL,NULL,NULL,'fe2647eb-58cc-11ed-ae0f-0ad9133e76f6','test0000','b8b2f2fe3992a3','ETH_TESTNET_GOERLI',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,'2022-11-01 01:02:46',NULL,'cheny5dyh@gmail.com',NULL,NULL,NULL,'e5a46b5d-5980-11ed-ae0f-0ad9133e76f6','123456','67dd18633a9598','BSC_MAINNET',NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,'2022-11-01 01:28:16',NULL,'buyer01@gmail.com',NULL,NULL,NULL,'75d5b184-5984-11ed-ae0f-0ad9133e76f6','123456','8bc2531459fd75','ETH_TESTNET_GOERLI',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,'2022-11-02 01:32:11',NULL,'leejh16@gmail.com',NULL,NULL,NULL,'2c1185fb-5a4e-11ed-ae0f-0ad9133e76f6','123456','d5b8e864c7c47d','ETH_TESTNET_GOERLI',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,'2022-11-02 12:32:42','2022-11-03 01:42:25','aus7inmar7in@gmail.com',NULL,NULL,NULL,'7220c41a-5aaa-11ed-ae0f-0ad9133e76f6','123456s','0e8bd716f04aaa','ETH_TESTNET_GOERLI',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'222222',NULL),(17,'2022-11-02 13:36:49',NULL,'salokhiddinov0727@gmail.com',NULL,NULL,NULL,'67591e5b-5ab3-11ed-ae0f-0ad9133e76f6','1234567s','4f773839021fff','ETH_TESTNET_GOERLI',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,'2022-11-02 14:01:08',NULL,'salokhiddinov6727@gmail.com',NULL,NULL,NULL,'cca984a2-5ab6-11ed-ae0f-0ad9133e76f6','1234567s','f76bb3d39dcaac','ETH_TESTNET_GOERLI',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userwallets`
--

DROP TABLE IF EXISTS `userwallets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userwallets` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uid` int(11) unsigned NOT NULL,
  `walletaddress` varchar(300) DEFAULT NULL,
  `privatekey` varchar(300) DEFAULT NULL,
  `nettype` varchar(60) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `nettypeid` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `walletaddres` (`walletaddress`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userwallets`
--

LOCK TABLES `userwallets` WRITE;
/*!40000 ALTER TABLE `userwallets` DISABLE KEYS */;
INSERT INTO `userwallets` VALUES (1,'2022-10-19 03:43:49','2022-11-01 00:43:08',10,'0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4','0xe55abf3d4ae922eae6fd850d6f6ab00e0f558784f1f4ca096d388d3afe91c7e1','ETH_TESTNET_GOERLI',NULL,NULL),(2,'2022-10-31 03:34:57','2022-11-01 00:43:08',12,'0x6E5678902e98051A5eF5A98279547e6aDbE83615','0x4cccba6f1d9f530d53958c1adddc7937b2905cf059ddb90b756f5483b1d27b1e','ETH_TESTNET_GOERLI',NULL,NULL),(3,'2022-11-02 01:32:11',NULL,15,'0x976c6B8E8fe854372c9F1fFF76cE0e417513e51E','0xb430ff3226daf694bab0d5d24e63c2054ca161e670b4a0e6f04c528cc97c4161','ETH_TESTNET_GOERLI',NULL,NULL),(4,'2022-11-02 12:32:42',NULL,16,'0xeF18F703Bc71e456e60B7862E49b5601126795Ed','0x13ab418748057fa89f796ccf593f38b598912811b8886aaa599a7bf20e4aaa56','ETH_TESTNET_GOERLI',NULL,NULL),(5,'2022-11-02 13:36:49',NULL,17,'0xC4e67048C84bd8aA34FdB276c421522786AAd2A8','0x6091175fca8cc31f5061503565286b50d080949885b098e85a6f2ad8c154571c','ETH_TESTNET_GOERLI',NULL,NULL),(6,'2022-11-02 14:01:08',NULL,18,'0xccCF385c7a1DD544c4777Cbca18EE05bFA3E9676','0xd37c229cdccc8eb14f76c76faae480d8eb47646add1488d81a93741de58d1487','ETH_TESTNET_GOERLI',NULL,NULL);
/*!40000 ALTER TABLE `userwallets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `withdrawfees`
--

DROP TABLE IF EXISTS `withdrawfees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `withdrawfees` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `intervalstart` float DEFAULT NULL,
  `intervalend` float DEFAULT NULL,
  `amount` varchar(20) DEFAULT NULL,
  `rate` varchar(20) DEFAULT NULL,
  `descrption` text DEFAULT NULL,
  `active` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `withdrawfees`
--

LOCK TABLES `withdrawfees` WRITE;
/*!40000 ALTER TABLE `withdrawfees` DISABLE KEYS */;
INSERT INTO `withdrawfees` VALUES (1,'2022-09-16 12:37:03','2022-09-30 01:41:34',100,500,'1',NULL,NULL,0),(2,'2022-09-16 12:38:49',NULL,500,500000,'10',NULL,NULL,1),(3,'2022-09-30 01:41:14','2022-10-05 06:52:31',10,500,'1',NULL,NULL,1),(4,'2022-10-17 09:11:39','2022-10-17 09:48:54',1,10,'0.1',NULL,NULL,0),(5,'2022-10-17 12:00:53',NULL,500000,100000000000,'100',NULL,NULL,1);
/*!40000 ALTER TABLE `withdrawfees` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-04  1:34:46
