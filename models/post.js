module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {

        locationName: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        activity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        lat: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lng: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
  
    Post.associate = function(models){
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
  
    return Post;
  }; 