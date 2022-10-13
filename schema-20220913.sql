-- MySQL dump 10.19  Distrib 10.3.34-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: binopt
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
-- Table structure for table `_sample_created_updated`
--

DROP TABLE IF EXISTS `_sample_created_updated`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_sample_created_updated` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `apivendor`
--

DROP TABLE IF EXISTS `apivendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apivendor` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `name` varchar(60) DEFAULT NULL,
  `url` varchar(500) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `uuid` varchar(60) DEFAULT uuid(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `assetgroups`
--

DROP TABLE IF EXISTS `assetgroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assetgroups` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `groupid` int(10) unsigned DEFAULT NULL,
  `groupstr` varchar(60) DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `assets`
--

DROP TABLE IF EXISTS `assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assets` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `name` varchar(40) DEFAULT NULL,
  `symbol` varchar(40) DEFAULT NULL,
  `baseAsset` varchar(40) DEFAULT NULL,
  `targetAsset` varchar(40) DEFAULT NULL,
  `tickerSrc` varchar(40) DEFAULT NULL,
  `group` varchar(40) DEFAULT NULL COMMENT '1: crypto, 2:forex, 3:stock',
  `groupstr` varchar(40) DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  `imgurl` varchar(200) DEFAULT NULL,
  `dispSymbol` varchar(20) DEFAULT NULL,
  `APISymbol` varchar(20) DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `socketAPISymbol` varchar(20) DEFAULT NULL,
  `currentPrice` varchar(40) DEFAULT NULL,
  `groupactive` tinyint(4) DEFAULT NULL,
  `imgurl02` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `asset_group_symbol` (`symbol`,`group`)
) ENGINE=InnoDB AUTO_INCREMENT=547 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `balances`
--

DROP TABLE IF EXISTS `balances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `balances` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) unsigned DEFAULT NULL,
  `total` bigint(20) DEFAULT 0,
  `locked` bigint(20) DEFAULT 0,
  `avail` bigint(20) DEFAULT 0,
  `typestr` varchar(20) DEFAULT NULL,
  `isMember` tinyint(4) DEFAULT NULL,
  `uuid` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_users_uid` (`uid`),
  KEY `FK_demoUsers_uuid` (`uuid`),
  CONSTRAINT `FK_demoUsers_uuid` FOREIGN KEY (`uuid`) REFERENCES `demoUsers` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_users_uid` FOREIGN KEY (`uid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1192 DEFAULT CHARSET=utf8mb4;
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
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `type` varchar(80) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `writer_uid` varchar(200) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `pc_imageurl` varchar(300) DEFAULT NULL,
  `mobile_imageurl` varchar(300) DEFAULT NULL,
  `active` int(11) DEFAULT 0,
  `exposure` int(11) DEFAULT 0,
  `exposure_position` varchar(20) DEFAULT NULL,
  `status` int(11) DEFAULT 0,
  `isBanner` int(11) DEFAULT 1,
  `external_link` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `betlogs`
--

DROP TABLE IF EXISTS `betlogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `betlogs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uid` int(11) unsigned DEFAULT NULL,
  `assetId` int(11) unsigned NOT NULL,
  `amount` bigint(20) unsigned DEFAULT NULL,
  `starting` bigint(20) unsigned NOT NULL,
  `expiry` bigint(20) unsigned NOT NULL,
  `startingPrice` varchar(20) DEFAULT NULL,
  `endingPrice` varchar(20) DEFAULT NULL,
  `side` varchar(20) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `status` int(11) unsigned DEFAULT NULL,
  `betId` int(11) DEFAULT NULL,
  `diffRate` varchar(11) DEFAULT NULL,
  `uuid` varchar(100) DEFAULT NULL,
  `assetName` varchar(40) DEFAULT NULL,
  `isnotisent` tinyint(4) DEFAULT 0,
  `winamount` varchar(20) DEFAULT NULL,
  `sha256id` varchar(100) DEFAULT NULL,
  `symbol` varchar(60) DEFAULT NULL,
  `outcomestr` varchar(50) DEFAULT NULL,
  `outcome` varchar(20) DEFAULT NULL,
  `procee` int(10) unsigned DEFAULT NULL COMMENT 'null/1: normal, 31517:lack of starting,unprocessed',
  PRIMARY KEY (`id`),
  KEY `FK_betlog_uid` (`uid`),
  KEY `FK_betlog_assetId` (`assetId`),
  KEY `FK_demoUsers_uuid_betlogs` (`uuid`),
  CONSTRAINT `FK_betlog_uid` FOREIGN KEY (`uid`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_demoUsers_uuid_betlogs` FOREIGN KEY (`uuid`) REFERENCES `demoUsers` (`uuid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=895949 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `betprocesscodes`
--

DROP TABLE IF EXISTS `betprocesscodes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `betprocesscodes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `code` int(10) unsigned DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bets`
--

DROP TABLE IF EXISTS `bets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bets` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uid` int(11) unsigned DEFAULT NULL,
  `assetId` int(11) unsigned NOT NULL,
  `amount` bigint(20) unsigned DEFAULT NULL,
  `starting` bigint(20) unsigned NOT NULL,
  `expiry` bigint(20) unsigned NOT NULL,
  `startingPrice` varchar(20) DEFAULT NULL,
  `side` varchar(20) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `uuid` varchar(100) DEFAULT NULL,
  `diffRate` varchar(11) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `sha256id` varchar(100) DEFAULT NULL,
  `entryprice0` varchar(20) DEFAULT NULL COMMENT 'one at bet place time',
  `entryprice1` varchar(20) DEFAULT NULL COMMENT 'one at start of minute of round',
  `symbol` varchar(60) DEFAULT NULL,
  `winamount` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_demoUsers_uuid_bets` (`uuid`),
  KEY `expiry` (`expiry`),
  KEY `starting` (`starting`),
  CONSTRAINT `FK_demoUsers_uuid_bets` FOREIGN KEY (`uuid`) REFERENCES `demoUsers` (`uuid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=780776 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bookmarks`
--

DROP TABLE IF EXISTS `bookmarks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookmarks` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uid` int(11) unsigned DEFAULT NULL,
  `assetsId` int(11) unsigned DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `typestr` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_assets_bookmark` (`assetsId`),
  KEY `FK_users_bookmark` (`uid`),
  CONSTRAINT `FK_assets_bookmark` FOREIGN KEY (`assetsId`) REFERENCES `assets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_users_bookmark` FOREIGN KEY (`uid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `branchusers`
--

DROP TABLE IF EXISTS `branchusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `branchusers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uid` int(10) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL,
  `bankName` varchar(50) DEFAULT NULL,
  `bankAccount` varchar(80) DEFAULT NULL,
  `walletAddress` varchar(80) DEFAULT NULL,
  `phone` varchar(40) DEFAULT NULL,
  `typestr` varchar(20) DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  `myreferercode` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `referercode` varchar(60) DEFAULT NULL,
  `rootuserid` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `country_code`
--

DROP TABLE IF EXISTS `country_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country_code` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `dialcode` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=243 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `demoUsers`
--

DROP TABLE IF EXISTS `demoUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `demoUsers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uuid` varchar(100) DEFAULT NULL,
  `timestampunixstarttime` bigint(20) unsigned DEFAULT NULL,
  `timestampunixexpiry` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=979 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `domainsettings`
--

DROP TABLE IF EXISTS `domainsettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `domainsettings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `url` varchar(100) DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `qrcode` tinyint(4) DEFAULT NULL,
  `QRurl` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `feesettings`
--

DROP TABLE IF EXISTS `feesettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feesettings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `key_` varchar(50) DEFAULT NULL,
  `value_` varchar(50) DEFAULT NULL,
  `subkey_` varchar(50) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `nettype` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `finnhubapisymbols`
--

DROP TABLE IF EXISTS `finnhubapisymbols`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `finnhubapisymbols` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `symbol` varchar(60) DEFAULT NULL,
  `displaySymbol` varchar(60) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `vendorname` varchar(60) DEFAULT NULL,
  `assetkind` varchar(60) DEFAULT NULL,
  `exchanges` varchar(60) DEFAULT NULL,
  `active` tinyint(4) DEFAULT 1,
  `baseAsset` varchar(20) DEFAULT NULL,
  `targetAsset` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9694 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `forexcurrencies`
--

DROP TABLE IF EXISTS `forexcurrencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `forexcurrencies` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `name` varchar(60) DEFAULT NULL,
  `symbol` varchar(10) DEFAULT NULL,
  `urllogo` varchar(400) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `active` tinyint(4) DEFAULT 1,
  `urllogorounded` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `infocandles`
--

DROP TABLE IF EXISTS `infocandles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `infocandles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `timelengthchar` varchar(40) DEFAULT NULL,
  `timelengthinsec` int(10) unsigned DEFAULT NULL,
  `timelengthinmilisec` int(10) unsigned DEFAULT NULL,
  `timelengthdisp` varchar(40) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `uuid` varchar(60) DEFAULT uuid(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `infotokens`
--

DROP TABLE IF EXISTS `infotokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `infotokens` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `name` varchar(11) DEFAULT NULL,
  `decimals` int(10) unsigned DEFAULT NULL,
  `contractaddress` varchar(80) DEFAULT NULL,
  `networkidnumber` int(20) unsigned DEFAULT NULL,
  `nettype` varchar(100) DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  `networkurl` varchar(100) DEFAULT NULL,
  `logourl` varchar(500) DEFAULT NULL,
  `isprimary` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inquiry`
--

DROP TABLE IF EXISTS `inquiry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inquiry` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `type` varchar(80) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `writer_uid` varchar(200) DEFAULT NULL,
  `content` varchar(300) DEFAULT NULL,
  `answer` varchar(300) DEFAULT NULL,
  `imageurl` varchar(300) DEFAULT NULL,
  `status` int(11) DEFAULT 0,
  `replier_uid` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `levelsettings`
--

DROP TABLE IF EXISTS `levelsettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `levelsettings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `levelstr` varchar(50) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `basepoint` int(11) unsigned DEFAULT NULL,
  `imgurl` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `logdaily`
--

DROP TABLE IF EXISTS `logdaily`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logdaily` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `sumbets` varchar(40) DEFAULT NULL,
  `sumbetswinside` varchar(40) DEFAULT NULL,
  `sumbetsloseside` varchar(40) DEFAULT NULL,
  `sumfeeadmin` varchar(40) DEFAULT NULL,
  `sumfeebranch` varchar(40) DEFAULT NULL,
  `sumfeeuser` varchar(40) DEFAULT NULL,
  `countbets` int(10) unsigned DEFAULT NULL,
  `countbetshigh` int(10) unsigned DEFAULT NULL,
  `countbetslow` int(10) unsigned DEFAULT NULL,
  `sumdeposits` varchar(40) DEFAULT NULL,
  `sumwithdraws` varchar(40) DEFAULT NULL,
  `countdeposits` int(10) unsigned DEFAULT NULL,
  `countwithdraws` int(10) unsigned DEFAULT NULL,
  `datestr` varchar(20) DEFAULT NULL,
  `starttimeunix` bigint(20) unsigned DEFAULT NULL,
  `endtimeunix` bigint(20) unsigned DEFAULT NULL,
  `nettype` varchar(60) DEFAULT NULL,
  `active` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `logfeepayer`
--

DROP TABLE IF EXISTS `logfeepayer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logfeepayer` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uid` int(11) DEFAULT NULL,
  `branch_uid` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `logfees`
--

DROP TABLE IF EXISTS `logfees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logfees` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `payer_uid` int(11) DEFAULT NULL,
  `recipient_uid` int(11) DEFAULT NULL,
  `feeamount` varchar(20) DEFAULT NULL,
  `typestr` varchar(40) DEFAULT NULL,
  `betamount` varchar(20) DEFAULT NULL,
  `round_uid` int(11) DEFAULT NULL,
  `bet_expiry` bigint(20) unsigned DEFAULT NULL,
  `assetId` int(11) unsigned DEFAULT NULL,
  `betId` int(11) unsigned DEFAULT NULL,
  `txhash` varchar(80) DEFAULT NULL,
  `contractaddress` varchar(80) DEFAULT NULL,
  `currency` varchar(60) DEFAULT NULL,
  `nettype` varchar(60) DEFAULT NULL,
  `fee_value` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2057144 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `loginhistories`
--

DROP TABLE IF EXISTS `loginhistories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loginhistories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uid` int(20) DEFAULT NULL,
  `ipaddress` varchar(300) DEFAULT NULL,
  `deviceos` varchar(500) DEFAULT NULL,
  `browser` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1433 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `logmapsockets`
--

DROP TABLE IF EXISTS `logmapsockets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logmapsockets` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `userid` varchar(100) DEFAULT NULL,
  `useragent` varchar(200) DEFAULT NULL,
  `ipaddress` varchar(80) DEFAULT NULL,
  `connectionkey` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1464 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `logrounds`
--

DROP TABLE IF EXISTS `logrounds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logrounds` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `assetId` int(11) unsigned NOT NULL,
  `totalLowAmount` bigint(20) unsigned DEFAULT NULL,
  `totalHighAmount` bigint(20) unsigned DEFAULT NULL,
  `expiry` bigint(20) unsigned NOT NULL,
  `startingPrice` varchar(20) DEFAULT NULL,
  `endPrice` varchar(20) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `uuid` varchar(100) DEFAULT NULL,
  `lowDiffRate` varchar(11) DEFAULT NULL,
  `highDiffRate` varchar(11) DEFAULT NULL,
  `totalAmount` bigint(20) unsigned DEFAULT NULL,
  `side` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=413350 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mapsockets`
--

DROP TABLE IF EXISTS `mapsockets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mapsockets` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `userid` varchar(100) DEFAULT NULL,
  `useragent` varchar(200) DEFAULT NULL,
  `ipaddress` varchar(80) DEFAULT NULL,
  `connectionkey` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1973 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `networktoken`
--

DROP TABLE IF EXISTS `networktoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `networktoken` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `name` varchar(11) DEFAULT NULL,
  `decimal` int(30) DEFAULT NULL,
  `contractaddress` varchar(80) DEFAULT NULL,
  `networkidnumber` int(20) unsigned DEFAULT NULL,
  `nettype` varchar(11) DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  `networkurl` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `type` varchar(80) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `writer_uid` varchar(200) DEFAULT NULL,
  `content` varchar(300) DEFAULT NULL,
  `imageurl` varchar(300) DEFAULT NULL,
  `active` int(11) DEFAULT 0,
  `exposure` int(11) DEFAULT 0,
  `exposure_posiiton` int(11) DEFAULT 0,
  `status` int(11) DEFAULT 0,
  `external_link` varchar(200) DEFAULT NULL,
  `writer_name` varchar(20) DEFAULT NULL,
  `enrollDate` varchar(100) DEFAULT NULL,
  `viewcount` int(20) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `referrals`
--

DROP TABLE IF EXISTS `referrals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `referrals` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `referer_uid` int(11) unsigned NOT NULL,
  `referral_uid` int(11) unsigned NOT NULL,
  `level` int(11) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `isRefererBranch` int(4) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_users_referer` (`referer_uid`),
  KEY `FK_users_referral` (`referral_uid`),
  CONSTRAINT `FK_users_referer` FOREIGN KEY (`referer_uid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_users_referral` FOREIGN KEY (`referral_uid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(300) DEFAULT NULL,
  `value` varchar(500) DEFAULT NULL,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `active` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tickercandles`
--

DROP TABLE IF EXISTS `tickercandles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tickercandles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `symbol` varchar(50) DEFAULT NULL,
  `price` varchar(40) DEFAULT NULL,
  `assetId` int(11) unsigned DEFAULT NULL,
  `timestamp` bigint(20) DEFAULT NULL,
  `open` varchar(40) DEFAULT NULL,
  `high` varchar(40) DEFAULT NULL,
  `low` varchar(40) DEFAULT NULL,
  `close` varchar(40) DEFAULT NULL,
  `volume` varchar(40) DEFAULT NULL,
  `timestamp1` bigint(20) DEFAULT NULL,
  `timelengthinsec` int(10) unsigned DEFAULT NULL,
  `ipaddress` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `timestamp` (`timestamp`),
  KEY `symbol_timestamp` (`symbol`,`timestamp`)
) ENGINE=InnoDB AUTO_INCREMENT=2733316 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tickerprice`
--

DROP TABLE IF EXISTS `tickerprice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tickerprice` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `symbol` varchar(50) DEFAULT NULL,
  `price` varchar(40) DEFAULT NULL,
  `assetId` int(11) unsigned DEFAULT NULL,
  `timestamp` bigint(20) unsigned DEFAULT NULL,
  `volume` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20544802 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tickerrawstreamdata`
--

DROP TABLE IF EXISTS `tickerrawstreamdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tickerrawstreamdata` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `timestampmili` bigint(20) DEFAULT NULL,
  `timestamp` int(11) DEFAULT NULL,
  `symbol` varchar(40) DEFAULT NULL,
  `assetid` int(10) unsigned DEFAULT NULL,
  `price` varchar(40) DEFAULT NULL,
  `volume` varchar(20) DEFAULT NULL,
  `provider` varchar(40) DEFAULT NULL,
  `timestampsec` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23861422 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tickers`
--

DROP TABLE IF EXISTS `tickers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tickers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `assetId` int(11) DEFAULT NULL,
  `name` varchar(40) DEFAULT NULL,
  `symbol` varchar(20) DEFAULT NULL,
  `periodPrice` varchar(500) DEFAULT NULL,
  `expiryTime` varchar(20) DEFAULT NULL,
  `startingTime` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42347 DEFAULT CHARSET=utf8mb4;
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
  `uid` int(11) unsigned NOT NULL,
  `amount` bigint(20) DEFAULT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `typestr` varchar(80) DEFAULT NULL,
  `status` tinyint(3) DEFAULT NULL,
  `verifier` int(11) DEFAULT NULL,
  `target_uid` int(11) unsigned DEFAULT NULL,
  `txhash` varchar(300) DEFAULT NULL,
  `localeAmount` bigint(20) DEFAULT NULL,
  `localeUnit` varchar(50) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `cardNum` varchar(100) DEFAULT NULL,
  `bankCode` varchar(100) DEFAULT NULL,
  `bankName` varchar(100) DEFAULT NULL,
  `checked` tinyint(1) DEFAULT 0,
  `rxaddr` varchar(300) DEFAULT NULL,
  `senderaddr` varchar(300) DEFAULT NULL,
  `nettype` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `txhash` (`txhash`),
  KEY `FK_users_transactions_uid` (`uid`),
  CONSTRAINT `FK_users_transactions_uid` FOREIGN KEY (`uid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=261 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `twelvedataapisymbols`
--

DROP TABLE IF EXISTS `twelvedataapisymbols`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `twelvedataapisymbols` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `symbol` varchar(60) DEFAULT NULL,
  `displaySymbol` varchar(60) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `vendorname` varchar(60) DEFAULT NULL,
  `assetkind` varchar(60) DEFAULT NULL,
  `exchanges` varchar(60) DEFAULT NULL,
  `active` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2726 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usernoticesettings`
--

DROP TABLE IF EXISTS `usernoticesettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usernoticesettings` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) unsigned DEFAULT NULL,
  `betend` tinyint(4) DEFAULT 1,
  `orderrequest` tinyint(4) DEFAULT 1,
  `emailnotice` tinyint(4) DEFAULT 0,
  `latestnews` tinyint(4) DEFAULT 0,
  `questions` tinyint(4) DEFAULT 0,
  `uuid` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_users_notice_uid` (`uid`),
  KEY `uuid` (`uuid`),
  CONSTRAINT `FK_users_notice_uid` FOREIGN KEY (`uid`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `usernoticesettings_ibfk_1` FOREIGN KEY (`uuid`) REFERENCES `demoUsers` (`uuid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=204 DEFAULT CHARSET=utf8mb4;
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
  `email` varchar(200) DEFAULT NULL,
  `countryNum` varchar(11) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `firstname` varchar(100) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `oauth_type` int(11) DEFAULT NULL,
  `oauth_id` varchar(200) DEFAULT NULL,
  `referercode` varchar(100) DEFAULT 'MD5(3)',
  `uuid` int(11) DEFAULT NULL,
  `level` int(11) DEFAULT 0,
  `isadmin` int(3) unsigned DEFAULT 0,
  `isbranch` tinyint(1) DEFAULT 0,
  `mailVerified` tinyint(1) NOT NULL DEFAULT 0,
  `phoneVerified` tinyint(1) NOT NULL DEFAULT 0,
  `active` tinyint(1) DEFAULT 1,
  `password` varchar(300) DEFAULT NULL,
  `profileimage` varchar(300) DEFAULT NULL,
  `typestr` varchar(20) DEFAULT 'MAIN',
  `language` tinyint(4) DEFAULT NULL COMMENT '0: English, 1: Korean, 2: Chinese',
  `nickname` varchar(100) DEFAULT NULL,
  `languagestr` varchar(10) DEFAULT NULL,
  `branchid` int(10) unsigned DEFAULT NULL,
  `branchuuid` varchar(60) DEFAULT NULL,
  `myparent` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `oauth` (`oauth_type`,`oauth_id`)
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4;
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
  PRIMARY KEY (`id`),
  KEY `FK_users_wallet` (`uid`),
  CONSTRAINT `FK_users_wallet` FOREIGN KEY (`uid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vendorapisymbols`
--

DROP TABLE IF EXISTS `vendorapisymbols`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendorapisymbols` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `symbol` varchar(60) DEFAULT NULL,
  `pairsymbol` varchar(60) DEFAULT NULL,
  `vendorname` varchar(60) DEFAULT NULL,
  `vendorurl` varchar(500) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  `assetkind` varchar(60) DEFAULT NULL,
  `exchanges` varchar(60) DEFAULT NULL,
  `active` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7405 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `verifycode`
--

DROP TABLE IF EXISTS `verifycode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `verifycode` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uid` int(11) unsigned NOT NULL,
  `code` int(11) DEFAULT NULL,
  `expiry` bigint(20) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `phone` varchar(60) DEFAULT NULL,
  `countryNum` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-12 18:29:23
