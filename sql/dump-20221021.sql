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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `balances`
--

LOCK TABLES `balances` WRITE;
/*!40000 ALTER TABLE `balances` DISABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emailverifycodes`
--

LOCK TABLES `emailverifycodes` WRITE;
/*!40000 ALTER TABLE `emailverifycodes` DISABLE KEYS */;
INSERT INTO `emailverifycodes` VALUES (1,'2022-10-19 02:06:42',NULL,NULL,'182344',1666145802,'cheny5dyh@gmail.com');
/*!40000 ALTER TABLE `emailverifycodes` ENABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `infopaymeans`
--

LOCK TABLES `infopaymeans` WRITE;
/*!40000 ALTER TABLE `infopaymeans` DISABLE KEYS */;
/*!40000 ALTER TABLE `infopaymeans` ENABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'2022-10-19 08:39:48',NULL,'eco soap(white)',NULL,NULL,'97122265-4f89-11ed-ae0f-0ad9133e76f6',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'2022-10-19 08:40:36',NULL,'eco soap(white)',NULL,NULL,'b41088f9-4f89-11ed-ae0f-0ad9133e76f6',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'2022-10-19 08:49:28',NULL,'eco soap(pink)',NULL,NULL,'f0ccdee8-4f8a-11ed-ae0f-0ad9133e76f6',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='orders by users';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotions`
--

LOCK TABLES `promotions` WRITE;
/*!40000 ALTER TABLE `promotions` DISABLE KEYS */;
/*!40000 ALTER TABLE `promotions` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'2022-10-19 02:02:33',NULL,'EMAIL_CODE_EXPIRES_IN_SEC','600',NULL,1,NULL,NULL),(2,'2022-10-19 03:49:44','2022-10-20 01:25:33','TOKEN_EXPIRES_IN','3000h',NULL,1,NULL,'BSC_MAINNET'),(3,'2022-10-19 03:49:56','2022-10-20 01:25:33','TOKEN_EXPIRES_IN','3000h',NULL,1,NULL,'ETH_TESTNET_GOERLI');
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
  `latitude` float DEFAULT NULL COMMENT 'of the store_s physical location',
  `longitude` float DEFAULT NULL COMMENT 'of the store_s physical location',
  `officehours` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stores`
--

LOCK TABLES `stores` WRITE;
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (10,'2022-10-19 03:43:49','2022-10-19 07:28:41','cheny5dyh@gmail.com',NULL,NULL,NULL,'3df0bfa7-4f60-11ed-ae0f-0ad9133e76f6','123456','ab6546aaff13e9','BSC_MAINNET',NULL,2,NULL,NULL,NULL,NULL,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userwallets`
--

LOCK TABLES `userwallets` WRITE;
/*!40000 ALTER TABLE `userwallets` DISABLE KEYS */;
INSERT INTO `userwallets` VALUES (1,'2022-10-19 03:43:49',NULL,10,'0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4','0xe55abf3d4ae922eae6fd850d6f6ab00e0f558784f1f4ca096d388d3afe91c7e1','BSC_MAINNET',NULL,NULL);
/*!40000 ALTER TABLE `userwallets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-21 13:58:28
