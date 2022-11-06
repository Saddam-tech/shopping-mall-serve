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
INSERT INTO `balances` VALUES (1,'2022-10-31 14:40:53','2022-11-03 05:40:16',11,'1000000',1,'PURE','ETH_TESTNET_GOERLI',NULL,NULL,NULL,'TOKEN'),(2,'2022-11-03 02:57:37','2022-11-06 09:31:09',10,'19000',2,'PURE','ETH_TESTNET_GOERLI',NULL,NULL,NULL,'TOKEN');
/*!40000 ALTER TABLE `balances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `banners` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `url` varchar(500) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  `writer` varchar(60) DEFAULT NULL,
  `writerid` int(10) unsigned DEFAULT NULL,
  `isprimary` tinyint(4) DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `isitem` tinyint(4) DEFAULT NULL,
  `itemuuid` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners`
--

LOCK TABLES `banners` WRITE;
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
INSERT INTO `banners` VALUES (1,'2022-11-04 05:48:16','2022-11-05 07:46:19','https://s3.ap-northeast-2.amazonaws.com/ipfs.casa/banners/UNDP-CH-Why-Humanity-Must-Save-Nature-To-Save-Itself.jpeg',NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(2,'2022-11-04 05:50:18','2022-11-05 07:46:47','https://s3.ap-northeast-2.amazonaws.com/ipfs.casa/banners/E_home.bff02afa7f50f83b6d19.png',NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(3,'2022-11-04 05:57:08','2022-11-04 05:58:10','https://s3.ap-northeast-2.amazonaws.com/ipfs.casa/banners/Zugpsitze_mountain.jpg',NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(4,'2022-11-04 05:57:38','2022-11-04 05:58:10','https://s3.ap-northeast-2.amazonaws.com/ipfs.casa/banners/photo-1610878180933-123728745d22.jpeg',NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(5,'2022-11-04 06:53:52','2022-11-05 07:48:19','https://s3.ap-northeast-2.amazonaws.com/ipfs.casa/banners/Getty-18726317-1920x1080.png',NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(6,'2022-11-04 06:54:45','2022-11-05 08:53:10','https://s3.ap-northeast-2.amazonaws.com/ipfs.casa/banners/idyllic-scenery-english-lake-district-springtime-trees-grass-growing-lakeshore-green-hill-reflecting-water-sunlight-145986642.jpg',NULL,NULL,NULL,NULL,NULL,1,1,'2b639230-b908-4877-a01d-6084a62ee6f8');
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;
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
  `amount` varchar(20) DEFAULT NULL,
  `amountunit` varchar(20) DEFAULT NULL,
  `type` int(10) unsigned DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `restrictions` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupons`
--

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;
INSERT INTO `coupons` VALUES (4,'2022-11-06 09:01:02','2022-11-06 09:25:01',10,NULL,'1c62c264-30a1-480b-b3da-3bbe385e7001',1667228400,1672412400,1,'ee444ca01c097a','20','%',67786,'20% 할인','100 PURE 이상 결제 시 사용가능'),(5,'2022-11-06 09:02:49','2022-11-06 09:27:15',10,NULL,'87fe3b83-2665-4b9a-99fc-f2c9e3f211d9',1667228400,1672412400,1,'0cfb9247f01030','65','%',55539,'배송비 65% 할인','최초 5회 배송 건에 사용가능'),(6,'2022-11-06 09:05:15','2022-11-06 09:29:05',10,NULL,'71fe3c96-d450-4e6f-b543-1ba2a7d0c079',1667228400,1672412400,1,'d2b785d6f24f7f','7','PURE',11743,'추가 마일리지','다른 쿠폰과 함께 사용 불가');
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
  `carriersymbol` varchar(20) DEFAULT NULL,
  `carriername` varchar(20) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (1,'2022-11-05 11:24:28','2022-11-05 14:21:24','2366e241-a843-4ea7-8e40-f6a273933052',NULL,10,0,1),(2,'2022-11-05 11:35:59','2022-11-05 12:35:57','5267ec95-0f20-41ce-b035-928a1d10ff9e',NULL,10,1,1),(3,'2022-11-05 11:58:26','2022-11-05 14:44:09','2b639230-b908-4877-a01d-6084a62ee6f8',NULL,10,0,1);
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
  `type` int(10) unsigned DEFAULT NULL,
  `typestr` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `infocoupons`
--

LOCK TABLES `infocoupons` WRITE;
/*!40000 ALTER TABLE `infocoupons` DISABLE KEYS */;
INSERT INTO `infocoupons` VALUES (1,'2022-11-06 08:49:43',NULL,NULL,NULL,NULL,'67786',67786,'DISCOUNT'),(2,'2022-11-06 08:50:44',NULL,NULL,NULL,NULL,'55539',55539,'DISCOUNT_DELIVERY'),(3,'2022-11-06 08:51:08',NULL,NULL,NULL,NULL,'71619',71619,'GIFT'),(4,'2022-11-06 08:51:39',NULL,NULL,NULL,NULL,'21808',21808,'BOGO'),(5,'2022-11-06 08:53:19',NULL,NULL,NULL,NULL,'11743',11743,'MILEAGE');
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
  `options` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iteminfo`
--

LOCK TABLES `iteminfo` WRITE;
/*!40000 ALTER TABLE `iteminfo` DISABLE KEYS */;
INSERT INTO `iteminfo` VALUES (1,'2022-11-02 10:24:31','2022-11-04 02:43:44','2b639230-b908-4877-a01d-6084a62ee6f8','{\"용량 또는 중량\":\"200g\",\"제품 주요 사양\":\"친환경 비누\",\"사용기한 또는 개봉 후 사용기간\":\"제조일로부터 1년\",\"사용방법\":\"거품을 내어 원하는 부위를 청결히 한다\",\"제조업자\":\"주) 아리따움\",\"제조국\":\"CN\",\"주요성분\":\"인공지방유 및 합성세제\",\"사용할 때 주의사항\":\"눈에 들어가지 않도록 주의하세요\",\"품질보증기준\":\"공정거래위원회의 보증기준을 따릅니다\",\"소비자 상담관련 전화번호\":\"+82-02-5676-5098\",\"AS 책임자\":\"Tian Shun\"}','{\"color\":[\"W\",\"B\",\"G\"],\"scent\":[\"Wildflower blush\",\"Date night\",\"Lovely bouquet\"]}'),(2,'2022-11-04 02:45:58',NULL,'2366e241-a843-4ea7-8e40-f6a273933052',NULL,'{\"color\":[\"W\",\"B\",\"G\"],\"scent\":[\"Wildflower blush\",\"Date night\",\"Lovely bouquet\"]}'),(3,'2022-11-04 02:46:27',NULL,'573f71bf-0e16-409b-be30-86007e5b4fba',NULL,'{\"color\":[\"W\",\"B\",\"G\"],\"scent\":[\"Wildflower blush\",\"Date night\",\"Lovely bouquet\"]}'),(4,'2022-11-04 02:46:44',NULL,'5267ec95-0f20-41ce-b035-928a1d10ff9e',NULL,'{\"color\":[\"W\",\"B\",\"G\"],\"scent\":[\"Wildflower blush\",\"Date night\",\"Lovely bouquet\"]}');
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
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logorders`
--

LOCK TABLES `logorders` WRITE;
/*!40000 ALTER TABLE `logorders` DISABLE KEYS */;
INSERT INTO `logorders` VALUES (11,'2022-11-03 11:15:49',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'81584e71-b1c5-4fae-836f-3ce25ba028f3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'2b639230-b908-4877-a01d-6084a62ee6f8',5,'PAST_EXPIRY'),(12,'2022-11-03 11:15:49',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'76333c55-8702-4386-a483-349efb99d84a',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,7,'573f71bf-0e16-409b-be30-86007e5b4fba',4,'DOES_NOT_FIT'),(13,'2022-11-03 11:15:49',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'42301b0e-556f-4ee4-9d1e-14802e242749',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'2366e241-a843-4ea7-8e40-f6a273933052',1,'DELAY'),(14,'2022-11-03 11:15:49',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0da2605b-3b34-42e6-a9ee-9a57d048912c',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'5267ec95-0f20-41ce-b035-928a1d10ff9e',5,'PAST_EXPIRY'),(15,'2022-11-03 11:15:49',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'60516d50-9a0b-45fb-bde2-86bafdb640c2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'573f71bf-0e16-409b-be30-86007e5b4fba',5,'PAST_EXPIRY'),(16,'2022-11-03 11:15:49',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'1c748201-e65b-417c-9810-534e4dc16bd4',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'5267ec95-0f20-41ce-b035-928a1d10ff9e',2,'DEFECT'),(17,'2022-11-03 11:15:49',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'a9f44dea-0af6-407c-bd16-62177064f518',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,7,'573f71bf-0e16-409b-be30-86007e5b4fba',4,'DOES_NOT_FIT'),(18,'2022-11-03 11:15:49',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2a995ae2-e737-4c40-b42f-24a8a555120d',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'2366e241-a843-4ea7-8e40-f6a273933052',3,'CHANGE_MIND'),(19,'2022-11-03 11:15:49',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'c7900c59-6bc6-41de-a2d7-1b9d9b9262a5',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'5267ec95-0f20-41ce-b035-928a1d10ff9e',2,'DEFECT'),(20,'2022-11-03 11:15:49',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'42e2005a-1a3b-4a45-97e4-edcebb0b725c',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'5267ec95-0f20-41ce-b035-928a1d10ff9e',2,'DEFECT'),(21,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2fdbbeb1-6b27-46c5-a0a8-d8c3bdb3c97c',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'573f71bf-0e16-409b-be30-86007e5b4fba',4,'DOES_NOT_FIT'),(22,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'96611c92-51a6-4a94-915e-2d7c3ad6c419',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'573f71bf-0e16-409b-be30-86007e5b4fba',3,'CHANGE_MIND'),(23,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dba33b25-957d-4664-87e0-d52dbc6ffbb3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,7,'573f71bf-0e16-409b-be30-86007e5b4fba',3,'CHANGE_MIND'),(24,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'52fe244b-6c52-4285-ac43-655db0d9d46d',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'573f71bf-0e16-409b-be30-86007e5b4fba',4,'DOES_NOT_FIT'),(25,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'066b6cac-f691-406a-bee5-4a47115f1811',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'5267ec95-0f20-41ce-b035-928a1d10ff9e',4,'DOES_NOT_FIT'),(26,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'f6e20704-8fc8-4c9b-8467-6e77900f0a56',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'573f71bf-0e16-409b-be30-86007e5b4fba',3,'CHANGE_MIND'),(27,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'8cd1018e-6c6b-4c3a-9e32-8d94c0b2b1f5',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,'573f71bf-0e16-409b-be30-86007e5b4fba',3,'CHANGE_MIND'),(28,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'f1be5f3b-f004-4579-8c2e-ce9ed0db57fa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'573f71bf-0e16-409b-be30-86007e5b4fba',4,'DOES_NOT_FIT'),(29,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ca4eef65-3cc2-4594-8993-c361ffcb2609',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,7,'573f71bf-0e16-409b-be30-86007e5b4fba',4,'DOES_NOT_FIT'),(30,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'128d87bc-7187-4a29-9a59-bda658bc645c',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'2366e241-a843-4ea7-8e40-f6a273933052',5,'PAST_EXPIRY'),(31,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'73ae912d-4fbf-44bb-83be-c79699838bda',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,'573f71bf-0e16-409b-be30-86007e5b4fba',5,'PAST_EXPIRY'),(32,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'d4045f32-6c4f-4b38-93dc-f552e102ad7e',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,'573f71bf-0e16-409b-be30-86007e5b4fba',5,'PAST_EXPIRY'),(33,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'005b7468-94e3-4f14-9ab1-ed2f6c60b538',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,'2b639230-b908-4877-a01d-6084a62ee6f8',2,'DEFECT'),(34,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'52cc90d1-9cb1-4d46-bf86-c60ca6cf0c1b',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'5267ec95-0f20-41ce-b035-928a1d10ff9e',4,'DOES_NOT_FIT'),(35,'2022-11-03 14:08:48',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'e4b9c116-be19-4180-ac4e-191bb18ce1d9',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,7,'5267ec95-0f20-41ce-b035-928a1d10ff9e',1,'DELAY'),(36,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'4dc18c54-37d3-4a7d-81aa-ce88a9388105',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'2366e241-a843-4ea7-8e40-f6a273933052',5,'PAST_EXPIRY'),(37,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'5c741b93-9759-4159-8ae7-5e80756b54a7',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'2b639230-b908-4877-a01d-6084a62ee6f8',3,'CHANGE_MIND'),(38,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'07c2395e-c25a-46ee-baae-c29d05bee275',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'5267ec95-0f20-41ce-b035-928a1d10ff9e',2,'DEFECT'),(39,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'f3956419-e962-45b4-8a94-f417b940cb5e',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'5267ec95-0f20-41ce-b035-928a1d10ff9e',4,'DOES_NOT_FIT'),(40,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'b8f6d101-85a4-4424-8a58-7bf437d3d402',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'2b639230-b908-4877-a01d-6084a62ee6f8',4,'DOES_NOT_FIT'),(41,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'469be380-40ea-463f-925b-7be2c023061b',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'573f71bf-0e16-409b-be30-86007e5b4fba',3,'CHANGE_MIND'),(42,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dee32671-1623-4816-840c-74ce4bf016a2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'573f71bf-0e16-409b-be30-86007e5b4fba',3,'CHANGE_MIND'),(43,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'c865bfb8-d7fb-43a1-a965-c1673d179c58',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'573f71bf-0e16-409b-be30-86007e5b4fba',3,'CHANGE_MIND'),(44,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'bbe634c0-d0d4-420c-9d25-d3cc2376283f',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'2366e241-a843-4ea7-8e40-f6a273933052',4,'DOES_NOT_FIT'),(45,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'8954c26b-8a95-44cc-9b81-b95c09ee1c14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'2b639230-b908-4877-a01d-6084a62ee6f8',2,'DEFECT'),(46,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'cebd28e4-d077-4243-b501-5aa41a05bcee',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'2366e241-a843-4ea7-8e40-f6a273933052',4,'DOES_NOT_FIT'),(47,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'4634f96d-422b-4dc0-aecd-4000fe1f84c9',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,7,'2366e241-a843-4ea7-8e40-f6a273933052',4,'DOES_NOT_FIT'),(48,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'127ccccd-aa34-4f7d-af73-44d5b82fb37f',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,'5267ec95-0f20-41ce-b035-928a1d10ff9e',2,'DEFECT'),(49,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'4bb69d50-2ccc-437d-9873-b00573b9fcd8',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'573f71bf-0e16-409b-be30-86007e5b4fba',2,'DEFECT'),(50,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'a336aef0-51ee-4e97-b1de-66d3ada90364',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'573f71bf-0e16-409b-be30-86007e5b4fba',3,'CHANGE_MIND'),(51,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'cf85e428-834e-4417-86d2-fc7516667f87',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'2b639230-b908-4877-a01d-6084a62ee6f8',2,'DEFECT'),(52,'2022-11-03 14:10:04',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'783a33d3-0af5-428f-8c41-89f5f130c641',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'573f71bf-0e16-409b-be30-86007e5b4fba',2,'DEFECT'),(53,'2022-11-04 07:32:56',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'b601a0a5-e4af-40e4-b0ec-8cc16db19fcc',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'573f71bf-0e16-409b-be30-86007e5b4fba',2,'DEFECT'),(54,'2022-11-04 07:32:56',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'fb52caec-4030-4642-a53f-9b565a67e634',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'573f71bf-0e16-409b-be30-86007e5b4fba',1,'DELAY'),(55,'2022-11-04 07:32:56',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'981a2d0f-342d-491f-b246-d37f8bfeea41',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'5267ec95-0f20-41ce-b035-928a1d10ff9e',1,'DELAY'),(56,'2022-11-04 07:32:56',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'1b9fbd0f-2980-4ec5-9f44-908b4febee5b',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,'2366e241-a843-4ea7-8e40-f6a273933052',2,'DEFECT'),(57,'2022-11-04 07:32:56',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ea719aab-022b-4c98-8602-d20d4aa53e47',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'573f71bf-0e16-409b-be30-86007e5b4fba',5,'PAST_EXPIRY'),(58,'2022-11-04 07:32:56',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'8c553214-02ee-4799-aeab-9957f514a42e',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'5267ec95-0f20-41ce-b035-928a1d10ff9e',4,'DOES_NOT_FIT'),(59,'2022-11-04 07:32:56',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'4586905c-12f5-4c5c-b41f-2e7e27516fe9',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'2366e241-a843-4ea7-8e40-f6a273933052',2,'DEFECT'),(60,'2022-11-04 07:32:56',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'630d8753-9dfd-4aac-98d3-a9e6db9481fd',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'573f71bf-0e16-409b-be30-86007e5b4fba',4,'DOES_NOT_FIT'),(61,'2022-11-04 07:32:56',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0c55bf4b-717c-4375-8b64-861c47981019',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'573f71bf-0e16-409b-be30-86007e5b4fba',2,'DEFECT'),(62,'2022-11-04 07:32:56',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'9a714523-9cc7-48b4-8b69-9e19f69a350d',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,'573f71bf-0e16-409b-be30-86007e5b4fba',4,'DOES_NOT_FIT'),(63,'2022-11-04 07:32:56',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'5bfb053a-7326-4273-86b5-923275a67b33',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,'2366e241-a843-4ea7-8e40-f6a273933052',2,'DEFECT'),(64,'2022-11-04 07:32:56',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'6eb690e4-d210-4e39-a20f-5fd888c11679',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'5267ec95-0f20-41ce-b035-928a1d10ff9e',4,'DOES_NOT_FIT'),(65,'2022-11-04 07:32:56',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'7bc30c69-1353-4505-b404-07ad98cc1fab',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,'2366e241-a843-4ea7-8e40-f6a273933052',2,'DEFECT'),(66,'2022-11-04 07:32:56',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'cc3d7fd8-d019-4594-a114-86abdc319d22',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,'2366e241-a843-4ea7-8e40-f6a273933052',4,'DOES_NOT_FIT'),(67,'2022-11-04 07:32:56',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'b240492f-5e7c-41ba-83c6-9c4f2a45206f',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,'2366e241-a843-4ea7-8e40-f6a273933052',2,'DEFECT'),(68,'2022-11-04 07:32:56',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'cbf39c77-6f97-4f23-8ada-f1e13470b4d2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'5267ec95-0f20-41ce-b035-928a1d10ff9e',1,'DELAY'),(69,'2022-11-04 07:32:56',NULL,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dfef9369-d5a0-478f-8979-772b7b1fc78c',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,7,'2b639230-b908-4877-a01d-6084a62ee6f8',5,'PAST_EXPIRY');
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
  `options` text DEFAULT NULL,
  `tracknumber` varchar(100) DEFAULT NULL,
  `carrierid` int(10) unsigned DEFAULT NULL,
  `detailuuid` varchar(60) DEFAULT NULL,
  `carriersymbol` varchar(20) DEFAULT NULL,
  `carriername` varchar(20) DEFAULT NULL,
  `orderer` varchar(60) DEFAULT NULL,
  `receiver` varchar(60) DEFAULT NULL,
  `phonenumber` varchar(60) DEFAULT NULL,
  `feedelivery` varchar(20) DEFAULT NULL,
  `feedeliveryunit` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COMMENT='orders by users';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2022-11-01 13:27:31','2022-11-05 09:08:41',11,NULL,NULL,17,'406300',NULL,NULL,NULL,NULL,NULL,NULL,'59ff67af-9bdf-4f5e-b938-e410eda4abbe',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2366e241-a843-4ea7-8e40-f6a273933052',NULL,'f5d74-2390e8e92-e8e92',NULL,'7164d287-1eca-4bf5-891c-a03a9f7887a7','HANSAM',NULL,NULL,NULL,NULL,NULL,NULL),(4,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,33,'23900',2,'47800','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'ab829968-6acf-4c43-8d2f-f84be912ee3b',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'5267ec95-0f20-41ce-b035-928a1d10ff9e',NULL,'ec9-57e4ea80-a807d3',NULL,'ff6126d8-f3e9-4d40-9eca-b095f8856293','HANSAM',NULL,NULL,NULL,NULL,NULL,NULL),(5,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,33,'23900',4,'95600','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'033d29e9-9d9c-4785-be6f-cc6feaf4653e',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'5267ec95-0f20-41ce-b035-928a1d10ff9e',NULL,'18e-7ea5ab0429-4295',NULL,'c010a2cf-2a72-4639-9cf1-0a6be43b2081','CURUN',NULL,NULL,NULL,NULL,NULL,NULL),(6,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,31,'23900',1,'23900','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'d617a876-9b81-45e2-bfd6-b357410e95f7',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2366e241-a843-4ea7-8e40-f6a273933052',NULL,'d7e3-18bd6bc19c-c19c',NULL,'c25f5f91-9338-453e-9b68-d4cc323d7d65','YONGMA',NULL,NULL,NULL,NULL,NULL,NULL),(7,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,32,'16000',4,'64000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'984588b2-4e3d-42aa-8554-2968dd645517',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,'573f71bf-0e16-409b-be30-86007e5b4fba',NULL,'2efd-a1c653546c-546c',NULL,'0e2171b3-8989-4d5d-a4c8-e334dd3c124a','HANJIN',NULL,NULL,NULL,NULL,NULL,NULL),(8,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,32,'16000',2,'32000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'0a498a31-c87b-4854-babd-eebeade0ecc2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'573f71bf-0e16-409b-be30-86007e5b4fba',NULL,'661fd-d3dee7862-7862',NULL,'a642142f-7764-48c7-8446-17fb02b39c65','VALEX',NULL,NULL,NULL,NULL,NULL,NULL),(9,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,31,'23900',5,'119500','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'fd8ff228-14bb-4324-9048-1a99021303c3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,'2366e241-a843-4ea7-8e40-f6a273933052',NULL,'1496-74b2f472b-472be',NULL,'0d03f64a-d66c-4a01-a87e-180212801c85','HK',NULL,NULL,NULL,NULL,NULL,NULL),(10,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,32,'16000',3,'48000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'ccbda2de-382e-4d9a-86bb-9a0f8a635dfc',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'573f71bf-0e16-409b-be30-86007e5b4fba',NULL,'5f12f-9cb0b6166-166',NULL,'e0866bac-5e1e-428e-990a-5dd7b15d3382','URIHAN',NULL,NULL,NULL,NULL,NULL,NULL),(11,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,32,'16000',6,'96000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'00e2ac85-248c-4306-91d4-7f132e28ecc0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'573f71bf-0e16-409b-be30-86007e5b4fba',NULL,'b09f-5a024206-4206e7',NULL,'7400bca8-d4f7-4fa1-8a4d-cbd670b52310','KJT',NULL,NULL,NULL,NULL,NULL,NULL),(12,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,32,'16000',3,'48000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'c456b25a-3c84-4415-8ccc-ffff0be0cbaa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'573f71bf-0e16-409b-be30-86007e5b4fba',NULL,'137c-ff405acd92-d92',NULL,'2030ffb8-027a-42b8-a917-1a88ebdc17b9','HOMEPICK',NULL,NULL,NULL,NULL,NULL,NULL),(13,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,33,'23900',2,'47800','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'57995b91-8999-4883-bc56-cf93b011fbc8',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,'5267ec95-0f20-41ce-b035-928a1d10ff9e',NULL,'fca3-a18538ebe-8ebe3',NULL,'dd540e46-db5d-49f1-88ac-9d1a1c1e2e71','TANGO',NULL,NULL,NULL,NULL,NULL,NULL),(14,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,33,'23900',3,'71700','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'446df8de-0271-40c4-ba13-ae1c78ff2de4',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'5267ec95-0f20-41ce-b035-928a1d10ff9e',NULL,'318fc-450fc8c84-c8c84',NULL,'2770feb6-320d-48a6-a449-4a266c487ea8','THEBAO',NULL,NULL,NULL,NULL,NULL,NULL),(15,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,31,'23900',4,'95600','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'ee23eabf-c71b-4d13-b4ea-9ebc2fb7aeb1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2366e241-a843-4ea7-8e40-f6a273933052',NULL,'b0287-8f2a55e5a-55e5a',NULL,'6f2d9475-bbf7-4986-a824-f2cd80add1b9','GOOD',NULL,NULL,NULL,NULL,NULL,NULL),(16,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,33,'23900',5,'119500','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'7f86eb1a-314b-4c46-96e7-db11c6fc6d51',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'5267ec95-0f20-41ce-b035-928a1d10ff9e',NULL,'cba5-7b694bd606-606',NULL,'b5c445ff-8fab-4a82-9148-4702318b2840','TODAYSH',NULL,NULL,NULL,NULL,NULL,NULL),(17,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,34,'26000',6,'156000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'8480c02c-99aa-4bf0-a80c-57a8f2896c10',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2b639230-b908-4877-a01d-6084a62ee6f8',NULL,'d164-056049139-91393',NULL,'3178aa21-9dc9-4e15-b081-1e266b5887f5','VALEX',NULL,NULL,NULL,NULL,NULL,NULL),(18,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,33,'23900',2,'47800','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'3d1213f7-ff7d-4569-b1ad-6934a3723c17',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,'5267ec95-0f20-41ce-b035-928a1d10ff9e',NULL,'c9a10-3adf34ffd-34ffd',NULL,'fce11ce2-618e-448c-9912-6a76877e3c65','TODAYSH',NULL,NULL,NULL,NULL,NULL,NULL),(19,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,34,'26000',2,'52000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'9578b272-6db7-44c9-bed3-64f09543e675',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2b639230-b908-4877-a01d-6084a62ee6f8',NULL,'af73-c4770b39b4-9b4',NULL,'9e220fb6-d5ec-448f-9aa9-cfb6241e713d','LOGISVAL',NULL,NULL,NULL,NULL,NULL,NULL),(20,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,32,'16000',3,'48000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'c588c860-2ae2-4fa8-86db-a40ae3a82fa3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'573f71bf-0e16-409b-be30-86007e5b4fba',NULL,'1ef-0a34f91e8-1e8e8',NULL,'eb85b928-5058-4c66-a4d2-4abd41fe1029','FULL',NULL,NULL,NULL,NULL,NULL,NULL),(21,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,33,'23900',5,'119500','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'6e575f8b-3f8e-4732-9363-cf3c492e3952',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,'5267ec95-0f20-41ce-b035-928a1d10ff9e',NULL,'833-5d750255cb-5cbe',NULL,'818fb74b-a951-4e3e-a31d-696953898a90','HOMEPICK',NULL,NULL,NULL,NULL,NULL,NULL),(22,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,33,'23900',6,'143400','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'90bffae5-0b8a-4048-afb0-eed51cafccbc',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,'5267ec95-0f20-41ce-b035-928a1d10ff9e',NULL,'55451-81fa384ca-4ca',NULL,'5369fb7e-dd27-4b7f-88d1-0b92d40d28bb','THUNDER',NULL,NULL,NULL,NULL,NULL,NULL),(23,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,32,'16000',6,'96000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'23662f82-8972-4817-beba-3ab1786a8a7c',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,'573f71bf-0e16-409b-be30-86007e5b4fba',NULL,'1d41-f9f43811e2-11e2',NULL,'9b283bb2-503a-4dfe-90b4-4e4c3d06a824','HANSAM',NULL,NULL,NULL,NULL,NULL,NULL),(24,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,33,'23900',2,'47800','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'ac0191a8-134c-4ca5-b4c1-f46f1418ca13',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'5267ec95-0f20-41ce-b035-928a1d10ff9e',NULL,'ea43-76712ef15-ef157',NULL,'db8e7aed-b681-4fe0-9466-6bf81cf91c2b','CHUNIL',NULL,NULL,NULL,NULL,NULL,NULL),(25,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,33,'23900',5,'119500','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'ea2a8122-75f2-4fe5-a2a1-c555f7a6420a',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,'5267ec95-0f20-41ce-b035-928a1d10ff9e',NULL,'81b-8041a2297a-97ab',NULL,'4ed1ffcf-340f-41c4-a84a-c14ba2627055','LOGIS',NULL,NULL,NULL,NULL,NULL,NULL),(26,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,32,'16000',5,'80000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'41a0370c-3f76-40f0-a7d2-d4eab8fe95f1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'573f71bf-0e16-409b-be30-86007e5b4fba',NULL,'0bc-1746be7395-3954',NULL,'bc3c9997-76cf-4638-8c88-48e381f59bd9','HANDEX',NULL,NULL,NULL,NULL,NULL,NULL),(27,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,34,'26000',1,'26000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'dc78e5ae-3979-41ee-8e9d-294185e5ed54',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2b639230-b908-4877-a01d-6084a62ee6f8',NULL,'9db5-75f61297f-297f6',NULL,'a1721d64-a771-4b79-b5e1-8eaea269536e','NTL',NULL,NULL,NULL,NULL,NULL,NULL),(28,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,32,'16000',6,'96000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'1fbe3900-50e8-439e-84a5-8a309e7705d0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,'573f71bf-0e16-409b-be30-86007e5b4fba',NULL,'cdee1-335f6dfe1-6dfe1',NULL,'c14714b1-518a-4af4-b994-a65dbc90c52c','HANJIN',NULL,NULL,NULL,NULL,NULL,NULL),(29,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,32,'16000',2,'32000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'1d2b757e-730b-446e-9941-acff8af88665',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,'573f71bf-0e16-409b-be30-86007e5b4fba',NULL,'52bb-2d2e4ffed5-ed5',NULL,'f8c1d06f-fe37-416c-8be7-ff7a68985a51','TANGO',NULL,NULL,NULL,NULL,NULL,NULL),(30,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,32,'16000',1,'16000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'01fe4f94-66a3-4668-a55b-c2cc405298c0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,'573f71bf-0e16-409b-be30-86007e5b4fba',NULL,'117a-1ce4c171-c171e5',NULL,'1c12178e-526b-4df0-804e-1eb5de68edfa','LOGEN',NULL,NULL,NULL,NULL,NULL,NULL),(31,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,31,'23900',6,'143400','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'86bc98a6-a44e-47e3-8a7b-762627d5c0fc',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,'2366e241-a843-4ea7-8e40-f6a273933052',NULL,'6f25a-2f8a1df21-df21',NULL,'ee6044f8-9760-45e1-80cf-f85b2725bc0d','DODO',NULL,NULL,NULL,NULL,NULL,NULL),(32,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,32,'16000',2,'32000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'d2d6779c-f8a7-4179-aac5-ab4b1772971f',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,'573f71bf-0e16-409b-be30-86007e5b4fba',NULL,'bb44-e69d0691c8-1c8',NULL,'eb34a0be-f7a7-435c-afe9-8784bd366552','HANJIN',NULL,NULL,NULL,NULL,NULL,NULL),(33,'2022-11-03 13:55:37','2022-11-05 08:39:35',10,34,'26000',4,'104000','0x5217fD89B12B61d866359fAbf40B706199197af5','PURE',NULL,NULL,NULL,NULL,'36acde78-47ac-437c-9add-bea302f9c6a9',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2b639230-b908-4877-a01d-6084a62ee6f8',NULL,'d1b79-d090aa3b9-3b9',NULL,'39947e3b-c790-4bef-b9e6-0daf6adc7a79','LOTTE7',NULL,NULL,NULL,NULL,NULL,NULL),(34,'2022-11-04 11:32:29','2022-11-05 08:39:35',10,NULL,NULL,2,'47800',NULL,NULL,NULL,NULL,NULL,NULL,'0135879b-60f7-488d-b4fb-77b6c3837f68',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2366e241-a843-4ea7-8e40-f6a273933052',NULL,'a4a4-9f67caa51-aa514',NULL,'194b5486-a2a4-4804-bba4-e9687f371834','DELI',NULL,NULL,NULL,NULL,NULL,NULL),(35,'2022-11-04 11:32:29','2022-11-05 08:39:35',10,NULL,NULL,2,'32000',NULL,NULL,NULL,NULL,NULL,NULL,'0135879b-60f7-488d-b4fb-77b6c3837f68',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'573f71bf-0e16-409b-be30-86007e5b4fba',NULL,'b7d6-2703bf0c-bf0cda',NULL,'facc44eb-0f92-4be1-b3bf-216d2791dd0a','LAST',NULL,NULL,NULL,NULL,NULL,NULL),(36,'2022-11-04 11:32:29','2022-11-05 08:39:35',10,NULL,NULL,4,'275200',NULL,NULL,NULL,NULL,NULL,NULL,'0135879b-60f7-488d-b4fb-77b6c3837f68',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'5267ec95-0f20-41ce-b035-928a1d10ff9e',NULL,'4cc-02763e8f4b-f4b2',NULL,'f3cd0a01-5fad-4b58-aabe-e511c55555d0','NONGHYUP',NULL,NULL,NULL,NULL,NULL,NULL),(37,'2022-11-04 11:32:29','2022-11-05 08:39:35',10,NULL,NULL,4,'123200',NULL,NULL,NULL,NULL,NULL,NULL,'0135879b-60f7-488d-b4fb-77b6c3837f68',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2b639230-b908-4877-a01d-6084a62ee6f8',NULL,'f52-e098ebf2e8e-e8e',NULL,'bba8f440-3ed4-4d15-ba1f-6177e43a00f1','ARGO',NULL,NULL,NULL,NULL,NULL,NULL),(38,'2022-11-04 11:32:29','2022-11-05 09:08:41',10,NULL,NULL,6,'143400',NULL,NULL,NULL,NULL,NULL,NULL,'0135879b-60f7-488d-b4fb-77b6c3837f68',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2366e241-a843-4ea7-8e40-f6a273933052',NULL,'e5f-91d3781384-3847',NULL,'4c9efb50-d960-408f-9420-0f87040fd072','LOGIS',NULL,NULL,NULL,NULL,NULL,NULL),(39,'2022-11-04 11:32:29','2022-11-05 09:08:41',10,NULL,NULL,8,'246400',NULL,NULL,NULL,NULL,NULL,NULL,'0135879b-60f7-488d-b4fb-77b6c3837f68',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2b639230-b908-4877-a01d-6084a62ee6f8',NULL,'077d5-439541206-41206',NULL,'b8c59436-9338-499b-839f-bd4fb52e5dc8','NONGHYUP',NULL,NULL,NULL,NULL,NULL,NULL),(40,'2022-11-04 11:35:32','2022-11-05 08:39:35',10,NULL,NULL,2,'47800',NULL,NULL,NULL,NULL,NULL,NULL,'3bfa9cdf-0113-47aa-bfff-a4b5e0969d5d',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2366e241-a843-4ea7-8e40-f6a273933052',NULL,'6770-2448b4620c-20c',NULL,'f115a90b-4f75-432b-b6d7-0c4acec7e486','NONGHYUP',NULL,NULL,NULL,NULL,NULL,NULL),(41,'2022-11-04 11:35:32','2022-11-05 08:39:35',10,NULL,NULL,2,'32000',NULL,NULL,NULL,NULL,NULL,NULL,'3bfa9cdf-0113-47aa-bfff-a4b5e0969d5d',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'573f71bf-0e16-409b-be30-86007e5b4fba',NULL,'4f00-0db5c28af3-8af3',NULL,'19e7e240-91e8-412f-82f7-b635a28628eb','HK',NULL,NULL,NULL,NULL,NULL,NULL),(42,'2022-11-04 11:35:32','2022-11-05 08:39:35',10,NULL,NULL,4,'275200',NULL,NULL,NULL,NULL,NULL,NULL,'3bfa9cdf-0113-47aa-bfff-a4b5e0969d5d',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'5267ec95-0f20-41ce-b035-928a1d10ff9e',NULL,'19fb-11d7c5085c-85c',NULL,'362cc306-c9da-4bc3-b400-e4c5cb5ee5a1','LOGEN',NULL,NULL,NULL,NULL,NULL,NULL),(43,'2022-11-04 11:35:32','2022-11-05 08:39:35',10,NULL,NULL,4,'123200',NULL,NULL,NULL,NULL,NULL,NULL,'3bfa9cdf-0113-47aa-bfff-a4b5e0969d5d',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2b639230-b908-4877-a01d-6084a62ee6f8',NULL,'ce1e-1903b290-b290e6',NULL,'9d9f0960-5ce4-47fe-892e-f9b35662b335','HANJIN',NULL,NULL,NULL,NULL,NULL,NULL),(44,'2022-11-04 11:35:32','2022-11-05 09:08:41',10,NULL,NULL,6,'143400',NULL,NULL,NULL,NULL,NULL,NULL,'3bfa9cdf-0113-47aa-bfff-a4b5e0969d5d',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2366e241-a843-4ea7-8e40-f6a273933052',NULL,'8952-98c05ea0ff-0ff',NULL,'43eb6e7e-e693-41c8-9b5a-f9ccefe1d762','LOTTE',NULL,NULL,NULL,NULL,NULL,NULL),(45,'2022-11-04 11:35:32','2022-11-05 09:08:41',10,NULL,NULL,8,'246400',NULL,NULL,NULL,NULL,NULL,NULL,'3bfa9cdf-0113-47aa-bfff-a4b5e0969d5d',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2b639230-b908-4877-a01d-6084a62ee6f8',NULL,'7a44-7c719867-986719',NULL,'75593fcd-9e4b-452c-8122-22cecf3f6d0c','GUNYOUNG',NULL,NULL,NULL,NULL,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `physicaladdresses`
--

LOCK TABLES `physicaladdresses` WRITE;
/*!40000 ALTER TABLE `physicaladdresses` DISABLE KEYS */;
INSERT INTO `physicaladdresses` VALUES (1,'2022-10-31 16:27:51','2022-11-06 08:13:25',11,'강남구 테헤란로25길','역삼현대벤쳐 텔(역삼동)','05622','KR',1,0,'75869950-5820-11ed-ae0f-0ad9133e76f6'),(2,'2022-11-01 17:06:39','2022-11-06 08:13:25',11,'Seoul, Songpa-gu, ogeum-ro','15 gil 9-5 (Bangi-dong) B01','05622','KR',1,1,'3ce3c2fa-c3d4-5a03-bcf2-b46294e680e7'),(3,'2022-11-04 11:28:01','2022-11-06 08:13:25',10,'서울특별시 강남구 선릉로190길 114 6층','33호','05622','KR',1,1,'3ceef35c-6917-5573-9a10-241a5ad674a5'),(4,'2022-11-06 04:49:57','2022-11-06 04:52:01',10,'서울 강남구 역삼동 825','1501호','06232','KR',1,0,'cdac838c-e88c-4349-b4d7-1bc964aae272');
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
  `ispublic` tinyint(4) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL COMMENT '0: wait for answer, 1: answered, 2: etc',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qna`
--

LOCK TABLES `qna` WRITE;
/*!40000 ALTER TABLE `qna` DISABLE KEYS */;
INSERT INTO `qna` VALUES (1,'2022-11-04 13:05:32',NULL,'energy ten article',NULL,NULL,NULL,NULL,'61149104-caad-4e56-9ed5-01b306bd7faf','2366e241-a843-4ea7-8e40-f6a273933052',NULL,0,0),(2,'2022-11-04 13:05:32',NULL,'they audience palace',NULL,NULL,NULL,NULL,'68836c50-cfd2-46d5-9975-e64a4c4fa595','2b639230-b908-4877-a01d-6084a62ee6f8',NULL,0,0),(3,'2022-11-04 13:05:32',NULL,'corn avoid basis','soft plastic calmly sliced because some old lady proudly died above a lovely professor which, became a vibrating, dumb bird',NULL,NULL,NULL,'15145510-54de-4787-8fbf-b995e913100b','573f71bf-0e16-409b-be30-86007e5b4fba',NULL,0,1),(4,'2022-11-04 13:05:32',NULL,'raw near minerals','hot dog elegantly ran because some professor shockingly breathed through a slimy professor which, became a lazy, lazy clock',NULL,NULL,NULL,'72b1d770-c6a3-4863-89e5-74f8d2d17de4','573f71bf-0e16-409b-be30-86007e5b4fba',NULL,0,1),(5,'2022-11-04 13:05:32',NULL,'exchange cage chance according','rough boy elegantly flew because some teacher humbly rolled below a professional dog which, became a lazy, professional old lady',NULL,NULL,NULL,'3c03f8dc-5995-40e6-8fbb-777947bf8a65','2366e241-a843-4ea7-8e40-f6a273933052',NULL,0,1),(6,'2022-11-04 13:05:32',NULL,'market funny actual repeat',NULL,NULL,NULL,NULL,'9bbd776a-153d-4ae7-b8e8-de854315079b','2366e241-a843-4ea7-8e40-f6a273933052',NULL,1,0),(7,'2022-11-04 13:05:32',NULL,'body tonight understanding','lazy dog precisely dodged because some clock elegantly ran into a slimy hamster which, became a professional, lovely boy',NULL,NULL,NULL,'11b27804-afe3-4597-843e-8702762df327','573f71bf-0e16-409b-be30-86007e5b4fba',NULL,1,1),(8,'2022-11-04 13:05:32',NULL,'nothing against worth',NULL,NULL,NULL,NULL,'52c5d55d-2637-426c-bd69-7012b9b7ba72','5267ec95-0f20-41ce-b035-928a1d10ff9e',NULL,1,0),(9,'2022-11-04 13:05:32',NULL,'carefully atmosphere party',NULL,NULL,NULL,NULL,'34f697bb-0cef-44fd-a952-1072364a0cb2','5267ec95-0f20-41ce-b035-928a1d10ff9e',NULL,0,0),(10,'2022-11-04 13:05:32',NULL,'chair face current book','rough hamster slowly died because some teacher humbly rolled below a vibrating duck which, became a beautiful, soft professor',NULL,NULL,NULL,'fc28d517-860a-49cf-950f-9a9e1c8013c8','573f71bf-0e16-409b-be30-86007e5b4fba',NULL,1,1),(11,'2022-11-04 13:05:32',NULL,'kill choose north',NULL,NULL,NULL,NULL,'87dd83b2-5ec2-4df0-b28f-9698e8fbe21e','5267ec95-0f20-41ce-b035-928a1d10ff9e',NULL,1,0),(12,'2022-11-04 13:05:32',NULL,'office largest',NULL,NULL,NULL,NULL,'4e9f34f6-91ec-419e-95d6-2445b2d44b15','2366e241-a843-4ea7-8e40-f6a273933052',NULL,1,0),(13,'2022-11-04 13:05:32',NULL,'valuable nobody official','professional duck sadly ran because some boy precisely flew up a dumb plastic which, became a dumb, lazy clock',NULL,NULL,NULL,'8fa946ed-8c5d-45d0-af7c-7a53a50bee82','573f71bf-0e16-409b-be30-86007e5b4fba',NULL,1,1),(14,'2022-11-04 13:05:32',NULL,'magic week still merely','hot old lady shockingly kicked because some professor shockingly breathed through a soft hamster which, became a hot, beautiful clock',NULL,NULL,NULL,'6eab4feb-6877-44ae-adbd-844ce8cbac96','2b639230-b908-4877-a01d-6084a62ee6f8',NULL,0,1),(15,'2022-11-04 13:05:32',NULL,'against men red burn','lazy dog shockingly kicked because some clock elegantly ran into a slimy dog which, became a hot, beautiful teacher',NULL,NULL,NULL,'2528cd12-c483-4d2b-a4fb-ab79ec60763a','573f71bf-0e16-409b-be30-86007e5b4fba',NULL,0,1),(16,'2022-11-04 13:05:32',NULL,'bite locate each','dumb plastic humbly breathed because some duck sadly sliced upon a lovely plastic which, became a rough, hot professor',NULL,NULL,NULL,'945e8db7-7e9b-4522-b061-1ed15bdb3cee','5267ec95-0f20-41ce-b035-928a1d10ff9e',NULL,0,1),(17,'2022-11-04 13:05:32',NULL,'balloon fine save',NULL,NULL,NULL,NULL,'c65e201a-b9a1-4a5a-82be-54e12769f525','5267ec95-0f20-41ce-b035-928a1d10ff9e',NULL,0,0),(18,'2022-11-05 14:11:16',NULL,'sdfasdfasdf',NULL,NULL,NULL,NULL,'ca28b502-3b1f-4026-bfe8-67f27d5308ca','5267ec95-0f20-41ce-b035-928a1d10ff9e',NULL,1,NULL);
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
  `titlename` varchar(300) DEFAULT NULL,
  `contentbody` text DEFAULT NULL,
  `isnotify` tinyint(4) DEFAULT NULL,
  `phonenumber` varchar(60) DEFAULT NULL,
  `imageurl00` varchar(500) DEFAULT NULL,
  `imageurl01` varchar(500) DEFAULT NULL,
  `answer` text DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  `statusstr` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
INSERT INTO `requests` VALUES (1,'2022-11-05 13:19:34','2022-11-06 10:10:56',10,NULL,NULL,45,'3bfa9cdf-0113-47aa-bfff-a4b5e0969d5d',2,NULL,'Please I want my money back!!!!','Please I want my money back!!!!',1,'01099999999',NULL,NULL,'by build','1bc31103-9a4d-4ac0-9ba8-e00e3d43fa05','REJECTED'),(2,'2022-11-05 13:22:44','2022-11-06 10:11:05',10,NULL,NULL,45,'3bfa9cdf-0113-47aa-bfff-a4b5e0969d5d',2,NULL,'Hello,','Hello',0,'01098989898',NULL,NULL,'development several special','55ce198d-038e-47e6-a8b9-1faa29683585','REJECTED'),(3,'2022-11-05 13:23:30','2022-11-06 10:11:05',10,NULL,NULL,45,'3bfa9cdf-0113-47aa-bfff-a4b5e0969d5d',3,NULL,'asdfasdf','asdfasdfasasd',0,'fasdfasdf',NULL,NULL,'next poet select thank','e8b48300-5031-4582-8888-f7daadccbb5d','ACCEPTED'),(4,'2022-11-05 13:23:58','2022-11-06 10:11:05',10,NULL,NULL,45,'3bfa9cdf-0113-47aa-bfff-a4b5e0969d5d',1,NULL,'asdfasdfasd','sdfas',1,'fasdf',NULL,NULL,'aloud bush sentence occur','09c55fd1-f2d2-46ae-97c3-0a0b28082ed3','UNDER_REVIEW'),(5,'2022-11-05 13:24:38','2022-11-06 10:11:05',10,NULL,NULL,45,'3bfa9cdf-0113-47aa-bfff-a4b5e0969d5d',2,NULL,'sdf','sdfa',1,'asdf',NULL,NULL,'compare both available rain','8de19b33-ac30-43b3-9c20-eb0a732cf841','REJECTED'),(6,'2022-11-05 14:31:49','2022-11-06 10:11:05',10,NULL,NULL,45,'3bfa9cdf-0113-47aa-bfff-a4b5e0969d5d',1,NULL,'asdfsdaf','asdfasdf',1,'asdfasdf',NULL,NULL,'properly air fine','ab2ebc8f-caad-49bf-8794-2728142dae3e','UNDER_REVIEW'),(7,'2022-11-05 14:35:38','2022-11-06 10:11:05',10,NULL,NULL,44,'3bfa9cdf-0113-47aa-bfff-a4b5e0969d5d',2,NULL,'asdaf','asdfsadfsd',1,'asdfasdf',NULL,NULL,'driver higher chair','fd2cc235-0d84-4a9b-a206-0bfdc85d7b13','REJECTED');
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
  `imageurl03` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COMMENT='user reviews products / items';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,'2022-11-04 12:22:50',NULL,10,NULL,'2366e241-a843-4ea7-8e40-f6a273933052','i love it','a totally gorgeous kind of perfume, try and youll love it too',4.5,1,NULL,NULL,NULL,'1ae4ebc8-f57f-4098-8a16-a9aaa7345fc3',NULL),(2,'2022-11-04 12:51:34',NULL,10,NULL,'2b639230-b908-4877-a01d-6084a62ee6f8','built slabs go many slow','professional clock humbly killed because some boy precisely flew up a lazy hamster which, became a rough, slimy teacher',4,1,NULL,NULL,NULL,'707deac3-740b-4b25-acb0-681c7634558e',NULL),(3,'2022-11-04 12:51:34',NULL,10,NULL,'5267ec95-0f20-41ce-b035-928a1d10ff9e','income anywhere closer plus beautiful','soft boy calmly killed because some old lady proudly died above a professional hamster which, became a vibrating, slimy clock',4,1,NULL,NULL,NULL,'0be4d798-c035-4fc7-bd94-cbbf9cc138ee',NULL),(4,'2022-11-04 12:51:34',NULL,10,NULL,'2366e241-a843-4ea7-8e40-f6a273933052','effect rocket remain to','lazy duck proudly slept because some clock elegantly ran into a dumb plastic which, became a soft, vibrating bird',3,1,NULL,NULL,NULL,'8eccfb7c-f9f4-4a4b-aeae-dd4826a518af',NULL),(5,'2022-11-04 12:51:34',NULL,10,NULL,'5267ec95-0f20-41ce-b035-928a1d10ff9e','gentle fine row around been','beautiful professor precisely died because some bird slowly kicked down a hot professor which, became a professional, soft dog',5,1,NULL,NULL,NULL,'b775da0a-3b86-44f4-8344-e93f9d83c2d6',NULL),(6,'2022-11-04 12:51:34',NULL,10,NULL,'573f71bf-0e16-409b-be30-86007e5b4fba','rabbit nearer thumb graph felt','vibrating teacher proudly rolled because some hamster calmly slept across a rough hamster which, became a soft, rough boy',4,1,NULL,NULL,NULL,'3e034499-6495-4ecf-a1a6-ffe04a9a64a3',NULL),(7,'2022-11-04 12:51:34',NULL,10,NULL,'573f71bf-0e16-409b-be30-86007e5b4fba','level social house','professional dog slowly breathed because some boy precisely flew up a slimy teacher which, became a beautiful, hot hamster',3,1,NULL,NULL,NULL,'015069b9-f4ae-4ae6-9534-477f6afa28e1',NULL),(8,'2022-11-04 12:51:34',NULL,10,NULL,'573f71bf-0e16-409b-be30-86007e5b4fba','chemical neighborhood beyond thou','dumb old lady precisely rolled because some duck sadly sliced upon a soft plastic which, became a professional, rough teacher',1,1,NULL,NULL,NULL,'c5177be2-cbab-4a88-9db5-ee37771d5251',NULL),(9,'2022-11-04 12:51:34',NULL,10,NULL,'2366e241-a843-4ea7-8e40-f6a273933052','mysterious accurate ago enemy mark','lovely professor sadly kicked because some plastic quickly dodged on a hot plastic which, became a dumb, beautiful old lady',3,1,NULL,NULL,NULL,'a84c1e47-cd19-45dd-ba28-360e6f0c13e8',NULL),(10,'2022-11-04 12:51:34',NULL,10,NULL,'573f71bf-0e16-409b-be30-86007e5b4fba','tone collect serious both','slimy old lady sadly dodged because some dog passionately killed towards a soft boy which, became a dumb, lovely bird',3,1,NULL,NULL,NULL,'281ec1fc-3cc6-48ee-a6a4-d8a0d3876b09',NULL),(11,'2022-11-04 12:51:34',NULL,10,NULL,'573f71bf-0e16-409b-be30-86007e5b4fba','tune give soil news','beautiful plastic calmly flew because some bird slowly kicked down a lovely duck which, became a vibrating, professional dog',1,1,NULL,NULL,NULL,'11b69aed-ac0b-4cca-97ea-07e7c9a61508',NULL),(12,'2022-11-04 12:51:34',NULL,10,NULL,'5267ec95-0f20-41ce-b035-928a1d10ff9e','offer ranch region','rough boy sadly slept because some teacher humbly rolled below a professional dog which, became a dumb, vibrating dog',4,1,NULL,NULL,NULL,'024f85e9-41de-4e67-837c-3cab1793818d',NULL),(13,'2022-11-04 12:51:34',NULL,10,NULL,'2366e241-a843-4ea7-8e40-f6a273933052','given sense principle','professional plastic shockingly killed because some boy precisely flew up a lovely hamster which, became a hot, slimy hamster',4,1,NULL,NULL,NULL,'d3d7bc54-0cbf-4fa6-a242-bfc27bd536bd',NULL),(14,'2022-11-04 12:51:34',NULL,10,NULL,'573f71bf-0e16-409b-be30-86007e5b4fba','excellent sitting engine saved','dumb duck proudly flew because some duck sadly sliced upon a dumb duck which, became a soft, professional clock',2,1,NULL,NULL,NULL,'1e30dd00-75fe-4239-b144-6920fb6087d0',NULL),(15,'2022-11-04 12:51:34',NULL,10,NULL,'573f71bf-0e16-409b-be30-86007e5b4fba','sail welcome modern scene crop','dumb boy slowly ran because some duck sadly sliced upon a professional duck which, became a beautiful, lazy hamster',2,1,NULL,NULL,NULL,'a4ed1b1e-bc85-421f-a7ff-1f0cce66aae2',NULL),(16,'2022-11-04 12:51:34',NULL,10,NULL,'2b639230-b908-4877-a01d-6084a62ee6f8','journey dark pictured','hot boy quickly ran because some professor shockingly breathed through a professional clock which, became a lovely, lazy duck',3,1,NULL,NULL,NULL,'495822e5-825e-4f2e-9ae4-12dc2ca4d262',NULL),(17,'2022-11-04 12:51:34',NULL,10,NULL,'573f71bf-0e16-409b-be30-86007e5b4fba','spread lower smile go','soft teacher quickly flew because some old lady proudly died above a rough clock which, became a lovely, professional professor',4,1,NULL,NULL,NULL,'0be3381b-ac6e-4680-a5a2-fc85af7b7aaa',NULL),(18,'2022-11-04 12:51:34',NULL,10,NULL,'5267ec95-0f20-41ce-b035-928a1d10ff9e','measure be hall pilot mysterious','beautiful hamster precisely killed because some bird slowly kicked down a vibrating dog which, became a professional, slimy dog',2,1,NULL,NULL,NULL,'9ccab3aa-6b83-4312-8395-27cf90caf6b5',NULL),(19,'2022-11-06 10:07:15',NULL,10,NULL,'2366e241-a843-4ea7-8e40-f6a273933052','','asdfasdfkkk',5,NULL,NULL,NULL,NULL,'8c10c1f3-fa6f-4b0d-b444-07846638956b',NULL);
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
  `feedelivery` varchar(20) DEFAULT NULL COMMENT 'delivery fee nominal',
  `feedelivery1` varchar(20) DEFAULT NULL COMMENT 'delivery fee for islands, mountail, remote locations',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES (1,'2022-11-02 12:37:00','2022-11-06 05:48:24',NULL,NULL,NULL,'0c0d2065-5aab-11ed-ae0f-0ad9133e76f6',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2b639230-b908-4877-a01d-6084a62ee6f8',NULL,NULL,NULL,'[\"공휴일 및 일요일에도 배송은 이루어지나 다소 지연될수 있습니다\",\"전국 동일하게 24시간 이내 배송을 원칙으로 하고 있습니다\"]','[\"반품 및 교환은 불가합니다\",\"배송과정 중 파손된 제품은 관리자에 문의하시어 환불 요청 가능합니다\"]','[\"공휴일 및 일요일에도 배송은 이루어지나 다소 지연될수 있습니다\",\"전국 동일하게 24시간 이내 배송을 원칙으로 하고 있습니다\"]','6','7'),(2,'2022-11-02 13:10:32','2022-11-06 05:48:24',NULL,NULL,NULL,'bb187dd5-5aaf-11ed-ae0f-0ad9133e76f6',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2366e241-a843-4ea7-8e40-f6a273933052',1,NULL,NULL,'[\"공휴일 및 일요일에도 배송은 이루어지나 다소 지연될수 있습니다\",\"전국 동일하게 24시간 이내 배송을 원칙으로 하고 있습니다\"]','[\"공휴일 및 일요일에도 배송은 이루어지나 다소 지연될수 있습니다\",\"전국 동일하게 24시간 이내 배송을 원칙으로 하고 있습니다\"]','[\"공휴일 및 일요일에도 배송은 이루어지나 다소 지연될수 있습니다\",\"전국 동일하게 24시간 이내 배송을 원칙으로 하고 있습니다\"]','4','4'),(3,'2022-11-06 05:47:02',NULL,NULL,NULL,NULL,'6fc71cec-5d96-11ed-ae0f-0ad9133e76f6',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'573f71bf-0e16-409b-be30-86007e5b4fba',NULL,NULL,NULL,NULL,NULL,NULL,'5','6'),(4,'2022-11-06 05:47:20','2022-11-06 05:48:24',NULL,NULL,NULL,'7ab23227-5d96-11ed-ae0f-0ad9133e76f6',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'5267ec95-0f20-41ce-b035-928a1d10ff9e',NULL,NULL,NULL,NULL,NULL,NULL,'10','1');
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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (1,'2022-11-03 02:25:53',NULL,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjEwLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAxVDAwOjQyOjEyLjAwMFoiLCJlbWFpbCI6ImNoZW55NWR5aEBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiM2RmMGJmYTctNGY2MC0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTYiLCJteXJlZmVyZXJjb2RlIjoiYWI2NTQ2YWFmZjEzZTkiLCJuZXR0eXBlIjoiRVRIX1RFU1RORVRfR09FUkxJIiwibmV0dHlwZWlkIjpudWxsLCJpc2FkbWluIjoyLCJsZXZlbCI6bnVsbCwiaXNlbWFpbHZlcmlmaWVkIjpudWxsLCJpc3Bob25ldmVyaWZpZWQiOm51bGwsInN0cmVldGFkZHJlc3MiOm51bGwsInppcGNvZGUiOm51bGwsInJlY2VpdmVycGhvbmUiOm51bGwsInNpbXBsZXBhc3N3b3JkIjpudWxsLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJmdWxsbmFtZSI6bnVsbCwiaXNhbGxvd2VtYWlsIjpudWxsLCJpc2FsbG93c21zIjpudWxsLCJzaW1wbGVwdyI6bnVsbCwidXJscHJvZmlsZWltYWdlIjpudWxsLCJ3YWxsZXQiOnsiaWQiOjEsImNyZWF0ZWRhdCI6IjIwMjItMTAtMTlUMDM6NDM6NDkuMDAwWiIsInVwZGF0ZWRhdCI6IjIwMjItMTEtMDFUMDA6NDM6MDguMDAwWiIsInVpZCI6MTAsIndhbGxldGFkZHJlc3MiOiIweEI2NkQ0YkNlYWM2NTIwOUZhQTc1YzMzMjJEQTFhZTFFRDgzYTA2ZTQiLCJwcml2YXRla2V5IjoiMHhlNTVhYmYzZDRhZTkyMmVhZTZmZDg1MGQ2ZjZhYjAwZTBmNTU4Nzg0ZjFmNGNhMDk2ZDM4OGQzYWZlOTFjN2UxIiwibmV0dHlwZSI6IkVUSF9URVNUTkVUX0dPRVJMSSIsImFtb3VudCI6bnVsbCwibmV0dHlwZWlkIjpudWxsfSwiaWF0IjoxNjY3NDQyMzUzLCJleHAiOjE2Njc2MTUxNTMsImlzcyI6IkVYUFJFU1MifQ.P5es881gszT-LnJdY3UEmw5SvmCRI_8QAggClobQQfI','::ffff:121.134.16.118',1667442353,NULL,'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',NULL),(2,'2022-11-03 02:27:39',NULL,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjEwLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAxVDAwOjQyOjEyLjAwMFoiLCJlbWFpbCI6ImNoZW55NWR5aEBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiM2RmMGJmYTctNGY2MC0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTYiLCJteXJlZmVyZXJjb2RlIjoiYWI2NTQ2YWFmZjEzZTkiLCJuZXR0eXBlIjoiRVRIX1RFU1RORVRfR09FUkxJIiwibmV0dHlwZWlkIjpudWxsLCJpc2FkbWluIjoyLCJsZXZlbCI6bnVsbCwiaXNlbWFpbHZlcmlmaWVkIjpudWxsLCJpc3Bob25ldmVyaWZpZWQiOm51bGwsInN0cmVldGFkZHJlc3MiOm51bGwsInppcGNvZGUiOm51bGwsInJlY2VpdmVycGhvbmUiOm51bGwsInNpbXBsZXBhc3N3b3JkIjpudWxsLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJmdWxsbmFtZSI6bnVsbCwiaXNhbGxvd2VtYWlsIjpudWxsLCJpc2FsbG93c21zIjpudWxsLCJzaW1wbGVwdyI6bnVsbCwidXJscHJvZmlsZWltYWdlIjpudWxsLCJ3YWxsZXQiOnsiaWQiOjEsImNyZWF0ZWRhdCI6IjIwMjItMTAtMTlUMDM6NDM6NDkuMDAwWiIsInVwZGF0ZWRhdCI6IjIwMjItMTEtMDFUMDA6NDM6MDguMDAwWiIsInVpZCI6MTAsIndhbGxldGFkZHJlc3MiOiIweEI2NkQ0YkNlYWM2NTIwOUZhQTc1YzMzMjJEQTFhZTFFRDgzYTA2ZTQiLCJwcml2YXRla2V5IjoiMHhlNTVhYmYzZDRhZTkyMmVhZTZmZDg1MGQ2ZjZhYjAwZTBmNTU4Nzg0ZjFmNGNhMDk2ZDM4OGQzYWZlOTFjN2UxIiwibmV0dHlwZSI6IkVUSF9URVNUTkVUX0dPRVJMSSIsImFtb3VudCI6bnVsbCwibmV0dHlwZWlkIjpudWxsfSwiaWF0IjoxNjY3NDQyNDU5LCJleHAiOjE2Njc2MTUyNTksImlzcyI6IkVYUFJFU1MifQ.CZqn4LuCo82MnKfVjDYCjmTQgGpk6LHVpSl9GOH_2Zo','::ffff:121.134.16.118',1667442459,NULL,'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36','cheny5dyh@gmail.com'),(3,'2022-11-03 10:56:19',NULL,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjEwLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAxVDAwOjQyOjEyLjAwMFoiLCJlbWFpbCI6ImNoZW55NWR5aEBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiM2RmMGJmYTctNGY2MC0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTYiLCJteXJlZmVyZXJjb2RlIjoiYWI2NTQ2YWFmZjEzZTkiLCJuZXR0eXBlIjoiRVRIX1RFU1RORVRfR09FUkxJIiwibmV0dHlwZWlkIjpudWxsLCJpc2FkbWluIjoyLCJsZXZlbCI6bnVsbCwiaXNlbWFpbHZlcmlmaWVkIjpudWxsLCJpc3Bob25ldmVyaWZpZWQiOm51bGwsInN0cmVldGFkZHJlc3MiOm51bGwsInppcGNvZGUiOm51bGwsInJlY2VpdmVycGhvbmUiOm51bGwsInNpbXBsZXBhc3N3b3JkIjpudWxsLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJmdWxsbmFtZSI6bnVsbCwiaXNhbGxvd2VtYWlsIjpudWxsLCJpc2FsbG93c21zIjpudWxsLCJzaW1wbGVwdyI6bnVsbCwidXJscHJvZmlsZWltYWdlIjpudWxsLCJ3YWxsZXQiOnsiaWQiOjEsImNyZWF0ZWRhdCI6IjIwMjItMTAtMTlUMDM6NDM6NDkuMDAwWiIsInVwZGF0ZWRhdCI6IjIwMjItMTEtMDFUMDA6NDM6MDguMDAwWiIsInVpZCI6MTAsIndhbGxldGFkZHJlc3MiOiIweEI2NkQ0YkNlYWM2NTIwOUZhQTc1YzMzMjJEQTFhZTFFRDgzYTA2ZTQiLCJwcml2YXRla2V5IjoiMHhlNTVhYmYzZDRhZTkyMmVhZTZmZDg1MGQ2ZjZhYjAwZTBmNTU4Nzg0ZjFmNGNhMDk2ZDM4OGQzYWZlOTFjN2UxIiwibmV0dHlwZSI6IkVUSF9URVNUTkVUX0dPRVJMSSIsImFtb3VudCI6bnVsbCwibmV0dHlwZWlkIjpudWxsfSwiaWF0IjoxNjY3NDcyOTc4LCJleHAiOjE2Njc2NDU3NzgsImlzcyI6IkVYUFJFU1MifQ.1szIpVPLgi0BFtAvo7rSfVs3WCn-sN_Yb3PtqAHz26w','::ffff:112.214.207.62',1667472978,NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','cheny5dyh@gmail.com'),(4,'2022-11-03 11:19:20',NULL,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjEwLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAxVDAwOjQyOjEyLjAwMFoiLCJlbWFpbCI6ImNoZW55NWR5aEBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiM2RmMGJmYTctNGY2MC0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTYiLCJteXJlZmVyZXJjb2RlIjoiYWI2NTQ2YWFmZjEzZTkiLCJuZXR0eXBlIjoiRVRIX1RFU1RORVRfR09FUkxJIiwibmV0dHlwZWlkIjpudWxsLCJpc2FkbWluIjoyLCJsZXZlbCI6bnVsbCwiaXNlbWFpbHZlcmlmaWVkIjpudWxsLCJpc3Bob25ldmVyaWZpZWQiOm51bGwsInN0cmVldGFkZHJlc3MiOm51bGwsInppcGNvZGUiOm51bGwsInJlY2VpdmVycGhvbmUiOm51bGwsInNpbXBsZXBhc3N3b3JkIjpudWxsLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJmdWxsbmFtZSI6bnVsbCwiaXNhbGxvd2VtYWlsIjpudWxsLCJpc2FsbG93c21zIjpudWxsLCJzaW1wbGVwdyI6bnVsbCwidXJscHJvZmlsZWltYWdlIjpudWxsLCJ3YWxsZXQiOnsiaWQiOjEsImNyZWF0ZWRhdCI6IjIwMjItMTAtMTlUMDM6NDM6NDkuMDAwWiIsInVwZGF0ZWRhdCI6IjIwMjItMTEtMDFUMDA6NDM6MDguMDAwWiIsInVpZCI6MTAsIndhbGxldGFkZHJlc3MiOiIweEI2NkQ0YkNlYWM2NTIwOUZhQTc1YzMzMjJEQTFhZTFFRDgzYTA2ZTQiLCJwcml2YXRla2V5IjoiMHhlNTVhYmYzZDRhZTkyMmVhZTZmZDg1MGQ2ZjZhYjAwZTBmNTU4Nzg0ZjFmNGNhMDk2ZDM4OGQzYWZlOTFjN2UxIiwibmV0dHlwZSI6IkVUSF9URVNUTkVUX0dPRVJMSSIsImFtb3VudCI6bnVsbCwibmV0dHlwZWlkIjpudWxsfSwiaWF0IjoxNjY3NDc0MzYwLCJleHAiOjE2Njc2NDcxNjAsImlzcyI6IkVYUFJFU1MifQ.J-9r-DK7Qq1PNNbCkda2T0RfLLyOFj5wbmAnc3w92YA','::ffff:121.134.16.118',1667474360,NULL,'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36','cheny5dyh@gmail.com'),(5,'2022-11-03 14:46:28',NULL,16,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjE2LCJjcmVhdGVkYXQiOiIyMDIyLTExLTAyVDEyOjMyOjQyLjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAzVDAxOjQyOjI1LjAwMFoiLCJlbWFpbCI6ImF1czdpbm1hcjdpbkBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiNzIyMGM0MWEtNWFhYS0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTZzIiwibXlyZWZlcmVyY29kZSI6IjBlOGJkNzE2ZjA0YWFhIiwibmV0dHlwZSI6IkVUSF9URVNUTkVUX0dPRVJMSSIsIm5ldHR5cGVpZCI6bnVsbCwiaXNhZG1pbiI6bnVsbCwibGV2ZWwiOm51bGwsImlzZW1haWx2ZXJpZmllZCI6bnVsbCwiaXNwaG9uZXZlcmlmaWVkIjpudWxsLCJzdHJlZXRhZGRyZXNzIjpudWxsLCJ6aXBjb2RlIjpudWxsLCJyZWNlaXZlcnBob25lIjpudWxsLCJzaW1wbGVwYXNzd29yZCI6bnVsbCwiZmlyc3RuYW1lIjpudWxsLCJsYXN0bmFtZSI6bnVsbCwiZnVsbG5hbWUiOm51bGwsImlzYWxsb3dlbWFpbCI6bnVsbCwiaXNhbGxvd3NtcyI6bnVsbCwic2ltcGxlcHciOiIyMjIyMjIiLCJ1cmxwcm9maWxlaW1hZ2UiOm51bGwsIndhbGxldCI6eyJpZCI6NCwiY3JlYXRlZGF0IjoiMjAyMi0xMS0wMlQxMjozMjo0Mi4wMDBaIiwidXBkYXRlZGF0IjpudWxsLCJ1aWQiOjE2LCJ3YWxsZXRhZGRyZXNzIjoiMHhlRjE4RjcwM0JjNzFlNDU2ZTYwQjc4NjJFNDliNTYwMTEyNjc5NUVkIiwicHJpdmF0ZWtleSI6IjB4MTNhYjQxODc0ODA1N2ZhODlmNzk2Y2NmNTkzZjM4YjU5ODkxMjgxMWI4ODg2YWFhNTk5YTdiZjIwZTRhYWE1NiIsIm5ldHR5cGUiOiJFVEhfVEVTVE5FVF9HT0VSTEkiLCJhbW91bnQiOm51bGwsIm5ldHR5cGVpZCI6bnVsbH0sImlhdCI6MTY2NzQ4Njc4OCwiZXhwIjoxNjY3NjU5NTg4LCJpc3MiOiJFWFBSRVNTIn0.wSSIFgOkmQHR-05e3sSlttvjQzNt47-kfhodQuFBDOo','::ffff:112.214.207.62',1667486788,NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','aus7inmar7in@gmail.com'),(6,'2022-11-04 00:54:55',NULL,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjEwLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAxVDAwOjQyOjEyLjAwMFoiLCJlbWFpbCI6ImNoZW55NWR5aEBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiM2RmMGJmYTctNGY2MC0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTYiLCJteXJlZmVyZXJjb2RlIjoiYWI2NTQ2YWFmZjEzZTkiLCJuZXR0eXBlIjoiRVRIX1RFU1RORVRfR09FUkxJIiwibmV0dHlwZWlkIjpudWxsLCJpc2FkbWluIjoyLCJsZXZlbCI6bnVsbCwiaXNlbWFpbHZlcmlmaWVkIjpudWxsLCJpc3Bob25ldmVyaWZpZWQiOm51bGwsInN0cmVldGFkZHJlc3MiOm51bGwsInppcGNvZGUiOm51bGwsInJlY2VpdmVycGhvbmUiOm51bGwsInNpbXBsZXBhc3N3b3JkIjpudWxsLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJmdWxsbmFtZSI6bnVsbCwiaXNhbGxvd2VtYWlsIjpudWxsLCJpc2FsbG93c21zIjpudWxsLCJzaW1wbGVwdyI6bnVsbCwidXJscHJvZmlsZWltYWdlIjpudWxsLCJ3YWxsZXQiOnsiaWQiOjEsImNyZWF0ZWRhdCI6IjIwMjItMTAtMTlUMDM6NDM6NDkuMDAwWiIsInVwZGF0ZWRhdCI6IjIwMjItMTEtMDFUMDA6NDM6MDguMDAwWiIsInVpZCI6MTAsIndhbGxldGFkZHJlc3MiOiIweEI2NkQ0YkNlYWM2NTIwOUZhQTc1YzMzMjJEQTFhZTFFRDgzYTA2ZTQiLCJwcml2YXRla2V5IjoiMHhlNTVhYmYzZDRhZTkyMmVhZTZmZDg1MGQ2ZjZhYjAwZTBmNTU4Nzg0ZjFmNGNhMDk2ZDM4OGQzYWZlOTFjN2UxIiwibmV0dHlwZSI6IkVUSF9URVNUTkVUX0dPRVJMSSIsImFtb3VudCI6bnVsbCwibmV0dHlwZWlkIjpudWxsfSwiaWF0IjoxNjY3NTIzMjk1LCJleHAiOjE2Njc2OTYwOTUsImlzcyI6IkVYUFJFU1MifQ.qi3Hgr0OL5A7bWVXz5RNIPz03WIYkpTaYvZzXjbT0ro','::ffff:121.134.16.118',1667523295,NULL,'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36','cheny5dyh@gmail.com'),(7,'2022-11-04 00:59:14',NULL,16,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjE2LCJjcmVhdGVkYXQiOiIyMDIyLTExLTAyVDEyOjMyOjQyLjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAzVDAxOjQyOjI1LjAwMFoiLCJlbWFpbCI6ImF1czdpbm1hcjdpbkBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiNzIyMGM0MWEtNWFhYS0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTZzIiwibXlyZWZlcmVyY29kZSI6IjBlOGJkNzE2ZjA0YWFhIiwibmV0dHlwZSI6IkVUSF9URVNUTkVUX0dPRVJMSSIsIm5ldHR5cGVpZCI6bnVsbCwiaXNhZG1pbiI6bnVsbCwibGV2ZWwiOm51bGwsImlzZW1haWx2ZXJpZmllZCI6bnVsbCwiaXNwaG9uZXZlcmlmaWVkIjpudWxsLCJzdHJlZXRhZGRyZXNzIjpudWxsLCJ6aXBjb2RlIjpudWxsLCJyZWNlaXZlcnBob25lIjpudWxsLCJzaW1wbGVwYXNzd29yZCI6bnVsbCwiZmlyc3RuYW1lIjpudWxsLCJsYXN0bmFtZSI6bnVsbCwiZnVsbG5hbWUiOm51bGwsImlzYWxsb3dlbWFpbCI6bnVsbCwiaXNhbGxvd3NtcyI6bnVsbCwic2ltcGxlcHciOiIyMjIyMjIiLCJ1cmxwcm9maWxlaW1hZ2UiOm51bGwsIndhbGxldCI6eyJpZCI6NCwiY3JlYXRlZGF0IjoiMjAyMi0xMS0wMlQxMjozMjo0Mi4wMDBaIiwidXBkYXRlZGF0IjpudWxsLCJ1aWQiOjE2LCJ3YWxsZXRhZGRyZXNzIjoiMHhlRjE4RjcwM0JjNzFlNDU2ZTYwQjc4NjJFNDliNTYwMTEyNjc5NUVkIiwicHJpdmF0ZWtleSI6IjB4MTNhYjQxODc0ODA1N2ZhODlmNzk2Y2NmNTkzZjM4YjU5ODkxMjgxMWI4ODg2YWFhNTk5YTdiZjIwZTRhYWE1NiIsIm5ldHR5cGUiOiJFVEhfVEVTVE5FVF9HT0VSTEkiLCJhbW91bnQiOm51bGwsIm5ldHR5cGVpZCI6bnVsbH0sImlhdCI6MTY2NzUyMzU1NCwiZXhwIjoxNjY3Njk2MzU0LCJpc3MiOiJFWFBSRVNTIn0.9Bhati7PKRtYPoNBmepsvD0l5uuhLoc5S5RHeZF2nXA','::ffff:121.134.16.118',1667523554,NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','aus7inmar7in@gmail.com'),(8,'2022-11-04 01:03:47',NULL,16,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjE2LCJjcmVhdGVkYXQiOiIyMDIyLTExLTAyVDEyOjMyOjQyLjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAzVDAxOjQyOjI1LjAwMFoiLCJlbWFpbCI6ImF1czdpbm1hcjdpbkBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiNzIyMGM0MWEtNWFhYS0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTZzIiwibXlyZWZlcmVyY29kZSI6IjBlOGJkNzE2ZjA0YWFhIiwibmV0dHlwZSI6IkVUSF9URVNUTkVUX0dPRVJMSSIsIm5ldHR5cGVpZCI6bnVsbCwiaXNhZG1pbiI6bnVsbCwibGV2ZWwiOm51bGwsImlzZW1haWx2ZXJpZmllZCI6bnVsbCwiaXNwaG9uZXZlcmlmaWVkIjpudWxsLCJzdHJlZXRhZGRyZXNzIjpudWxsLCJ6aXBjb2RlIjpudWxsLCJyZWNlaXZlcnBob25lIjpudWxsLCJzaW1wbGVwYXNzd29yZCI6bnVsbCwiZmlyc3RuYW1lIjpudWxsLCJsYXN0bmFtZSI6bnVsbCwiZnVsbG5hbWUiOm51bGwsImlzYWxsb3dlbWFpbCI6bnVsbCwiaXNhbGxvd3NtcyI6bnVsbCwic2ltcGxlcHciOiIyMjIyMjIiLCJ1cmxwcm9maWxlaW1hZ2UiOm51bGwsIndhbGxldCI6eyJpZCI6NCwiY3JlYXRlZGF0IjoiMjAyMi0xMS0wMlQxMjozMjo0Mi4wMDBaIiwidXBkYXRlZGF0IjpudWxsLCJ1aWQiOjE2LCJ3YWxsZXRhZGRyZXNzIjoiMHhlRjE4RjcwM0JjNzFlNDU2ZTYwQjc4NjJFNDliNTYwMTEyNjc5NUVkIiwicHJpdmF0ZWtleSI6IjB4MTNhYjQxODc0ODA1N2ZhODlmNzk2Y2NmNTkzZjM4YjU5ODkxMjgxMWI4ODg2YWFhNTk5YTdiZjIwZTRhYWE1NiIsIm5ldHR5cGUiOiJFVEhfVEVTVE5FVF9HT0VSTEkiLCJhbW91bnQiOm51bGwsIm5ldHR5cGVpZCI6bnVsbH0sImlhdCI6MTY2NzUyMzgyNywiZXhwIjoxNjY3Njk2NjI3LCJpc3MiOiJFWFBSRVNTIn0.ReMAu6UUaX8UILMJShSne23bRhiM1Q0s1QScxuv_Q9Q','::ffff:121.134.16.118',1667523827,NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','aus7inmar7in@gmail.com'),(9,'2022-11-04 01:13:29',NULL,16,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjE2LCJjcmVhdGVkYXQiOiIyMDIyLTExLTAyVDEyOjMyOjQyLjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAzVDAxOjQyOjI1LjAwMFoiLCJlbWFpbCI6ImF1czdpbm1hcjdpbkBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiNzIyMGM0MWEtNWFhYS0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTZzIiwibXlyZWZlcmVyY29kZSI6IjBlOGJkNzE2ZjA0YWFhIiwibmV0dHlwZSI6IkVUSF9URVNUTkVUX0dPRVJMSSIsIm5ldHR5cGVpZCI6bnVsbCwiaXNhZG1pbiI6bnVsbCwibGV2ZWwiOm51bGwsImlzZW1haWx2ZXJpZmllZCI6bnVsbCwiaXNwaG9uZXZlcmlmaWVkIjpudWxsLCJzdHJlZXRhZGRyZXNzIjpudWxsLCJ6aXBjb2RlIjpudWxsLCJyZWNlaXZlcnBob25lIjpudWxsLCJzaW1wbGVwYXNzd29yZCI6bnVsbCwiZmlyc3RuYW1lIjpudWxsLCJsYXN0bmFtZSI6bnVsbCwiZnVsbG5hbWUiOm51bGwsImlzYWxsb3dlbWFpbCI6bnVsbCwiaXNhbGxvd3NtcyI6bnVsbCwic2ltcGxlcHciOiIyMjIyMjIiLCJ1cmxwcm9maWxlaW1hZ2UiOm51bGwsIndhbGxldCI6eyJpZCI6NCwiY3JlYXRlZGF0IjoiMjAyMi0xMS0wMlQxMjozMjo0Mi4wMDBaIiwidXBkYXRlZGF0IjpudWxsLCJ1aWQiOjE2LCJ3YWxsZXRhZGRyZXNzIjoiMHhlRjE4RjcwM0JjNzFlNDU2ZTYwQjc4NjJFNDliNTYwMTEyNjc5NUVkIiwicHJpdmF0ZWtleSI6IjB4MTNhYjQxODc0ODA1N2ZhODlmNzk2Y2NmNTkzZjM4YjU5ODkxMjgxMWI4ODg2YWFhNTk5YTdiZjIwZTRhYWE1NiIsIm5ldHR5cGUiOiJFVEhfVEVTVE5FVF9HT0VSTEkiLCJhbW91bnQiOm51bGwsIm5ldHR5cGVpZCI6bnVsbH0sImlhdCI6MTY2NzUyNDQwOSwiZXhwIjoxNjY3Njk3MjA5LCJpc3MiOiJFWFBSRVNTIn0.YFrREWLFckIYOdZVqaRncBbmf51dtQO3sZPvjktoju4','::ffff:121.134.16.118',1667524409,NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','aus7inmar7in@gmail.com'),(10,'2022-11-04 01:51:49',NULL,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjEwLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAxVDAwOjQyOjEyLjAwMFoiLCJlbWFpbCI6ImNoZW55NWR5aEBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiM2RmMGJmYTctNGY2MC0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTYiLCJteXJlZmVyZXJjb2RlIjoiYWI2NTQ2YWFmZjEzZTkiLCJuZXR0eXBlIjoiRVRIX1RFU1RORVRfR09FUkxJIiwibmV0dHlwZWlkIjpudWxsLCJpc2FkbWluIjoyLCJsZXZlbCI6bnVsbCwiaXNlbWFpbHZlcmlmaWVkIjpudWxsLCJpc3Bob25ldmVyaWZpZWQiOm51bGwsInN0cmVldGFkZHJlc3MiOm51bGwsInppcGNvZGUiOm51bGwsInJlY2VpdmVycGhvbmUiOm51bGwsInNpbXBsZXBhc3N3b3JkIjpudWxsLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJmdWxsbmFtZSI6bnVsbCwiaXNhbGxvd2VtYWlsIjpudWxsLCJpc2FsbG93c21zIjpudWxsLCJzaW1wbGVwdyI6bnVsbCwidXJscHJvZmlsZWltYWdlIjpudWxsLCJ3YWxsZXQiOnsiaWQiOjEsImNyZWF0ZWRhdCI6IjIwMjItMTAtMTlUMDM6NDM6NDkuMDAwWiIsInVwZGF0ZWRhdCI6IjIwMjItMTEtMDFUMDA6NDM6MDguMDAwWiIsInVpZCI6MTAsIndhbGxldGFkZHJlc3MiOiIweEI2NkQ0YkNlYWM2NTIwOUZhQTc1YzMzMjJEQTFhZTFFRDgzYTA2ZTQiLCJwcml2YXRla2V5IjoiMHhlNTVhYmYzZDRhZTkyMmVhZTZmZDg1MGQ2ZjZhYjAwZTBmNTU4Nzg0ZjFmNGNhMDk2ZDM4OGQzYWZlOTFjN2UxIiwibmV0dHlwZSI6IkVUSF9URVNUTkVUX0dPRVJMSSIsImFtb3VudCI6bnVsbCwibmV0dHlwZWlkIjpudWxsfSwiaWF0IjoxNjY3NTI2NzA5LCJleHAiOjE2Njc2OTk1MDksImlzcyI6IkVYUFJFU1MifQ.IALrp5Pau-qi-9ZthKUlSJgurcFqv2Mt-vu3YQWDgIE','::ffff:121.134.16.118',1667526709,NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','cheny5dyh@gmail.com'),(11,'2022-11-04 02:29:55',NULL,15,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjE1LCJjcmVhdGVkYXQiOiIyMDIyLTExLTAyVDAxOjMyOjExLjAwMFoiLCJ1cGRhdGVkYXQiOm51bGwsImVtYWlsIjoibGVlamgxNkBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiMmMxMTg1ZmItNWE0ZS0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTYiLCJteXJlZmVyZXJjb2RlIjoiZDViOGU4NjRjN2M0N2QiLCJuZXR0eXBlIjoiRVRIX1RFU1RORVRfR09FUkxJIiwibmV0dHlwZWlkIjpudWxsLCJpc2FkbWluIjpudWxsLCJsZXZlbCI6bnVsbCwiaXNlbWFpbHZlcmlmaWVkIjpudWxsLCJpc3Bob25ldmVyaWZpZWQiOm51bGwsInN0cmVldGFkZHJlc3MiOm51bGwsInppcGNvZGUiOm51bGwsInJlY2VpdmVycGhvbmUiOm51bGwsInNpbXBsZXBhc3N3b3JkIjpudWxsLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJmdWxsbmFtZSI6bnVsbCwiaXNhbGxvd2VtYWlsIjpudWxsLCJpc2FsbG93c21zIjpudWxsLCJzaW1wbGVwdyI6bnVsbCwidXJscHJvZmlsZWltYWdlIjpudWxsLCJ3YWxsZXQiOnsiaWQiOjMsImNyZWF0ZWRhdCI6IjIwMjItMTEtMDJUMDE6MzI6MTEuMDAwWiIsInVwZGF0ZWRhdCI6bnVsbCwidWlkIjoxNSwid2FsbGV0YWRkcmVzcyI6IjB4OTc2YzZCOEU4ZmU4NTQzNzJjOUYxZkZGNzZjRTBlNDE3NTEzZTUxRSIsInByaXZhdGVrZXkiOiIweGI0MzBmZjMyMjZkYWY2OTRiYWIwZDVkMjRlNjNjMjA1NGNhMTYxZTY3MGI0YTBlNmYwNGM1MjhjYzk3YzQxNjEiLCJuZXR0eXBlIjoiRVRIX1RFU1RORVRfR09FUkxJIiwiYW1vdW50IjpudWxsLCJuZXR0eXBlaWQiOm51bGx9LCJpYXQiOjE2Njc1Mjg5OTUsImV4cCI6MTY2NzcwMTc5NSwiaXNzIjoiRVhQUkVTUyJ9.tgiGV7hoXa30nhyfO2rz92dR5eliITdx6YQ3tr8IsaM','::ffff:121.134.16.118',1667528995,NULL,'Mozilla/5.0 (Linux; Android 10; SAMSUNG SM-G965N) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/18.0 Chrome/99.0.4844.88 Mobile Safari/537.36','leejh16@gmail.com'),(12,'2022-11-04 07:39:50',NULL,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjEwLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTA0VDA3OjEwOjM5LjAwMFoiLCJlbWFpbCI6ImNoZW55NWR5aEBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiM2RmMGJmYTctNGY2MC0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTYiLCJteXJlZmVyZXJjb2RlIjoiYWI2NTQ2YWFmZjEzZTkiLCJuZXR0eXBlIjoiRVRIX1RFU1RORVRfR09FUkxJIiwibmV0dHlwZWlkIjpudWxsLCJpc2FkbWluIjoyLCJsZXZlbCI6MywiaXNlbWFpbHZlcmlmaWVkIjpudWxsLCJpc3Bob25ldmVyaWZpZWQiOm51bGwsInN0cmVldGFkZHJlc3MiOm51bGwsInppcGNvZGUiOm51bGwsInJlY2VpdmVycGhvbmUiOm51bGwsInNpbXBsZXBhc3N3b3JkIjpudWxsLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJmdWxsbmFtZSI6bnVsbCwiaXNhbGxvd2VtYWlsIjpudWxsLCJpc2FsbG93c21zIjpudWxsLCJzaW1wbGVwdyI6bnVsbCwidXJscHJvZmlsZWltYWdlIjpudWxsLCJtaWxlYWdlIjoiMzIiLCJwb2ludHMiOiIzMiIsImxldmVsc3RyIjoiTWFzdGVyIiwid2FsbGV0Ijp7ImlkIjoxLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAxVDAwOjQzOjA4LjAwMFoiLCJ1aWQiOjEwLCJ3YWxsZXRhZGRyZXNzIjoiMHhCNjZENGJDZWFjNjUyMDlGYUE3NWMzMzIyREExYWUxRUQ4M2EwNmU0IiwicHJpdmF0ZWtleSI6IjB4ZTU1YWJmM2Q0YWU5MjJlYWU2ZmQ4NTBkNmY2YWIwMGUwZjU1ODc4NGYxZjRjYTA5NmQzODhkM2FmZTkxYzdlMSIsIm5ldHR5cGUiOiJFVEhfVEVTVE5FVF9HT0VSTEkiLCJhbW91bnQiOm51bGwsIm5ldHR5cGVpZCI6bnVsbH0sImlhdCI6MTY2NzU0NzU5MCwiZXhwIjoxNjY3NzIwMzkwLCJpc3MiOiJFWFBSRVNTIn0.h_UBLx7hTFGCS3sIUrK92m-LAxKjTsX9JPw0Al2UFnQ','::ffff:121.134.16.118',1667547590,NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','cheny5dyh@gmail.com'),(13,'2022-11-04 08:15:48',NULL,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjEwLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTA0VDA3OjEwOjM5LjAwMFoiLCJlbWFpbCI6ImNoZW55NWR5aEBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiM2RmMGJmYTctNGY2MC0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTYiLCJteXJlZmVyZXJjb2RlIjoiYWI2NTQ2YWFmZjEzZTkiLCJuZXR0eXBlIjoiRVRIX1RFU1RORVRfR09FUkxJIiwibmV0dHlwZWlkIjpudWxsLCJpc2FkbWluIjoyLCJsZXZlbCI6MywiaXNlbWFpbHZlcmlmaWVkIjpudWxsLCJpc3Bob25ldmVyaWZpZWQiOm51bGwsInN0cmVldGFkZHJlc3MiOm51bGwsInppcGNvZGUiOm51bGwsInJlY2VpdmVycGhvbmUiOm51bGwsInNpbXBsZXBhc3N3b3JkIjpudWxsLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJmdWxsbmFtZSI6bnVsbCwiaXNhbGxvd2VtYWlsIjpudWxsLCJpc2FsbG93c21zIjpudWxsLCJzaW1wbGVwdyI6bnVsbCwidXJscHJvZmlsZWltYWdlIjpudWxsLCJtaWxlYWdlIjoiMzIiLCJwb2ludHMiOiIzMiIsImxldmVsc3RyIjoiTWFzdGVyIiwid2FsbGV0Ijp7ImlkIjoxLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAxVDAwOjQzOjA4LjAwMFoiLCJ1aWQiOjEwLCJ3YWxsZXRhZGRyZXNzIjoiMHhCNjZENGJDZWFjNjUyMDlGYUE3NWMzMzIyREExYWUxRUQ4M2EwNmU0IiwicHJpdmF0ZWtleSI6IjB4ZTU1YWJmM2Q0YWU5MjJlYWU2ZmQ4NTBkNmY2YWIwMGUwZjU1ODc4NGYxZjRjYTA5NmQzODhkM2FmZTkxYzdlMSIsIm5ldHR5cGUiOiJFVEhfVEVTVE5FVF9HT0VSTEkiLCJhbW91bnQiOm51bGwsIm5ldHR5cGVpZCI6bnVsbH0sImlhdCI6MTY2NzU0OTc0OCwiZXhwIjoxNjY3NzIyNTQ4LCJpc3MiOiJFWFBSRVNTIn0.H5I0ulQfKfnPKQYShwOUfzXj8w_lclgiuXaol9tvUcc','::ffff:121.134.16.118',1667549748,NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','cheny5dyh@gmail.com'),(14,'2022-11-04 10:12:06',NULL,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjEwLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTA0VDA3OjEwOjM5LjAwMFoiLCJlbWFpbCI6ImNoZW55NWR5aEBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiM2RmMGJmYTctNGY2MC0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTYiLCJteXJlZmVyZXJjb2RlIjoiYWI2NTQ2YWFmZjEzZTkiLCJuZXR0eXBlIjoiRVRIX1RFU1RORVRfR09FUkxJIiwibmV0dHlwZWlkIjpudWxsLCJpc2FkbWluIjoyLCJsZXZlbCI6MywiaXNlbWFpbHZlcmlmaWVkIjpudWxsLCJpc3Bob25ldmVyaWZpZWQiOm51bGwsInN0cmVldGFkZHJlc3MiOm51bGwsInppcGNvZGUiOm51bGwsInJlY2VpdmVycGhvbmUiOm51bGwsInNpbXBsZXBhc3N3b3JkIjpudWxsLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJmdWxsbmFtZSI6bnVsbCwiaXNhbGxvd2VtYWlsIjpudWxsLCJpc2FsbG93c21zIjpudWxsLCJzaW1wbGVwdyI6bnVsbCwidXJscHJvZmlsZWltYWdlIjpudWxsLCJtaWxlYWdlIjoiMzIiLCJwb2ludHMiOiIzMiIsImxldmVsc3RyIjoiTWFzdGVyIiwid2FsbGV0Ijp7ImlkIjoxLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAxVDAwOjQzOjA4LjAwMFoiLCJ1aWQiOjEwLCJ3YWxsZXRhZGRyZXNzIjoiMHhCNjZENGJDZWFjNjUyMDlGYUE3NWMzMzIyREExYWUxRUQ4M2EwNmU0IiwicHJpdmF0ZWtleSI6IjB4ZTU1YWJmM2Q0YWU5MjJlYWU2ZmQ4NTBkNmY2YWIwMGUwZjU1ODc4NGYxZjRjYTA5NmQzODhkM2FmZTkxYzdlMSIsIm5ldHR5cGUiOiJFVEhfVEVTVE5FVF9HT0VSTEkiLCJhbW91bnQiOm51bGwsIm5ldHR5cGVpZCI6bnVsbH0sImlhdCI6MTY2NzU1NjcyNiwiZXhwIjoxNjY3NzI5NTI2LCJpc3MiOiJFWFBSRVNTIn0.OcNg4Ns0XV0w1rmGTSNNZYxnddYKjcAZVA9T0Q2ZZOM','::ffff:121.134.16.118',1667556726,NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','cheny5dyh@gmail.com'),(15,'2022-11-04 12:28:44',NULL,16,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjE2LCJjcmVhdGVkYXQiOiIyMDIyLTExLTAyVDEyOjMyOjQyLjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTA0VDA3OjExOjAzLjAwMFoiLCJlbWFpbCI6ImF1czdpbm1hcjdpbkBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiNzIyMGM0MWEtNWFhYS0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTZzIiwibXlyZWZlcmVyY29kZSI6IjBlOGJkNzE2ZjA0YWFhIiwibmV0dHlwZSI6IkVUSF9URVNUTkVUX0dPRVJMSSIsIm5ldHR5cGVpZCI6bnVsbCwiaXNhZG1pbiI6bnVsbCwibGV2ZWwiOjIsImlzZW1haWx2ZXJpZmllZCI6bnVsbCwiaXNwaG9uZXZlcmlmaWVkIjpudWxsLCJzdHJlZXRhZGRyZXNzIjpudWxsLCJ6aXBjb2RlIjpudWxsLCJyZWNlaXZlcnBob25lIjpudWxsLCJzaW1wbGVwYXNzd29yZCI6bnVsbCwiZmlyc3RuYW1lIjpudWxsLCJsYXN0bmFtZSI6bnVsbCwiZnVsbG5hbWUiOm51bGwsImlzYWxsb3dlbWFpbCI6bnVsbCwiaXNhbGxvd3NtcyI6bnVsbCwic2ltcGxlcHciOiIyMjIyMjIiLCJ1cmxwcm9maWxlaW1hZ2UiOm51bGwsIm1pbGVhZ2UiOiI0MCIsInBvaW50cyI6IjQwIiwibGV2ZWxzdHIiOiJCYWJ5Iiwid2FsbGV0Ijp7ImlkIjo0LCJjcmVhdGVkYXQiOiIyMDIyLTExLTAyVDEyOjMyOjQyLjAwMFoiLCJ1cGRhdGVkYXQiOm51bGwsInVpZCI6MTYsIndhbGxldGFkZHJlc3MiOiIweGVGMThGNzAzQmM3MWU0NTZlNjBCNzg2MkU0OWI1NjAxMTI2Nzk1RWQiLCJwcml2YXRla2V5IjoiMHgxM2FiNDE4NzQ4MDU3ZmE4OWY3OTZjY2Y1OTNmMzhiNTk4OTEyODExYjg4ODZhYWE1OTlhN2JmMjBlNGFhYTU2IiwibmV0dHlwZSI6IkVUSF9URVNUTkVUX0dPRVJMSSIsImFtb3VudCI6bnVsbCwibmV0dHlwZWlkIjpudWxsfSwiaWF0IjoxNjY3NTY0OTI0LCJleHAiOjE2Njc3Mzc3MjQsImlzcyI6IkVYUFJFU1MifQ.mo8HnxqXntG_aQB_pJjsDFvAPdLJGdjDUwwjWjD5zDA','::ffff:121.134.16.118',1667564924,NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','aus7inmar7in@gmail.com'),(16,'2022-11-04 13:10:45',NULL,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjEwLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTA0VDA3OjEwOjM5LjAwMFoiLCJlbWFpbCI6ImNoZW55NWR5aEBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiM2RmMGJmYTctNGY2MC0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTYiLCJteXJlZmVyZXJjb2RlIjoiYWI2NTQ2YWFmZjEzZTkiLCJuZXR0eXBlIjoiRVRIX1RFU1RORVRfR09FUkxJIiwibmV0dHlwZWlkIjpudWxsLCJpc2FkbWluIjoyLCJsZXZlbCI6MywiaXNlbWFpbHZlcmlmaWVkIjpudWxsLCJpc3Bob25ldmVyaWZpZWQiOm51bGwsInN0cmVldGFkZHJlc3MiOm51bGwsInppcGNvZGUiOm51bGwsInJlY2VpdmVycGhvbmUiOm51bGwsInNpbXBsZXBhc3N3b3JkIjpudWxsLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJmdWxsbmFtZSI6bnVsbCwiaXNhbGxvd2VtYWlsIjpudWxsLCJpc2FsbG93c21zIjpudWxsLCJzaW1wbGVwdyI6bnVsbCwidXJscHJvZmlsZWltYWdlIjpudWxsLCJtaWxlYWdlIjoiMzIiLCJwb2ludHMiOiIzMiIsImxldmVsc3RyIjoiTWFzdGVyIiwid2FsbGV0Ijp7ImlkIjoxLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAxVDAwOjQzOjA4LjAwMFoiLCJ1aWQiOjEwLCJ3YWxsZXRhZGRyZXNzIjoiMHhCNjZENGJDZWFjNjUyMDlGYUE3NWMzMzIyREExYWUxRUQ4M2EwNmU0IiwicHJpdmF0ZWtleSI6IjB4ZTU1YWJmM2Q0YWU5MjJlYWU2ZmQ4NTBkNmY2YWIwMGUwZjU1ODc4NGYxZjRjYTA5NmQzODhkM2FmZTkxYzdlMSIsIm5ldHR5cGUiOiJFVEhfVEVTVE5FVF9HT0VSTEkiLCJhbW91bnQiOm51bGwsIm5ldHR5cGVpZCI6bnVsbH0sImlhdCI6MTY2NzU2NzQ0NSwiZXhwIjoxNjY3NzQwMjQ1LCJpc3MiOiJFWFBSRVNTIn0.d6dRvX-G8e-Z6KOvaMz9phheWOwNKxDgcbb76EGcxRU','::ffff:121.134.16.118',1667567445,NULL,'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36','cheny5dyh@gmail.com'),(17,'2022-11-05 00:26:52',NULL,16,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjE2LCJjcmVhdGVkYXQiOiIyMDIyLTExLTAyVDEyOjMyOjQyLjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTA0VDA3OjExOjAzLjAwMFoiLCJlbWFpbCI6ImF1czdpbm1hcjdpbkBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiNzIyMGM0MWEtNWFhYS0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTZzIiwibXlyZWZlcmVyY29kZSI6IjBlOGJkNzE2ZjA0YWFhIiwibmV0dHlwZSI6IkVUSF9URVNUTkVUX0dPRVJMSSIsIm5ldHR5cGVpZCI6bnVsbCwiaXNhZG1pbiI6bnVsbCwibGV2ZWwiOjIsImlzZW1haWx2ZXJpZmllZCI6bnVsbCwiaXNwaG9uZXZlcmlmaWVkIjpudWxsLCJzdHJlZXRhZGRyZXNzIjpudWxsLCJ6aXBjb2RlIjpudWxsLCJyZWNlaXZlcnBob25lIjpudWxsLCJzaW1wbGVwYXNzd29yZCI6bnVsbCwiZmlyc3RuYW1lIjpudWxsLCJsYXN0bmFtZSI6bnVsbCwiZnVsbG5hbWUiOm51bGwsImlzYWxsb3dlbWFpbCI6bnVsbCwiaXNhbGxvd3NtcyI6bnVsbCwic2ltcGxlcHciOiIyMjIyMjIiLCJ1cmxwcm9maWxlaW1hZ2UiOm51bGwsIm1pbGVhZ2UiOiI0MCIsInBvaW50cyI6IjQwIiwibGV2ZWxzdHIiOiJCYWJ5Iiwid2FsbGV0Ijp7ImlkIjo0LCJjcmVhdGVkYXQiOiIyMDIyLTExLTAyVDEyOjMyOjQyLjAwMFoiLCJ1cGRhdGVkYXQiOm51bGwsInVpZCI6MTYsIndhbGxldGFkZHJlc3MiOiIweGVGMThGNzAzQmM3MWU0NTZlNjBCNzg2MkU0OWI1NjAxMTI2Nzk1RWQiLCJwcml2YXRla2V5IjoiMHgxM2FiNDE4NzQ4MDU3ZmE4OWY3OTZjY2Y1OTNmMzhiNTk4OTEyODExYjg4ODZhYWE1OTlhN2JmMjBlNGFhYTU2IiwibmV0dHlwZSI6IkVUSF9URVNUTkVUX0dPRVJMSSIsImFtb3VudCI6bnVsbCwibmV0dHlwZWlkIjpudWxsfSwiaWF0IjoxNjY3NjA4MDEyLCJleHAiOjE2Njc3ODA4MTIsImlzcyI6IkVYUFJFU1MifQ.La8GyvST8ukbiA16IkDc0-02UJq7P6n-P-pig9KCgFQ','::ffff:112.214.207.62',1667608012,NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/236.0.484392333 Mobile/15E148 Safari/604.1','aus7inmar7in@gmail.com'),(18,'2022-11-05 02:44:54',NULL,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjEwLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTA0VDA3OjEwOjM5LjAwMFoiLCJlbWFpbCI6ImNoZW55NWR5aEBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiM2RmMGJmYTctNGY2MC0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTYiLCJteXJlZmVyZXJjb2RlIjoiYWI2NTQ2YWFmZjEzZTkiLCJuZXR0eXBlIjoiRVRIX1RFU1RORVRfR09FUkxJIiwibmV0dHlwZWlkIjpudWxsLCJpc2FkbWluIjoyLCJsZXZlbCI6MywiaXNlbWFpbHZlcmlmaWVkIjpudWxsLCJpc3Bob25ldmVyaWZpZWQiOm51bGwsInN0cmVldGFkZHJlc3MiOm51bGwsInppcGNvZGUiOm51bGwsInJlY2VpdmVycGhvbmUiOm51bGwsInNpbXBsZXBhc3N3b3JkIjpudWxsLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJmdWxsbmFtZSI6bnVsbCwiaXNhbGxvd2VtYWlsIjpudWxsLCJpc2FsbG93c21zIjpudWxsLCJzaW1wbGVwdyI6bnVsbCwidXJscHJvZmlsZWltYWdlIjpudWxsLCJtaWxlYWdlIjoiMzIiLCJwb2ludHMiOiIzMiIsImxldmVsc3RyIjoiTWFzdGVyIiwid2FsbGV0Ijp7ImlkIjoxLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAxVDAwOjQzOjA4LjAwMFoiLCJ1aWQiOjEwLCJ3YWxsZXRhZGRyZXNzIjoiMHhCNjZENGJDZWFjNjUyMDlGYUE3NWMzMzIyREExYWUxRUQ4M2EwNmU0IiwicHJpdmF0ZWtleSI6IjB4ZTU1YWJmM2Q0YWU5MjJlYWU2ZmQ4NTBkNmY2YWIwMGUwZjU1ODc4NGYxZjRjYTA5NmQzODhkM2FmZTkxYzdlMSIsIm5ldHR5cGUiOiJFVEhfVEVTVE5FVF9HT0VSTEkiLCJhbW91bnQiOm51bGwsIm5ldHR5cGVpZCI6bnVsbH0sImlhdCI6MTY2NzYxNjI5NCwiZXhwIjoxNjY3Nzg5MDk0LCJpc3MiOiJFWFBSRVNTIn0.NcNUaCRWPDg41tv-FH7kbfhdvrUzm95Kb254Y2WSexA','::ffff:121.134.16.118',1667616294,NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','cheny5dyh@gmail.com'),(19,'2022-11-05 03:33:43',NULL,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjEwLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTA0VDA3OjEwOjM5LjAwMFoiLCJlbWFpbCI6ImNoZW55NWR5aEBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiM2RmMGJmYTctNGY2MC0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTYiLCJteXJlZmVyZXJjb2RlIjoiYWI2NTQ2YWFmZjEzZTkiLCJuZXR0eXBlIjoiRVRIX1RFU1RORVRfR09FUkxJIiwibmV0dHlwZWlkIjpudWxsLCJpc2FkbWluIjoyLCJsZXZlbCI6MywiaXNlbWFpbHZlcmlmaWVkIjpudWxsLCJpc3Bob25ldmVyaWZpZWQiOm51bGwsInN0cmVldGFkZHJlc3MiOm51bGwsInppcGNvZGUiOm51bGwsInJlY2VpdmVycGhvbmUiOm51bGwsInNpbXBsZXBhc3N3b3JkIjpudWxsLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJmdWxsbmFtZSI6bnVsbCwiaXNhbGxvd2VtYWlsIjpudWxsLCJpc2FsbG93c21zIjpudWxsLCJzaW1wbGVwdyI6bnVsbCwidXJscHJvZmlsZWltYWdlIjpudWxsLCJtaWxlYWdlIjoiMzIiLCJwb2ludHMiOiIzMiIsImxldmVsc3RyIjoiTWFzdGVyIiwid2FsbGV0Ijp7ImlkIjoxLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAxVDAwOjQzOjA4LjAwMFoiLCJ1aWQiOjEwLCJ3YWxsZXRhZGRyZXNzIjoiMHhCNjZENGJDZWFjNjUyMDlGYUE3NWMzMzIyREExYWUxRUQ4M2EwNmU0IiwicHJpdmF0ZWtleSI6IjB4ZTU1YWJmM2Q0YWU5MjJlYWU2ZmQ4NTBkNmY2YWIwMGUwZjU1ODc4NGYxZjRjYTA5NmQzODhkM2FmZTkxYzdlMSIsIm5ldHR5cGUiOiJFVEhfVEVTVE5FVF9HT0VSTEkiLCJhbW91bnQiOm51bGwsIm5ldHR5cGVpZCI6bnVsbH0sImlhdCI6MTY2NzYxOTIyMywiZXhwIjoxNjY3NzkyMDIzLCJpc3MiOiJFWFBSRVNTIn0.gUBsWsokQoe3mhCGuuSIqlb2RZCZMt_QvzEI8dwKE4A','::ffff:121.134.16.118',1667619223,NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36','cheny5dyh@gmail.com'),(20,'2022-11-05 06:44:05',NULL,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjEwLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTA0VDA3OjEwOjM5LjAwMFoiLCJlbWFpbCI6ImNoZW55NWR5aEBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiM2RmMGJmYTctNGY2MC0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTYiLCJteXJlZmVyZXJjb2RlIjoiYWI2NTQ2YWFmZjEzZTkiLCJuZXR0eXBlIjoiRVRIX1RFU1RORVRfR09FUkxJIiwibmV0dHlwZWlkIjpudWxsLCJpc2FkbWluIjoyLCJsZXZlbCI6MywiaXNlbWFpbHZlcmlmaWVkIjpudWxsLCJpc3Bob25ldmVyaWZpZWQiOm51bGwsInN0cmVldGFkZHJlc3MiOm51bGwsInppcGNvZGUiOm51bGwsInJlY2VpdmVycGhvbmUiOm51bGwsInNpbXBsZXBhc3N3b3JkIjpudWxsLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJmdWxsbmFtZSI6bnVsbCwiaXNhbGxvd2VtYWlsIjpudWxsLCJpc2FsbG93c21zIjpudWxsLCJzaW1wbGVwdyI6bnVsbCwidXJscHJvZmlsZWltYWdlIjpudWxsLCJtaWxlYWdlIjoiMzIiLCJwb2ludHMiOiIzMiIsImxldmVsc3RyIjoiTWFzdGVyIiwid2FsbGV0Ijp7ImlkIjoxLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAxVDAwOjQzOjA4LjAwMFoiLCJ1aWQiOjEwLCJ3YWxsZXRhZGRyZXNzIjoiMHhCNjZENGJDZWFjNjUyMDlGYUE3NWMzMzIyREExYWUxRUQ4M2EwNmU0IiwicHJpdmF0ZWtleSI6IjB4ZTU1YWJmM2Q0YWU5MjJlYWU2ZmQ4NTBkNmY2YWIwMGUwZjU1ODc4NGYxZjRjYTA5NmQzODhkM2FmZTkxYzdlMSIsIm5ldHR5cGUiOiJFVEhfVEVTVE5FVF9HT0VSTEkiLCJhbW91bnQiOm51bGwsIm5ldHR5cGVpZCI6bnVsbH0sImlhdCI6MTY2NzYzMDY0NSwiZXhwIjoxNjY3ODAzNDQ1LCJpc3MiOiJFWFBSRVNTIn0.3HBHcMahGah4FOoUlywEN7DZJomIZ86NTyvwrJfUhDQ','::ffff:121.134.16.118',1667630645,NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','cheny5dyh@gmail.com'),(21,'2022-11-06 04:25:42',NULL,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjEwLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTA0VDA3OjEwOjM5LjAwMFoiLCJlbWFpbCI6ImNoZW55NWR5aEBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiM2RmMGJmYTctNGY2MC0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTYiLCJteXJlZmVyZXJjb2RlIjoiYWI2NTQ2YWFmZjEzZTkiLCJuZXR0eXBlIjoiRVRIX1RFU1RORVRfR09FUkxJIiwibmV0dHlwZWlkIjpudWxsLCJpc2FkbWluIjoyLCJsZXZlbCI6MywiaXNlbWFpbHZlcmlmaWVkIjpudWxsLCJpc3Bob25ldmVyaWZpZWQiOm51bGwsInN0cmVldGFkZHJlc3MiOm51bGwsInppcGNvZGUiOm51bGwsInJlY2VpdmVycGhvbmUiOm51bGwsInNpbXBsZXBhc3N3b3JkIjpudWxsLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJmdWxsbmFtZSI6bnVsbCwiaXNhbGxvd2VtYWlsIjpudWxsLCJpc2FsbG93c21zIjpudWxsLCJzaW1wbGVwdyI6bnVsbCwidXJscHJvZmlsZWltYWdlIjpudWxsLCJtaWxlYWdlIjoiMzIiLCJwb2ludHMiOiIzMiIsImxldmVsc3RyIjoiTWFzdGVyIiwid2FsbGV0Ijp7ImlkIjoxLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAxVDAwOjQzOjA4LjAwMFoiLCJ1aWQiOjEwLCJ3YWxsZXRhZGRyZXNzIjoiMHhCNjZENGJDZWFjNjUyMDlGYUE3NWMzMzIyREExYWUxRUQ4M2EwNmU0IiwicHJpdmF0ZWtleSI6IjB4ZTU1YWJmM2Q0YWU5MjJlYWU2ZmQ4NTBkNmY2YWIwMGUwZjU1ODc4NGYxZjRjYTA5NmQzODhkM2FmZTkxYzdlMSIsIm5ldHR5cGUiOiJFVEhfVEVTVE5FVF9HT0VSTEkiLCJhbW91bnQiOm51bGwsIm5ldHR5cGVpZCI6bnVsbH0sImlhdCI6MTY2NzcwODc0MiwiZXhwIjoxNjY3ODgxNTQyLCJpc3MiOiJFWFBSRVNTIn0.RSsFQa7LSv-egLYiHvhPZEt0sHKhLja77Q17F4vI864','::ffff:121.134.16.118',1667708742,NULL,'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36','cheny5dyh@gmail.com'),(22,'2022-11-06 08:06:58',NULL,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjEwLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTA0VDA3OjEwOjM5LjAwMFoiLCJlbWFpbCI6ImNoZW55NWR5aEBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiM2RmMGJmYTctNGY2MC0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTYiLCJteXJlZmVyZXJjb2RlIjoiYWI2NTQ2YWFmZjEzZTkiLCJuZXR0eXBlIjoiRVRIX1RFU1RORVRfR09FUkxJIiwibmV0dHlwZWlkIjpudWxsLCJpc2FkbWluIjoyLCJsZXZlbCI6MywiaXNlbWFpbHZlcmlmaWVkIjpudWxsLCJpc3Bob25ldmVyaWZpZWQiOm51bGwsInN0cmVldGFkZHJlc3MiOm51bGwsInppcGNvZGUiOm51bGwsInJlY2VpdmVycGhvbmUiOm51bGwsInNpbXBsZXBhc3N3b3JkIjpudWxsLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJmdWxsbmFtZSI6bnVsbCwiaXNhbGxvd2VtYWlsIjpudWxsLCJpc2FsbG93c21zIjpudWxsLCJzaW1wbGVwdyI6bnVsbCwidXJscHJvZmlsZWltYWdlIjpudWxsLCJtaWxlYWdlIjoiMzIiLCJwb2ludHMiOiIzMiIsImxldmVsc3RyIjoiTWFzdGVyIiwid2FsbGV0Ijp7ImlkIjoxLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAxVDAwOjQzOjA4LjAwMFoiLCJ1aWQiOjEwLCJ3YWxsZXRhZGRyZXNzIjoiMHhCNjZENGJDZWFjNjUyMDlGYUE3NWMzMzIyREExYWUxRUQ4M2EwNmU0IiwicHJpdmF0ZWtleSI6IjB4ZTU1YWJmM2Q0YWU5MjJlYWU2ZmQ4NTBkNmY2YWIwMGUwZjU1ODc4NGYxZjRjYTA5NmQzODhkM2FmZTkxYzdlMSIsIm5ldHR5cGUiOiJFVEhfVEVTVE5FVF9HT0VSTEkiLCJhbW91bnQiOm51bGwsIm5ldHR5cGVpZCI6bnVsbH0sImlhdCI6MTY2NzcyMjAxOCwiZXhwIjoxNjY3ODk0ODE4LCJpc3MiOiJFWFBSRVNTIn0.SUEkb-Z17ihOq3NY9K4BabDADFUlZAVN8b2E4Lyl_Tg','::ffff:121.134.16.118',1667722018,NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','cheny5dyh@gmail.com'),(23,'2022-11-06 08:08:02',NULL,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjEwLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTA0VDA3OjEwOjM5LjAwMFoiLCJlbWFpbCI6ImNoZW55NWR5aEBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiM2RmMGJmYTctNGY2MC0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTYiLCJteXJlZmVyZXJjb2RlIjoiYWI2NTQ2YWFmZjEzZTkiLCJuZXR0eXBlIjoiRVRIX1RFU1RORVRfR09FUkxJIiwibmV0dHlwZWlkIjpudWxsLCJpc2FkbWluIjoyLCJsZXZlbCI6MywiaXNlbWFpbHZlcmlmaWVkIjpudWxsLCJpc3Bob25ldmVyaWZpZWQiOm51bGwsInN0cmVldGFkZHJlc3MiOm51bGwsInppcGNvZGUiOm51bGwsInJlY2VpdmVycGhvbmUiOm51bGwsInNpbXBsZXBhc3N3b3JkIjpudWxsLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJmdWxsbmFtZSI6bnVsbCwiaXNhbGxvd2VtYWlsIjpudWxsLCJpc2FsbG93c21zIjpudWxsLCJzaW1wbGVwdyI6bnVsbCwidXJscHJvZmlsZWltYWdlIjpudWxsLCJtaWxlYWdlIjoiMzIiLCJwb2ludHMiOiIzMiIsImxldmVsc3RyIjoiTWFzdGVyIiwid2FsbGV0Ijp7ImlkIjoxLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAxVDAwOjQzOjA4LjAwMFoiLCJ1aWQiOjEwLCJ3YWxsZXRhZGRyZXNzIjoiMHhCNjZENGJDZWFjNjUyMDlGYUE3NWMzMzIyREExYWUxRUQ4M2EwNmU0IiwicHJpdmF0ZWtleSI6IjB4ZTU1YWJmM2Q0YWU5MjJlYWU2ZmQ4NTBkNmY2YWIwMGUwZjU1ODc4NGYxZjRjYTA5NmQzODhkM2FmZTkxYzdlMSIsIm5ldHR5cGUiOiJFVEhfVEVTVE5FVF9HT0VSTEkiLCJhbW91bnQiOm51bGwsIm5ldHR5cGVpZCI6bnVsbH0sImlhdCI6MTY2NzcyMjA4MiwiZXhwIjoxNjY3ODk0ODgyLCJpc3MiOiJFWFBSRVNTIn0.eS-JPcc02VfyUnXYcAembUBd0BjnRK4Nc1Gc7EsCacc','::ffff:121.134.16.118',1667722082,NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','cheny5dyh@gmail.com'),(24,'2022-11-06 08:09:16',NULL,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjEwLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTA0VDA3OjEwOjM5LjAwMFoiLCJlbWFpbCI6ImNoZW55NWR5aEBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiM2RmMGJmYTctNGY2MC0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTYiLCJteXJlZmVyZXJjb2RlIjoiYWI2NTQ2YWFmZjEzZTkiLCJuZXR0eXBlIjoiRVRIX1RFU1RORVRfR09FUkxJIiwibmV0dHlwZWlkIjpudWxsLCJpc2FkbWluIjoyLCJsZXZlbCI6MywiaXNlbWFpbHZlcmlmaWVkIjpudWxsLCJpc3Bob25ldmVyaWZpZWQiOm51bGwsInN0cmVldGFkZHJlc3MiOm51bGwsInppcGNvZGUiOm51bGwsInJlY2VpdmVycGhvbmUiOm51bGwsInNpbXBsZXBhc3N3b3JkIjpudWxsLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJmdWxsbmFtZSI6bnVsbCwiaXNhbGxvd2VtYWlsIjpudWxsLCJpc2FsbG93c21zIjpudWxsLCJzaW1wbGVwdyI6bnVsbCwidXJscHJvZmlsZWltYWdlIjpudWxsLCJtaWxlYWdlIjoiMzIiLCJwb2ludHMiOiIzMiIsImxldmVsc3RyIjoiTWFzdGVyIiwid2FsbGV0Ijp7ImlkIjoxLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAxVDAwOjQzOjA4LjAwMFoiLCJ1aWQiOjEwLCJ3YWxsZXRhZGRyZXNzIjoiMHhCNjZENGJDZWFjNjUyMDlGYUE3NWMzMzIyREExYWUxRUQ4M2EwNmU0IiwicHJpdmF0ZWtleSI6IjB4ZTU1YWJmM2Q0YWU5MjJlYWU2ZmQ4NTBkNmY2YWIwMGUwZjU1ODc4NGYxZjRjYTA5NmQzODhkM2FmZTkxYzdlMSIsIm5ldHR5cGUiOiJFVEhfVEVTVE5FVF9HT0VSTEkiLCJhbW91bnQiOm51bGwsIm5ldHR5cGVpZCI6bnVsbH0sImlhdCI6MTY2NzcyMjE1NiwiZXhwIjoxNjY3ODk0OTU2LCJpc3MiOiJFWFBSRVNTIn0.54eABcNfOzod83jirwc3LE384TgKAvj752QEw7fEZ7M','::ffff:121.134.16.118',1667722156,NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','cheny5dyh@gmail.com'),(25,'2022-11-06 08:13:50',NULL,10,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiaWQiOjEwLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTA0VDA3OjEwOjM5LjAwMFoiLCJlbWFpbCI6ImNoZW55NWR5aEBnbWFpbC5jb20iLCJwaG9uZSI6bnVsbCwidXNlcm5hbWUiOm51bGwsIm5pY2tuYW1lIjpudWxsLCJ1dWlkIjoiM2RmMGJmYTctNGY2MC0xMWVkLWFlMGYtMGFkOTEzM2U3NmY2IiwicGFzc3dvcmQiOiIxMjM0NTYiLCJteXJlZmVyZXJjb2RlIjoiYWI2NTQ2YWFmZjEzZTkiLCJuZXR0eXBlIjoiRVRIX1RFU1RORVRfR09FUkxJIiwibmV0dHlwZWlkIjpudWxsLCJpc2FkbWluIjoyLCJsZXZlbCI6MywiaXNlbWFpbHZlcmlmaWVkIjpudWxsLCJpc3Bob25ldmVyaWZpZWQiOm51bGwsInN0cmVldGFkZHJlc3MiOm51bGwsInppcGNvZGUiOm51bGwsInJlY2VpdmVycGhvbmUiOm51bGwsInNpbXBsZXBhc3N3b3JkIjpudWxsLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJmdWxsbmFtZSI6bnVsbCwiaXNhbGxvd2VtYWlsIjpudWxsLCJpc2FsbG93c21zIjpudWxsLCJzaW1wbGVwdyI6bnVsbCwidXJscHJvZmlsZWltYWdlIjpudWxsLCJtaWxlYWdlIjoiMzIiLCJwb2ludHMiOiIzMiIsImxldmVsc3RyIjoiTWFzdGVyIiwid2FsbGV0Ijp7ImlkIjoxLCJjcmVhdGVkYXQiOiIyMDIyLTEwLTE5VDAzOjQzOjQ5LjAwMFoiLCJ1cGRhdGVkYXQiOiIyMDIyLTExLTAxVDAwOjQzOjA4LjAwMFoiLCJ1aWQiOjEwLCJ3YWxsZXRhZGRyZXNzIjoiMHhCNjZENGJDZWFjNjUyMDlGYUE3NWMzMzIyREExYWUxRUQ4M2EwNmU0IiwicHJpdmF0ZWtleSI6IjB4ZTU1YWJmM2Q0YWU5MjJlYWU2ZmQ4NTBkNmY2YWIwMGUwZjU1ODc4NGYxZjRjYTA5NmQzODhkM2FmZTkxYzdlMSIsIm5ldHR5cGUiOiJFVEhfVEVTVE5FVF9HT0VSTEkiLCJhbW91bnQiOm51bGwsIm5ldHR5cGVpZCI6bnVsbH0sImlhdCI6MTY2NzcyMjQzMCwiZXhwIjoxNjY3ODk1MjMwLCJpc3MiOiJFWFBSRVNTIn0.AuLKz3AsYS_pkXdK8w2CLlh31v0Qgczr3wfELZli4tM','::ffff:121.134.16.118',1667722430,NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','cheny5dyh@gmail.com');
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
INSERT INTO `settings` VALUES (1,'2022-10-19 02:02:33','2022-10-28 10:06:00','EMAIL_CODE_EXPIRES_IN_SEC','180',NULL,1,NULL,NULL),(2,'2022-10-19 03:49:44','2022-11-06 04:22:27','TOKEN_EXPIRES_IN','3000000h',NULL,1,NULL,'BSC_MAINNET'),(3,'2022-10-19 03:49:56','2022-11-06 04:22:29','TOKEN_EXPIRES_IN','3000000h',NULL,1,NULL,'ETH_TESTNET_GOERLI'),(4,'2022-11-01 09:15:41','2022-11-01 09:16:47','MAX_COUNT_REVIEWS_PER_USER_PER_ITEM','4',NULL,NULL,NULL,NULL);
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
  `options` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shoppingcarts`
--

LOCK TABLES `shoppingcarts` WRITE;
/*!40000 ALTER TABLE `shoppingcarts` DISABLE KEYS */;
INSERT INTO `shoppingcarts` VALUES (1,'2022-10-31 14:18:30','2022-11-04 08:30:02',11,NULL,'2366e241-a843-4ea7-8e40-f6a273933052',17,NULL,1,1669734000,'beef4876-8a87-52b9-a1a1-a31e4f766cb0',NULL,NULL),(5,'2022-11-04 08:23:19','2022-11-04 09:12:18',10,NULL,'5267ec95-0f20-41ce-b035-928a1d10ff9e',4,'275200',1,1669734000,'27d4d96b-5c1b-11ed-ae0f-0ad9133e76f6','68800','{\"volume\":\"500ml\"}'),(12,'2022-11-05 02:24:03',NULL,16,NULL,'5267ec95-0f20-41ce-b035-928a1d10ff9e',6,NULL,1,NULL,'0a9d4b16-8389-570e-b125-88daf26502b2',NULL,NULL),(13,'2022-11-05 02:32:34',NULL,16,NULL,'2b639230-b908-4877-a01d-6084a62ee6f8',2,NULL,1,NULL,'c2e8785a-8057-565e-888d-ba4c313b55b7',NULL,NULL),(15,'2022-11-05 14:25:20','2022-11-06 09:08:26',10,NULL,'2366e241-a843-4ea7-8e40-f6a273933052',2,'23900',1,NULL,'bab285a6-bda3-55b0-a7c4-b91a7a74b8f2','23900',NULL);
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
  `bizlicensenumber` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stores`
--

LOCK TABLES `stores` WRITE;
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;
INSERT INTO `stores` VALUES (1,'2022-11-01 07:02:54','2022-11-04 06:10:12','Aritaum','742bfb93-019e-4925-b4fa-48a52ba7abd5','KR','강남대로 396','010-9086-3976','arita@um.com','Ren Yanlin','37.4983','127.028','{\"M\":\"9-21\",\"T\":\"9-21\",\"W\":\"9-21\",\"Th\":\"9-21\",\"F\":\"9-21\",\"Sat\":\"9-21\",\"Sun\":\"9-21\"}','아름다움을 생각하는 아리따움 강남점입니다;',37.4983,127.028,'115-49-60976'),(2,'2022-11-02 15:12:44','2022-11-04 06:12:13','Faceshop','1fa12800-fdac-4767-b1c6-b8562ec5a7e2','KR','잠실동 190-11','02-2202-1179','marag24850@keshitv.com','Meng Chen','37.5104','127.082','{\"M\":\"9-21\",\"T\":\"9-21\",\"W\":\"9-21\",\"Th\":\"9-21\",\"F\":\"9-21\",\"Sat\":\"9-21\",\"Sun\":\"9-21\"}','먹자골목에서 미용을 생각하다',37.5104,127.082,'306-99-90787');
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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,'2022-11-03 10:45:38',NULL,10,'0xd9c0891b969c571ee1538f6c502b8e9a0e061d3772bb1de18f30a4c22ef813d1','ETH_TESTNET_GOERLI',292,'PURE','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4','0x27650a87f448f40bef9ea0b2d1f6d2cf320a4537',NULL,-1,1,1,NULL),(2,'2022-11-03 10:45:38',NULL,10,'0x5a8d741808556b947280cba45c9e671a5a4acf2618e667bff69545997a7cdb76','ETH_TESTNET_GOERLI',126,'PURE','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4','0xdcd80745b9f842665d12703100d66298dcac41fc',NULL,-1,2,1,NULL),(3,'2022-11-03 10:45:38',NULL,10,'0x82b5147f7c6d993a2b528531613929c8e83d8726cdb311cd7d0a3fa4795eb29a','ETH_TESTNET_GOERLI',823,'PURE','0xab803ae79551162caeaa7816e27ad2bcfc817fd6','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4',NULL,1,1,1,NULL),(4,'2022-11-03 10:45:38',NULL,10,'0xcdf603526d65eec957654fabaeb4e2ba460f2577629f9e74dc5ad628e7a4b19d','ETH_TESTNET_GOERLI',790,'PURE','0x90d8e71c5bb70f649fe46f3f73ff908d7cc7f3e8','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4',NULL,1,1,1,NULL),(5,'2022-11-03 10:45:38',NULL,10,'0x72511772d7cf9638b3f7d7876ef8e1dc6f8959e2c586e3cdd11ca5164a2b5fa2','ETH_TESTNET_GOERLI',260,'PURE','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4','0x807c024a22f1ca73541792a2a89696f5690885bf',NULL,-1,1,1,NULL),(6,'2022-11-03 10:45:38',NULL,10,'0xd09576b65d02d612681e7dbbd6b201b5512903e5b7c8b0f3586696bab967ba2e','ETH_TESTNET_GOERLI',609,'PURE','0xdb582dc4e9401408e163625ccd890f7ad45bb6e5','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4',NULL,1,1,1,NULL),(7,'2022-11-03 10:45:38',NULL,10,'0xbec856933557cf6e77aea29d32c300aec007e672ea91ea23ab0fdfc315f8df3a','ETH_TESTNET_GOERLI',435,'PURE','0x83ac7b4c73e4dfac18c4e3243b8a1b4f49786d83','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4',NULL,1,2,1,NULL),(8,'2022-11-03 10:45:38',NULL,10,'0x92c3d2de55d266892c0c2a5d3dbeeedc0641273204e7dddb3176dc0bfcf1168c','ETH_TESTNET_GOERLI',392,'PURE','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4','0xe84e295f31560882201abf5c66c5a5c947961da4',NULL,-1,1,1,NULL),(9,'2022-11-03 10:45:38',NULL,10,'0x740ec901b904d41c6af610b874e8df6a5c8905df46354ca2ef09f1f0b948db33','ETH_TESTNET_GOERLI',383,'PURE','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4','0x5efb14e19626ac13917135e2bbfabc93dde1da6e',NULL,-1,1,1,NULL),(10,'2022-11-03 10:45:38',NULL,10,'0x039dd06827408d78d36e460b9657dd10a375ed38688df07a36634896fbcab8ef','ETH_TESTNET_GOERLI',117,'PURE','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4','0x10b8b83a2b2a3e1cfc8a82a2b2d6e9d821494c4f',NULL,-1,1,1,NULL),(14,'2022-11-04 07:33:49',NULL,10,'0x27695b71181340d30e5ff066f7537b28654e9c965bfd52ba4bb57d1932b860ca','ETH_TESTNET_GOERLI',285,'PURE','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4','0xd985f072fd8a40ac8b7e5ebecb18b889df98615c',NULL,-1,1,1,NULL),(15,'2022-11-04 07:33:49',NULL,10,'0xd573375674daa80881760f448c941c4d58d53635413a2204b760de846ff86840','ETH_TESTNET_GOERLI',386,'PURE','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4','0x170dd9ce3a79c79f63b01221849c1f0a73ed7e20',NULL,-1,1,1,NULL),(16,'2022-11-04 07:33:49',NULL,10,'0xc4322c8fe8be7fe51cf64fbd1b16345d08a3c70fa90b681eb0e5be9baec70639','ETH_TESTNET_GOERLI',605,'PURE','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4','0xc83e7e30331ef8f96cfc468eff2452b2cbc35c34',NULL,-1,1,1,NULL),(17,'2022-11-04 07:33:49',NULL,10,'0x3c818880c09b32b3c9345c75bb0073356a940a48a1d57f2d27a49d603ab52b98','ETH_TESTNET_GOERLI',888,'PURE','0x6ce872e79cab5e210f2fc0df8a118bb8dd7c24ce','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4',NULL,1,1,1,NULL),(18,'2022-11-04 07:33:49',NULL,10,'0x02355df11b4df3eeddd5929717709d2a0a0d7831dbd6b8a8be9544d7dde7f36e','ETH_TESTNET_GOERLI',211,'PURE','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4','0xb00198c3fa552e8aa9b0ce19b64d5b5be74aa4c1',NULL,-1,1,1,NULL),(19,'2022-11-04 07:33:49',NULL,10,'0x41fb9cf57876df923f40f4dde6e65af92c001a7ef3b05e61135b0c83febbc243','ETH_TESTNET_GOERLI',723,'PURE','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4','0x29f3f779bafc9be5a47fefddb500b92262795d61',NULL,-1,2,1,NULL),(20,'2022-11-04 07:33:49',NULL,10,'0x7204b10844c210d12e8ce8e4207022643d87cd94dcbcfd26728689be3ad3b119','ETH_TESTNET_GOERLI',443,'PURE','0x07dfaf77d04901e3ab9b89e1b179d27a17b0c1f3','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4',NULL,1,2,1,NULL),(21,'2022-11-04 07:33:49',NULL,10,'0x2e71c6d25343bf08f9480f7602774291237585de925c86d1c41520c543d2cc35','ETH_TESTNET_GOERLI',931,'PURE','0xaf594af51f0670f91e7beea04ada3e3c876b2bb6','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4',NULL,1,1,1,NULL),(22,'2022-11-04 07:33:49',NULL,10,'0x3ea3c9d175a3b8dc485a82fd2e9d29fe8c4ce885c58355fc3099cdcaeca607f5','ETH_TESTNET_GOERLI',61,'PURE','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4','0x5a93642d9c471a7ae27d54c30d61313b76b360fa',NULL,-1,1,1,NULL),(23,'2022-11-04 07:33:49',NULL,10,'0x83cc73a2a5e1a59e24bfbe5775fa2de08baa11d3cb674040b4728f194252c2ad','ETH_TESTNET_GOERLI',730,'PURE','0xb07f38e3666404420235dd3c06a7c4c1dc433c7d','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4',NULL,1,2,1,NULL),(24,'2022-11-04 07:33:49',NULL,10,'0xbe806cb7ba1f10d3c10d6f5d055652036245d434d46200ecc769989b5ad0baad','ETH_TESTNET_GOERLI',84,'PURE','0xfaea884ff50dff4296e3318631188cb167af0081','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4',NULL,1,1,1,NULL),(25,'2022-11-04 07:33:49',NULL,10,'0xda64033ffc4a65f96f9b2ba863421ced566c6a8d0f01b15ef8eb957599592e1a','ETH_TESTNET_GOERLI',785,'PURE','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4','0x2f1299dca1ada67fa55652f43a81a5f5af5c78f4',NULL,-1,1,1,NULL),(26,'2022-11-04 07:33:49',NULL,10,'0x7a505ba6f71cf0c269e761231a2e91701816abbdbe73df791c9c2a4aa2217c95','ETH_TESTNET_GOERLI',112,'PURE','0x798b90f9bfb0d06a06ce84c54d15ce11c7583e91','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4',NULL,1,1,1,NULL),(27,'2022-11-04 07:33:49',NULL,10,'0x45fb6ee2339e1981e917e189d3ddf323c088a80bda8a276ff75cd9c74fbd0fd2','ETH_TESTNET_GOERLI',986,'PURE','0xa5a13de7d74c6e0fd2a6c409bdd07648be892782','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4',NULL,1,1,1,NULL),(28,'2022-11-04 07:33:49',NULL,10,'0xec414531e571c8864798766fa57d333c82d244abfd9f1fa4f9e01aa25d9200af','ETH_TESTNET_GOERLI',232,'PURE','0x2be57d6c09163bd03b780a5c87e395d47a07a3f7','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4',NULL,1,1,1,NULL),(29,'2022-11-04 07:33:49',NULL,10,'0x2ee39bf460160a28d0bb7a7987c1e103aa2c4344fd4a4645f30b7ff01a691a67','ETH_TESTNET_GOERLI',174,'PURE','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4','0xbe509b7bc1e0ccad8c82c24a6bc8d8c72aca1c69',NULL,-1,1,1,NULL),(30,'2022-11-04 07:33:49',NULL,10,'0x7f15ceed7c2450e5102cb05527f913cd667d0adf27c297ef60376a73b7e18b4b','ETH_TESTNET_GOERLI',385,'PURE','0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4','0x11c8a45a77f201e4a744359c44ec87451f067a6d',NULL,-1,1,1,NULL),(31,'2022-11-05 11:00:44',NULL,10,'0x7ad888dd408bf5ab1820b70df6651bc6abc8380ecac2751561b095a127d381ad','ETH_TESTNET_GOERLI',100,NULL,NULL,NULL,NULL,-1,1,1,NULL),(32,'2022-11-05 11:01:37',NULL,10,'0x50feac97e3db0cd7f63cf53f075a14698caef08f93407653992fa2142f7a69f0','ETH_TESTNET_GOERLI',200,NULL,NULL,NULL,NULL,-1,1,1,NULL),(33,'2022-11-05 11:05:11',NULL,10,'0x0f89ff15fe62a98461ab7c2fd96dd4516121b5e102605f56f311f15a3a0b6d35','ETH_TESTNET_GOERLI',100,NULL,NULL,NULL,NULL,-1,1,1,NULL);
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
  `mileage` varchar(20) DEFAULT NULL,
  `points` varchar(20) DEFAULT NULL,
  `levelstr` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `emailnettype` (`email`,`nettype`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (10,'2022-10-19 03:43:49','2022-11-04 07:10:39','cheny5dyh@gmail.com',NULL,NULL,NULL,'3df0bfa7-4f60-11ed-ae0f-0ad9133e76f6','123456','ab6546aaff13e9','ETH_TESTNET_GOERLI',NULL,2,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'32','32','Master'),(11,'2022-10-30 06:59:55','2022-11-04 07:10:39','merchant00@gmail.com',NULL,'merchant',NULL,'75869950-5820-11ed-ae0f-0ad9133e76f6','123456',NULL,'ETH_TESTNET_GOERLI',NULL,1,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'41','41','Master'),(12,'2022-10-31 03:34:57','2022-11-04 07:10:26','bakujin.dev@gmail.com',NULL,NULL,NULL,'fe2647eb-58cc-11ed-ae0f-0ad9133e76f6','test0000','b8b2f2fe3992a3','ETH_TESTNET_GOERLI',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'49','49','Starter'),(13,'2022-11-01 01:02:46','2022-11-04 07:10:39','cheny5dyh@gmail.com',NULL,NULL,NULL,'e5a46b5d-5980-11ed-ae0f-0ad9133e76f6','123456','67dd18633a9598','BSC_MAINNET',NULL,2,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'60','60','Master'),(14,'2022-11-01 01:28:16','2022-11-04 07:10:51','buyer01@gmail.com',NULL,NULL,NULL,'75d5b184-5984-11ed-ae0f-0ad9133e76f6','123456','8bc2531459fd75','ETH_TESTNET_GOERLI',NULL,0,4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'32','32','Supereme'),(15,'2022-11-02 01:32:11','2022-11-04 07:10:26','leejh16@gmail.com',NULL,NULL,NULL,'2c1185fb-5a4e-11ed-ae0f-0ad9133e76f6','123456','d5b8e864c7c47d','ETH_TESTNET_GOERLI',NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'39','39','Starter'),(16,'2022-11-02 12:32:42','2022-11-04 07:11:03','aus7inmar7in@gmail.com',NULL,NULL,NULL,'7220c41a-5aaa-11ed-ae0f-0ad9133e76f6','123456s','0e8bd716f04aaa','ETH_TESTNET_GOERLI',NULL,NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'222222',NULL,'40','40','Baby'),(17,'2022-11-02 13:36:49','2022-11-04 07:11:03','salokhiddinov0727@gmail.com',NULL,NULL,NULL,'67591e5b-5ab3-11ed-ae0f-0ad9133e76f6','1234567s','4f773839021fff','ETH_TESTNET_GOERLI',NULL,NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'22','22','Baby'),(18,'2022-11-02 14:01:08','2022-11-04 07:11:03','salokhiddinov6727@gmail.com',NULL,NULL,NULL,'cca984a2-5ab6-11ed-ae0f-0ad9133e76f6','1234567s','f76bb3d39dcaac','ETH_TESTNET_GOERLI',NULL,NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'51','51','Baby');
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

-- Dump completed on 2022-11-06 10:25:45
