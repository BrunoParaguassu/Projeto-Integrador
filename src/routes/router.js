const express = require('express');
const router = express.Router();
const views = require('../controller/ControllerView');
const form = require('../controller/ControllerForm');
const auth = require('../controller/ControllerAuth');
const checkAuth = require('../helpers/auth').checkAuth;
const checkAuthAdm = require('../helpers/authAdmin').checkAuthAdm;
const { isAuthenticated, isAdmin, requestLogger } = require('../middleware/auth');

// Middleware de logging para todas as rotas
router.use(requestLogger);

// Rotas públicas
router.get('/', views.home);
router.get('/sejaFranqueado', views.sejaFranqueado);
router.post('/sejaFranqueado', form.sejaFranqueado);
router.get('/produtosLista', views.produtosLista);

// Rotas de autenticação
router.get('/cadastroUsuario', views.cadastroUsuario);
router.post('/cadastroUsuario', auth.register);
router.get('/login', views.acessoUsuario);
router.post('/login', auth.login);
router.get('/logout', auth.logout);
router.get('/recuperarSenha', views.recuperarSenha);
router.post('/recuperarEmail', auth.recuperar);

// Rotas de administração
router.get('/admin', views.acessoAdmin);
router.get('/admin/login', views.acessoAdmin);
router.post('/admin/login', auth.adminLogin);
router.get('/logoutAdmin', auth.logoutAdm);
router.get('/registeruser', auth.registerAdmin);
router.post('/registeruser', auth.registerAdmin);

// Rotas protegidas do usuário
router.get('/realizePedido', checkAuth, views.realizePedido);
router.post('/realizePedido', checkAuth, form.realizePedido);
router.get('/meu-pedido', checkAuth, views.meuPedidoView);
router.get('/meu-pedido/:id', checkAuth, views.meuPedidoView);
router.get('/pedido-realizado/:id', checkAuth, views.pedRealizadoView);
router.get('/feedback', checkAuth, views.feedback);
router.post('/feedback/avaliacao', checkAuth, form.feedbackAvaliacao);

// Rotas de pagamento
router.get('/finalizarCompra/:id', views.finalizarCompra);
router.get('/pagamentocredito/:id', views.pagamentocredito);
router.post('/pagamentoCredito', form.pagamentoCredito);
router.get('/pagamentopix/:id', views.pagamentopix);
router.post('/pagamentopix', form.PagamentoPix);
router.post('/statusPagamentos', form.statusPagamento);

// Rotas protegidas do admin
router.get('/cadastroProduto', checkAuthAdm, views.cadastroProduto);
router.get('/admin/ordem-do-pedido/:id', checkAuthAdm, views.admOrderView);
router.post('/admin/criar-produto', checkAuthAdm, form.admCreate);
router.get('/admin/listaPedidos', checkAuthAdm, views.listaPedidos);
router.get('/del-produto/:id', views.deletarProduto);
router.get('/del-pedido/:id', views.deletarPedido);
router.get('/editar-produto/:id', views.editarProdutoView);
router.post('/editar-produto/', form.editarProduto);

router.use('/admin', isAdmin, require('./adminRoutes'));
router.use('/profile', isAuthenticated, require('./profileRoutes'));

// Tratamento de erro 404
router.use((req, res) => {
    res.status(404).render('404', {
        message: 'Página não encontrada'
    });
});

module.exports = router;
