
 module.exports = function(sequelize, DataTypes){
     var User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
                notEmpty: true,
                len: [1]
            }
        },
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: true
        },
        
    });

    User.associate = function(models){
        User.hasMany(models.Post, {
            onDelete: "cascade"
        });
        //User.hasMany(models.Place);
    };
    return User;
}
