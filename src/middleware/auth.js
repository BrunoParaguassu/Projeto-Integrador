const logger = require('../config/logger');

const authMiddleware = {
  // Middleware para verificar se o usuário está autenticado
  isAuthenticated: (req, res, next) => {
    if (req.session && req.session.userid) {
      return next();
    }
    req.flash('error', 'Você precisa fazer login para acessar esta página');
    return res.redirect('/login');
  },

  // Middleware para verificar se o usuário é admin
  isAdmin: (req, res, next) => {
    if (req.session && req.session.userid && req.session.userRole === 'admin') {
      return next();
    }
    req.flash('error', 'Acesso negado. Você precisa ser administrador.');
    return res.redirect('/');
  },

  // Middleware para verificar se o usuário NÃO está autenticado (para rotas de login/registro)
  isNotAuthenticated: (req, res, next) => {
    if (!req.session || !req.session.userid) {
      return next();
    }
    return res.redirect('/');
  },

  // Middleware para logging de requisições
  requestLogger: (req, res, next) => {
    logger.info(`${req.method} ${req.url}`, {
      ip: req.ip,
      user: req.session?.userid || 'anonymous',
    });
    next();
  },

  // Middleware para verificar permissões específicas
  hasPermission: (permission) => {
    return (req, res, next) => {
      if (!req.session?.userPermissions?.includes(permission)) {
        req.flash('error', 'Você não tem permissão para acessar este recurso');
        return res.redirect('/');
      }
      next();
    };
  },
};

module.exports = authMiddleware;
