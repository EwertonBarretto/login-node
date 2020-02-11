const pet = (sequelize, DataTypes) => {
    const Pet = sequelize.define('pet', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
              len: {
                notEmpty: true,
                args: [0, 30],
                msg: 'Max. caracteres is 30'
              }
            }
        },
        description: {
          type: DataTypes.STRING(100),
          allowNull: true,
          validate: {
            len: {
              notEmpty: true,
              args: [0, 100],
              msg: 'Max. caracteres is 100'
            }
          }
        },
        breed: {
          type: DataTypes.STRING(30),
          allowNull: true,
          validate: {
            len: {
              notEmpty: true,
              args: [0, 30],
              msg: 'Max. caracteres is 30'
            }
          }
        }             
    });
    Pet.associate = models => {
      Pet.belongsTo(models.User);
    };
    return Pet;
};

module.exports = pet;