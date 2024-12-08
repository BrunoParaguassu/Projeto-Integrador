const request = require('supertest');
const app = require('../server'); // Você precisará exportar o app do server.js

describe('Testes de Autenticação', () => {
  test('Deve retornar 200 ao acessar a página de login', async () => {
    const response = await request(app).get('/login');
    expect(response.statusCode).toBe(200);
  });

  test('Deve retornar erro ao tentar login com credenciais inválidas', async () => {
    const response = await request(app).post('/login').send({
      email: 'teste@teste.com',
      password: 'senhaerrada',
    });
    expect(response.statusCode).toBe(401);
  });
});
