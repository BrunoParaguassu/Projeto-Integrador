const bcrypt = require('bcryptjs');
const { User } = require('../models');
const logger = require('../config/logger');

class AuthService {
  async register(userData) {
    try {
      // Verifica se o email já existe
      const existingUser = await User.findOne({
        where: { email: userData.email },
      });
      if (existingUser) {
        throw new Error('Email já cadastrado');
      }

      // Cria o usuário
      const user = await User.create(userData);
      return user;
    } catch (error) {
      logger.error('Erro ao registrar usuário:', error);
      throw error;
    }
  }

  async login(email, password) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const isValidPassword = await user.checkPassword(password);
      if (!isValidPassword) {
        throw new Error('Senha incorreta');
      }

      return user;
    } catch (error) {
      logger.error('Erro ao fazer login:', error);
      throw error;
    }
  }

  async changePassword(userId, currentPassword, newPassword) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const isValidPassword = await user.checkPassword(currentPassword);
      if (!isValidPassword) {
        throw new Error('Senha atual incorreta');
      }

      user.password = newPassword;
      await user.save();

      return true;
    } catch (error) {
      logger.error('Erro ao alterar senha:', error);
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: { exclude: ['password'] },
      });
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
      return user;
    } catch (error) {
      logger.error('Erro ao buscar usuário:', error);
      throw error;
    }
  }
}

module.exports = new AuthService();
