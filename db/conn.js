require('dotenv').config();
const { Sequelize } = require('sequelize');
const logger = require('../src/config/logger');

// Log das variáveis de ambiente (sem a senha)
logger.debug('Configurações do banco de dados:', {
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});

const conn = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: (msg) => logger.debug(msg),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Teste de conexão
conn
  .authenticate()
  .then(() => {
    logger.info('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch((err) => {
    logger.error('Erro ao conectar com o banco de dados:', err);
  });

module.exports = conn;
