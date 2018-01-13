module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {

        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
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