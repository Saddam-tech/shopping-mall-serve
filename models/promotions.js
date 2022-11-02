/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('promotions', {
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
    itemuuid: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    deduction: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    startingtimestamp: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    expirytimestamp: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    deductionunit: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    uuid: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    price0: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: 'price before adjustment'
    },
    price1: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: 'price after adjustment'
    },
    uid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      comment: '1: deduction , 2: bogo'
    },
    typestr: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    bogospec: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'eg: {"buy":1,"get":1}'
    }
  }, {
    sequelize,
    tableName: 'promotions'
  });
};
