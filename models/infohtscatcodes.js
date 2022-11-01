/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('infohtscatcodes', {
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
    section: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    hscode: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    parent: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    level: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'infohtscatcodes'
  });
};
