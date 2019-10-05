module.exports = (sequelize, DataTypes) => {
  const beers = sequelize.define("beers", {
    beerName: {
      type: DataTypes.STRING,
      len: [1, 75],
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    beerType: {
      type: DataTypes.STRING,
      len: [1, 25],
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    beerDescription: {
      type: DataTypes.STRING,
      len: [1, 2000],
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    brewrey: {
      type: DataTypes.STRING,
      len: [1, 75],
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    avgRating: {
      type: DataTypes.INTEGER,
      defaultValue: 5
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  });
  beers.associate = function (models) {
    beers.hasMany(models.reviews, {
      onDelete: "cascade"
    });
  };
  return beers;
};
