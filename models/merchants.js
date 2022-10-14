/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('merchants', {
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
    nation: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: '2 letter code'
    },
    phone: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    level: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    myreferercode: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    uuid: {
      type: DataTypes.STRING(60),
      allowNull: true,
      defaultValue: sequelize.fn('uuid')
    }
  }, {
    sequelize,
    tableName: 'merchants'
  });
};
