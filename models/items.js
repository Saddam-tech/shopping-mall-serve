/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('items', {
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
      type: DataTypes.STRING(200),
      allowNull: true
    },
    seller: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    sellrid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    uuid: {
      type: DataTypes.STRING(60),
      allowNull: true,
      defaultValue: sequelize.fn('uuid')
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image00: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    image01: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    image02: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    image03: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    image04: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    manufacturerid: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    manufacturer: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    mfrid: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'items'
  });
};
