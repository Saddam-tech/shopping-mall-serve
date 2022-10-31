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
    }
  }, {
    sequelize,
    tableName: 'promotions'
  });
};
