/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userprefs', {
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
    key_: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    value: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    group_: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'userprefs'
  });
};
