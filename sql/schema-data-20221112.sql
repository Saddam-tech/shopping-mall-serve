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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `infocategory`
--

DROP TABLE IF EXISTS `infocategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `infocategory` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `name` varchar(400) DEFAULT NULL,
  `code` varchar(20) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  `registrar` varchar(60) DEFAULT NULL,
  `registrarid` bigint(20) unsigned DEFAULT NULL,
  `level` int(10) unsigned DEFAULT NULL,
  `parent` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35597 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `price` varchar(20) DEFAULT NULL,
  `ispromotion` tinyint(4) DEFAULT NULL,
  `isfeatured` tinyint(4) DEFAULT NULL,
  `price0` varchar(20) DEFAULT NULL COMMENT 'price before adjustment',
  `price1` varchar(20) DEFAULT NULL COMMENT 'price after adjustment',
  `msrp` varchar(20) DEFAULT NULL COMMENT 'msrp',
  `msrpunit` varchar(60) DEFAULT NULL COMMENT 'msrp units',
  `isnew` tinyint(3) unsigned DEFAULT NULL,
  `categorystr` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `likes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `objectuuid` varchar(60) DEFAULT NULL,
  `objectid` int(10) unsigned DEFAULT NULL,
  `uid` int(10) unsigned DEFAULT NULL,
  `status` tinyint(3) unsigned DEFAULT NULL COMMENT '0: review not helpful, 1:review helpful, 2:banned, 3: reported',
  `active` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `logsales`
--

DROP TABLE IF EXISTS `logsales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logsales` (
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `citystate` varchar(60) DEFAULT NULL,
  `note` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COMMENT='orders by users';
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `receiver` varchar(60) DEFAULT NULL,
  `phonenumber` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `uid` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `type` tinyint(3) unsigned DEFAULT NULL COMMENT '1: plagiarism, 2:slander and profanity,3:commercial, 4:hatred/violence, 5: misleading, 6:etc',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COMMENT='user reviews products / items';
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `searchkeys`
--

DROP TABLE IF EXISTS `searchkeys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `searchkeys` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uid` int(10) unsigned DEFAULT NULL,
  `searchkey` varchar(100) DEFAULT NULL,
  `count` int(10) unsigned DEFAULT 0,
  `counthits` int(10) unsigned DEFAULT NULL,
  `active` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-12 14:54:46
