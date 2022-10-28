/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('items', {
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
    image00: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    image01: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    image02: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    image03: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    image04: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    manufacturerid: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    manufacturername: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    manufactureritemid: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ratingsaverage: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: 'reviewer ratings_ average'
    },
    ratingsmedian: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: 'reviewer ratings_ median value'
    },
    imagedimensions00: {
      type: DataTypes.STRING(60),
      allowNull: true,
      comment: 'eg) 100X100'
    },
    imagedimensions01: {
      type: DataTypes.STRING(60),
      allowNull: true,
      comment: 'eg) 100X100'
    },
    imagedimensions02: {
      type: DataTypes.STRING(60),
      allowNull: true,
      comment: 'eg) 100X100'
    },
    imagedimensions03: {
      type: DataTypes.STRING(60),
      allowNull: true,
      comment: 'eg) 100X100'
    },
    imagedimensions04: {
      type: DataTypes.STRING(60),
      allowNull: true,
      comment: 'eg) 100X100'
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
    imageurl03: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    htscode: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    salescount: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'items'
  });
};
