const user = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      },
      fullName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: {
            notEmpty: true,
            args: [0, 50],
            msg: 'Max. caracteres is 50'
          }
        }
      },
      login: {
        type: DataTypes.STRING(6),
        allowNull: false,
        unique: true,
        validate: {
          len: {
            notEmpty: true,
            args: [0, 6],
            msg: 'Max. caracteres is 6'
          }
        }
      },
      cellPhone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      identifier: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: {
          args: true,
          msg: 'Email address already in use!'
        },
        validate: {
          isEmail: {
            msg: 'E-mail invalid!'
          },
          notEmpty: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
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