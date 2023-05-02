var express = require('express');
var router = express.Router();
var Exame = require('../controllers/emd')

/* GET home page. */
router.get('/api/emd', function(req, res) {
  Exame.list()
    .then(dados => res.status(200).jsonp(dados))
    .catch(erro => res.status(520).jsonp({erro: erro, mensagem: "Não consegui obter a lista de exames."}))
});

router.get('/api/emd/:id', (req,res) => {
  Exame.getExame(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(erro => res.status(521).jsonp({erro: erro, mensagem: "Não consegui obter o exame."}))
})

router.get('/api/emds/modalidades', (req,res) => {
  Exame.getModalidade()
    .then(dados => res.status(200).jsonp(dados))
    .catch(erro => res.status(521).jsonp({erro: erro, mensagem: "Não consegui obter o exame."}))
})


router.get('/api/emds/emd?res=OK', (req,res) => {
  Exame.getOK()
    .then(dados => res.status(200).jsonp(dados))
    .catch(erro => res.status(521).jsonp({erro: erro, mensagem: "Não consegui obter o exame."}))
})

router.get('/api/emd?modalidade=:X', (req,res) => {
  Exame.getModalidadeX(req.params.X)
    .then(dados => res.status(200).jsonp(dados))
    .catch(erro => res.status(521).jsonp({erro: erro, mensagem: "Não consegui obter o exame."}))
})

router.get('/api/atletas?gen=F', (req,res) => {
  Exame.getF()
    .then(dados => res.status(200).jsonp(dados))
    .catch(erro => res.status(521).jsonp({erro: erro, mensagem: "Não consegui obter o exame."}))
})

router.get('/api/atletas?clube=:X', (req,res) => {
  Exame.getClube(req.params.X)
    .then(dados => res.status(200).jsonp(dados))
    .catch(erro => res.status(521).jsonp({erro: erro, mensagem: "Não consegui obter o exame."}))
})

module.exports = router;
