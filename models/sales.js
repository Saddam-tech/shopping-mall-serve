/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sales', {
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
      type: DataTypes.STRING(200),
      allowNull: true
    },
    seller: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    sellrid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    uuid: {
      type: DataTypes.STRING(60),
      allowNull: true,
      defaultValue: sequelize.fn('uuid')
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    categoryid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    subcategoryid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    keywords: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'words to be joined by commas'
    },
    salescount: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    ispromotion: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    promotionuuid: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    promotionid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    itemuuid: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    isrefundable: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    feerefund: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    feeexchange: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: 'fee to be charged on exchange for another item'
    },
    policyfee: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    policycer: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'policy on cancel,exchanges and refund'
    },
    policydelivery: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sales'
  });
};
