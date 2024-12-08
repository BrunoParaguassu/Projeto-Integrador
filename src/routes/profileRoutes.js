const express = require('express');
const router = express.Router();
const views = require('../controller/ControllerView');
const form = require('../controller/ControllerForm');

// Rotas do perfil do usuário
router.get('/', (req, res) => {
    res.render('profile/index', {
        title: 'Meu Perfil',
        user: req.session.user
    });
});

// Pedidos do usuário
router.get('/pedidos', views.meuPedidoView);
router.get('/pedidos/:id', views.meuPedidoView);

// Feedback e avaliações
router.get('/feedback', views.feedback);
router.post('/feedback', form.feedbackAvaliacao);

module.exports = router;
