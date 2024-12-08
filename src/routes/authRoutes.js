const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isAuthenticated, isNotAuthenticated } = require('../middleware/auth');

// Rotas públicas (não requerem autenticação)
router.get('/login', isNotAuthenticated, authController.loginPage);
router.post('/login', isNotAuthenticated, authController.login);
router.get('/register', isNotAuthenticated, authController.registerPage);
router.post('/register', isNotAuthenticated, authController.register);

// Rotas protegidas (requerem autenticação)
router.get('/logout', isAuthenticated, authController.logout);
router.get(
  '/change-password',
  isAuthenticated,
  authController.changePasswordPage
);
router.post('/change-password', isAuthenticated, authController.changePassword);

module.exports = router;
