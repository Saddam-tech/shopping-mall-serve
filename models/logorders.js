/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('logorders', {
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
    }
  }, {
    sequelize,
    tableName: 'logorders'
  });
};