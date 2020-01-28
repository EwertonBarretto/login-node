const user = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fullName: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      cellPhone: {
          type: DataTypes.STRING,
          allowNull: true,
      }
    });
    
    User.findByLogin = async login => {
      let user = await User.findOne({
        where: { username: login },
      });
  
      if (!user) {
        user = await User.findOne({
          where: { email: login },
        });
      }
  
      return user;
    };
  
    return User;
  };
  
   module.exports = user;