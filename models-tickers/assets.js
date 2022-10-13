/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "assets",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      createdat: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.fn("current_timestamp"),
      },
      updatedat: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      symbol: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      baseAsset: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      targetAsset: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      tickerSrc: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      group: {
        type: DataTypes.STRING(40),
        allowNull: true,
        comment: "1: crypto, 2:forex, 3:stock",
      },
      groupstr: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      uuid: {
        type: DataTypes.STRING(60),
        allowNull: true,
      },
      imgurl: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      dispSymbol: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      APISymbol: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      active: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
      },
      socketAPISymbol: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      currentPrice: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      groupactive: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "assets",
    }
  );
};
