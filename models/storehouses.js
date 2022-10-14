/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('storehouses', {
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
    nation: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(200),
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
    registrar: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    registrarid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    uuid: {
      type: DataTypes.STRING(60),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'storehouses'
  });
};
