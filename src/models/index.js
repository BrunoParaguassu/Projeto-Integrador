const User = require('./User');
const Product = require('./Product');
const { Order, OrderProduct } = require('./Order');

// Exporta todos os modelos
module.exports = {
  User,
  Product,
  Order,
  OrderProduct,
};
