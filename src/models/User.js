const { DataTypes } = require('sequelize');
const sequelize = require('../../db/conn');
const bcrypt = require('bcryptjs');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'O nome é obrigatório',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Este email já está cadastrado',
      },
      validate: {
        isEmail: {
          msg: 'Email inválido',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

// Método para verificar senha
User.prototype.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;
