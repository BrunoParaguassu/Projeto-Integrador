# 🍕 Pizza-Thru

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
![Node](https://img.shields.io/badge/node-%3E%3D%2014.0.0-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

> Sistema web de gerenciamento de pedidos para pizzaria com funcionalidades avançadas de personalização e pagamento online.

## ✨ Funcionalidades

- 🔐 **Autenticação Segura**
  - Login e registro de usuários
  - Proteção de rotas
  - Gerenciamento de sessões

- 🛒 **Pedidos**
  - Monte sua própria pizza
  - Personalização de massa e ingredientes
  - Acompanhamento em tempo real do status
  - Histórico de pedidos

- 💳 **Pagamentos**
  - Integração com Mercado Pago
  - Cartão de crédito
  - PIX
  - Gestão de transações

- 👥 **Área Administrativa**
  - Gestão de produtos
  - Controle de pedidos
  - Relatórios
  - Gerenciamento de usuários

## 🚀 Tecnologias

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Sequelize ORM](https://sequelize.org/)

### Frontend
- [Handlebars](https://handlebarsjs.com/)
- [CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

### Segurança
- [bcryptjs](https://github.com/kelektiv/node.bcrypt.js)
- [express-session](https://www.npmjs.com/package/express-session)
- [cookie-session](https://expressjs.com/en/resources/middleware/cookie-session.html)

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Pizza-Thru/Projeto-Integrador.git
cd Projeto-Integrador
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`
   - Preencha as variáveis com suas configurações

```env
PORT=3000
DB_DATABASE=pizza_thru
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_DIALECT=mysql
SESSION_NAME=pizza_thru_session
EXSS_PASSWORD=sua_senha_secreta
MERCADO_PAGO_ACCESS_TOKEN=seu_token
```

4. Inicie o servidor:
```bash
npm start
```

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais
- `users`: Informações dos usuários
- `products`: Catálogo de produtos
- `orders`: Pedidos realizados
- `order_items`: Itens de cada pedido

## 👥 Time

| <img src="https://github.com/BrunoParaguassu.png" width="100px"/> | <img src="https://github.com/rekiell.png" width="100px"/> | <img src="https://github.com/PauloFreireRibeiro.png" width="100px"/> |
|:---:|:---:|:---:|
| [Bruno Paragassú](https://github.com/BrunoParaguassu) | [Gabriel Majewski](https://github.com/rekiell) | [Paulo Freire](https://github.com/PauloFreireRibeiro) |
| Backend | Frontend | Full Stack |

| <img src="https://github.com/AyllaDuarte.png" width="100px"/> | <img src="https://github.com/GuilhermeVenturim.png" width="100px"/> | <img src="https://github.com/fflaviacastro.png" width="100px"/> |
|:---:|:---:|:---:|
| [Aylla Duarte](https://github.com/AyllaDuarte) | [Guilherme Venturim](https://github.com/GuilhermeVenturim) | [Flavia Castro](https://github.com/fflaviacastro) |
| Frontend | Backend | UI/UX |

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuições

Contribuições, issues e pedidos de features são bem-vindos!
Sinta-se à vontade para verificar a [página de issues](https://github.com/Pizza-Thru/Projeto-Integrador/issues).

## 📫 Contato

Para sugestões, dúvidas ou feedbacks, por favor entre em contato através de:
- Email: pizzathru@email.com
- Issues: [GitHub Issues](https://github.com/Pizza-Thru/Projeto-Integrador/issues)

## 🙏 Agradecimentos

- À Digital House pela oportunidade e suporte durante o desenvolvimento
- Aos professores Willian e Awnar pelo excelente trabalho e dedicação
- A todos os familiares e amigos que nos apoiaram nesta jornada

---
Feito com ❤️ pelo time Pizza-Thru
