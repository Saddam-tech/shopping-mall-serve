/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('qna', {
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
    question: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    categoryid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    writerid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    uuid: {
      type: DataTypes.STRING(60),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'qna'
  });
};
