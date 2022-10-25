/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('infouserlevels', {
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
    level: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    uuid: {
      type: DataTypes.STRING(60),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'infouserlevels'
  });
};
