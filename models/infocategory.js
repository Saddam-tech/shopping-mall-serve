/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('infocategory', {
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
      type: DataTypes.STRING(100),
      allowNull: true
    },
    code: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    uuid: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    registrar: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    registrarid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    level: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    parent: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'infocategory'
  });
};
