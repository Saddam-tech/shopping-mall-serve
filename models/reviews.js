/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reviews', {
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
    itemid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    itemuuid: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    titlename: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    contentbody: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: 'number of stars : 1~1.5~5'
    },
    active: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    imageurl00: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    imageurl01: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    imageurl02: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    uuid: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    imageurl03: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'reviews'
  });
};
