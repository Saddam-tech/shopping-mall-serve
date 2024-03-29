/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reports', {
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
    titlename: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    contentbody: {
      type: DataTypes.TEXT,
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
    reviewuuid: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    reviewid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    reason: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: true,
      comment: '1: plagiarism, 2:slander and profanity,3:commercial, 4:hatred/violence, 5: misleading, 6:etc'
    },
    typestr: {
      type: DataTypes.STRING(60),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'reports'
  });
};
