/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('logsales', {
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
    userid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    itemid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    uuid: {
      type: DataTypes.STRING(60),
      allowNull: true,
      defaultValue: sequelize.fn('uuid')
    },
    storehouseid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      comment: 'qty sold'
    },
    unitprice: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    paymeansname: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    paymeansaddress: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    txhash: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    merchantid: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'logsales'
  });
};
