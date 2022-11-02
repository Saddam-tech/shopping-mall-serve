/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transactions', {
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
    txhash: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    nettype: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    paymeansname: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    from_: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    to_: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    nettypeid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    direction: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      comment: '+1: deposit , -1: withdraw'
    },
    status: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: true,
      comment: '1: success, 2: fail'
    },
    active: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    contractaddress: {
      type: DataTypes.STRING(80),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'transactions'
  });
};
