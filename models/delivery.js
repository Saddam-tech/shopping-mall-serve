/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('delivery', {
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
    itemid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    logsalesid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    carrierid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    requesttimestamp: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    pickuptimestamp: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    arrivaltimestamp: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    currentplace: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'last spotted place'
    },
    currentplacekind: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: true,
      comment: '0: at storehouse , 1: held by delivery , 2: delivered and held by customer'
    },
    status: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: true,
      comment: '0: delivery request made, 1: done , 2: on transit '
    },
    streetaddress: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    zipcode: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    receiverphone: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    tracknumber: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    uuid: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    expectedarrival: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    expectedarrivalstamp: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    statusstr: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    orderid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    orderuuid: {
      type: DataTypes.STRING(60),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'delivery'
  });
};
