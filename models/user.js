 module.exports = function(sequelize, DataTypes){
     var User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [6]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    User.associate = function(models){
        User.hasMany(models.Post, {
            onDelete: "cascade"
        });
        User.hasMany(models.Place);
    };
    return User;
}
