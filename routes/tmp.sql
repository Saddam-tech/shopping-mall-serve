promotions
itemid            | int(10) unsigned    | YES  |     | NULL                |                               |
| itemuuid          | varchar(60)         | YES  |     | NULL                |                               |
| deduction         | varchar(20)         | YES  |     | NULL                |                               |
| startingtimestamp | bigint(20) unsigned | YES  |     | NULL                |                               |
| expirytimestamp   | bigint(20) unsigned | YES  |     | NULL                |                               |
| deductionunit     | varchar(20)         | YES  |     | NULL                |                               |
| uuid              | varchar(60)         | YES  |     | NULL                |                               |
| price0            | varchar(20)         | YES  |     | NULL                |                               |
| price1  

uid         | int(10) unsigned | YES  |     | NULL                |                               |
| itemid      | int(10) unsigned | YES  |     | NULL                |                               |
| itemuuid    | varchar(60)      | YES  |     | NULL                |                               |
| titlename   | varchar(300)     | YES  |     | NULL                |                               |
| contentbody | text             | YES  |     | NULL                |                               |
| rating      | float            | YES  |     | NULL                |                               |
| active      | tinyint(4)       | YES  |     | NULL                |                               |
| imageurl00  | varchar(500)     | YES  |     | NULL                |                               |
| imageurl01  | varchar(500)     | YES  |     | NULL                |                               |
| imageurl02  |



`orders` (
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
  PRIMARY KEY (`id`)
)

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
) 
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
) 

