require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const flash = require('express-flash');
const conn = require('./db/conn');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const logger = require('./src/config/logger');
const securityMiddleware = require('./src/middleware/security');

const app = express();

// Aplicar middlewares de segurança
securityMiddleware(app);

app.engine(
  'handlebars',
  exphbs.engine({ extname: 'handlebars', defaultLayout: 'layout.handlebars' })
);
app.set('view engine', 'handlebars');

/* Ler o body */
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(express.static('public'));

//session middleware
app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.EXSS_PASSWORD || 'uma_senha_secreta_muito_forte',
    saveUninitialized: false,
    resave: false,
    store: new fileStore({
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),

    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      httpOnly: true,
      sameSite: 'strict',
    },
  })
);

// flash messages
app.use(flash());

//set session

app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }
  next();
});

/* import routes */
const router = require('./src/routes/router');

/* routes */
app.use('/', router);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).render('error', {
    message: 'Algo deu errado!',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

/* start server */
conn
  .sync()
  //.sync({force: true}) //Não tirar o comentário pois irá apagar e recriar o banco de dados!!!!!
  .then(() => {
    app.listen(process.env.PORT, () => {
      logger.info(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    logger.error('Failed to start server:', err);
  });
