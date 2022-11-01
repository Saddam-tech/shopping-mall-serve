/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
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
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    nickname: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    uuid: {
      type: DataTypes.STRING(60),
      allowNull: true,
      defaultValue: sequelize.fn('uuid')
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    myreferercode: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    nettype: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    nettypeid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    isadmin: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      comment: '0: not admin, 1:admin common , >=2:privileged admin'
    },
    level: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    isemailverified: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    isphoneverified: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    streetaddress: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    zipcode: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    receiverphone: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    simplepassword: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    firstname: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    fullname: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    isallowemail: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    isallowsms: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    simplepw: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users'
  });
};
