const authService = require('../services/authService');
const logger = require('../config/logger');

const authController = {
  // Renderiza página de login
  loginPage: (req, res) => {
    res.render('login');
  },

  // Processa o login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await authService.login(email, password);

      // Configura a sessão
      req.session.userid = user.id;
      req.session.userRole = user.role;

      req.flash('success', 'Login realizado com sucesso!');
      res.redirect('/');
    } catch (error) {
      logger.error('Erro no login:', error);
      req.flash('error', error.message);
      res.redirect('/login');
    }
  },

  // Renderiza página de registro
  registerPage: (req, res) => {
    res.render('register');
  },

  // Processa o registro
  register: async (req, res) => {
    try {
      const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };

      await authService.register(userData);

      req.flash(
        'success',
        'Cadastro realizado com sucesso! Faça login para continuar.'
      );
      res.redirect('/login');
    } catch (error) {
      logger.error('Erro no registro:', error);
      req.flash('error', error.message);
      res.redirect('/register');
    }
  },

  // Processa o logout
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        logger.error('Erro ao fazer logout:', err);
        req.flash('error', 'Erro ao fazer logout');
        return res.redirect('/');
      }
      res.redirect('/login');
    });
  },

  // Renderiza página de alteração de senha
  changePasswordPage: (req, res) => {
    res.render('change-password');
  },

  // Processa alteração de senha
  changePassword: async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      await authService.changePassword(
        req.session.userid,
        currentPassword,
        newPassword
      );

      req.flash('success', 'Senha alterada com sucesso!');
      res.redirect('/profile');
    } catch (error) {
      logger.error('Erro na alteração de senha:', error);
      req.flash('error', error.message);
      res.redirect('/change-password');
    }
  },
};

module.exports = authController;
