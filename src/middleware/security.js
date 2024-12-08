const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 requisições por IP
});

const securityMiddleware = (app) => {
  // Proteção contra ataques comuns
  app.use(helmet());

  // Compressão gzip
  app.use(compression());

  // Rate limiting
  app.use('/api/', limiter);

  // Adiciona headers de segurança
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });
};

module.exports = securityMiddleware;
