/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('infonettypes', {
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
    name: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    chainid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    isprimary: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'infonettypes'
  });
};
