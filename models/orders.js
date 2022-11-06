/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    createdat: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('current_timestamp')
    },
    updatedat: {
      type: DataTypes.DATE,
      allowNull: true
    },
    uid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    itemid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    unitprice: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    totalprice: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    paymeansaddress: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    paymeansname: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    txhash: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    deliveryaddress: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    deliveryzip: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    deliveryphone: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    uuid: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    sha256id: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    streetaddress: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    detailaddress: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    zipcode: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    nation: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    salesid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    salesuuid: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    merchantid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    merchantuuid: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      comment: '0: placed, 1: under review, 2: on delivery, 3: done delivery'
    },
    itemuuid: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    options: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tracknumber: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    carrierid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    detailuuid: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    carriersymbol: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    carriername: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    orderer: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    receiver: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    phonenumber: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    feedelivery: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    feedeliveryunit: {
      type: DataTypes.STRING(60),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'orders'
  });
};
