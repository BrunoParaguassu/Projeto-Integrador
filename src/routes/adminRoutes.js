const express = require('express');
const router = express.Router();
const views = require('../controller/ControllerView');
const form = require('../controller/ControllerForm');
const { checkAuthAdm } = require('../helpers/authAdmin');

// Middleware de autenticação admin para todas as rotas
router.use(checkAuthAdm);

// Rotas de administração
router.get('/dashboard', (req, res) => {
    res.render('admin/dashboard', {
        title: 'Dashboard Administrativo',
        user: req.session.user,
        layout: 'admin'
    });
});

// Lista de pedidos
router.get('/pedidos', views.listaPedidos);

// Gerenciamento de produtos
router.get('/produtos', views.produtosLista);
router.get('/produtos/novo', views.cadastroProduto);
router.post('/produtos/novo', form.admCreate);
router.get('/produtos/editar/:id', views.editarProdutoView);
router.post('/produtos/editar', form.editarProduto);
router.get('/produtos/deletar/:id', views.deletarProduto);

// Gerenciamento de pedidos
router.get('/pedidos/:id', views.admOrderView);
router.get('/pedidos/deletar/:id', views.deletarPedido);

// Relatórios e estatísticas
router.get('/relatorios', (req, res) => {
    res.render('admin/relatorios', {
        title: 'Relatórios',
        user: req.session.user,
        layout: 'admin'
    });
});

module.exports = router;
