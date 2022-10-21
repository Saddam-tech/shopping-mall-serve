/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('featureditem', {
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
    itemid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    itemuuid: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    isfeatured: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      comment: '0 / 1'
    },
    active: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      comment: '0 / 1'
    }
  }, {
    sequelize,
    tableName: 'featureditem'
  });
};
