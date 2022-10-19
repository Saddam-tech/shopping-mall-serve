/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shipments', {
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
    merchantid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    handlerid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    receiverid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    receiveaddress: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    logsalesid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    tracknumber: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    uuid: {
      type: DataTypes.STRING(60),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'shipments'
  });
};
