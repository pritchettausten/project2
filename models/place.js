module.exports = function(sequelize, DataTypes){
    var Place = sequelize.define("Place", {
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        geoLoc: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nearby: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Place.associate = function(models){
        //Place.hasMany(models.User);
        Place.hasMany(models.Post, {
            onDelete: "cascade"
        });
    };
    
    return Place;
}