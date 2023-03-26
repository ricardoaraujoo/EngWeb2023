var express = require('express');
var router = express.Router();
var Person = require('../controllers/persons')

/* GET home page. */
router.get('/', function(req, res) {
  Person.list()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(520).json({erro:erro, mensagem:"Não consegui obter a lista de Persons."}))

});

router.get('/persons/:id', function(req, res) {
  Person.getPerson(req.params.id)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(521).json({erro:erro, mensagem:"Não consegui obter a Person."}))
});

router.post('/persons', function(req, res) {
  Person.addPerson(req.body)
    .then(dados => res.status(201).json(dados))
    .catch(erro => res.status(522).json({erro:erro, mensagem:"Não foi possível adicionar a Person."}))
});

router.put('/persons/:id', function(req, res) {
  Person.updatePerson(req.body)
    .then(dados => res.status(202).json(dados))
    .catch(erro => res.status(523).json({erro:erro, mensagem:"Não foi possível update a Person."}))
});

router.delete('/persons/:id', function(req, res) {
  Person.deletePerson(req.params.id)
    .then(dados => res.status(203).json(dados))
    .catch(erro => res.status(524).json({erro : erro, mensagem : "Não foi possível deletar a Person."}))
});

module.exports = router;
