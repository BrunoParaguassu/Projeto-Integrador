const { DataTypes } = require('sequelize');
const sequelize = require('../../db/conn');
const User = require('./User');
const Product = require('./Product');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'completed', 'cancelled'),
    defaultValue: 'pending',
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: {
        msg: 'O valor total deve ser um número válido',
      },
      min: {
        args: [0],
        msg: 'O valor total não pode ser negativo',
      },
    },
  },
});

// Relacionamentos
Order.belongsTo(User);
User.hasMany(Order);

// Tabela intermediária para produtos do pedido
const OrderProduct = sequelize.define('OrderProduct', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

module.exports = {
  Order,
  OrderProduct,
};
