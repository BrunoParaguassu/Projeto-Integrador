const { DataTypes } = require('sequelize');
const sequelize = require('../../db/conn');

const Product = sequelize.define('Product', {
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
        msg: 'O nome do produto é obrigatório',
      },
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: {
        msg: 'O preço deve ser um número válido',
      },
      min: {
        args: [0],
        msg: 'O preço não pode ser negativo',
      },
    },
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      isInt: {
        msg: 'A quantidade em estoque deve ser um número inteiro',
      },
      min: {
        args: [0],
        msg: 'A quantidade em estoque não pode ser negativa',
      },
    },
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Product;
