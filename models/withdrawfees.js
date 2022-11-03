/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('withdrawfees', {
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
    intervalstart: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    intervalend: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    amount: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    rate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    descrption: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'withdrawfees'
  });
};
