module.exports = (sequelize, DataTypes)=> {
    const reviews = sequelize.define("reviews", {
        review_rating: {type: DataTypes.INTEGER, allowNull: false,
            validate: {notEmpty: true}},
        review_paragraph: {type: DataTypes.STRING, len: [1,2000], allowNull: false,
            validate: {notEmpty: true}},
        createdAt: {type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP')},
        updatedAt:{type:DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP')}
    });
    reviews.associate = function(models) {   
        reviews.belongsTo(models.users,{
        });
        reviews.belongsTo(models.beers,{
        });
      };
    return reviews;
}