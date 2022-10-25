/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('logmileages', {
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
    type: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: true
    },
    typestr: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    amountbefore: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    amountafter: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    amount: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: true
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'logmileages'
  });
};
