/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stores', {
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
    uuid: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    nation: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: 'two letter code'
    },
    address: {
      type: DataTypes.STRING(300),
      allowNull: true,
      comment: 'street address'
    },
    phone: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    managername: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: 'of the store_s physical location'
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: 'of the store_s physical location'
    },
    officehours: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'stores'
  });
};
