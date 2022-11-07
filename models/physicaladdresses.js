/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('physicaladdresses', {
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
    uid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    streetaddress: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    detailaddress: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    zipcode: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    nation: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: 'two letter abbreviation'
    },
    active: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    isprimary: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    uuid: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    receiver: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    phonenumber: {
      type: DataTypes.STRING(60),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'physicaladdresses'
  });
};
