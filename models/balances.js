/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('balances', {
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
    amount: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    paymeansid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    paymeansname: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    nettype: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    nettypeid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      comment: '1: token , 2: coin , 3: fiat'
    },
    typestr: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: '1: token , 2: coin , 3: fiat'
    }
  }, {
    sequelize,
    tableName: 'balances'
  });
};
