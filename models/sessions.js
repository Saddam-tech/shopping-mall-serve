/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sessions', {
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
    token: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    ipaddress: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    logintimestamp: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    logouttimestamp: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    device: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sessions'
  });
};
