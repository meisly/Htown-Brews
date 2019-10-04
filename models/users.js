module.exports = (sequelize, DataTypes)=> {
    const users = sequelize.define("users", {
        username: {type: DataTypes.STRING, len: [1,75], allowNull: false, 
            validate:{notEmpty: true}},
        password: {type: DataTypes.STRING, len: [1,2000], allowNull: false,
            validate:{notEmpty: true}},
        salt: {type: DataTypes.STRING, allowNull: false,
            validate:{notEmpty: true}},
        createdAt: {type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP')},
        updatedAt:{type:DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP')}
    });
    users.associate = function(models) {
        users.hasMany(models.reviews, {
            onDelete: "cascade"
        });

    };
    return users;
};