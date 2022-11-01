/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('infocarriers', {
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
    phone: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    uuid: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    idcode: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    symbol: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'infocarriers'
  });
};
