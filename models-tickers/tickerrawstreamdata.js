/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tickerrawstreamdata', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(10).UNSIGNED,
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
    timestampmili: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    timestamp: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    symbol: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    assetid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    price: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    volume: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    provider: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    timestampsec: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tickerrawstreamdata'
  });
};
