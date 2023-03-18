var express = require('express');
var router = express.Router();
var Task = require('../controllers/tasks')
var Users = require('../controllers/users')

/* GET home page. */
router.get('/', function(req, res) {
  var data = new Date().toISOString().substring(0, 16)
  Task.listTask()
    .then(respostaTask =>{
      Users.list()
        .then(respostaUser =>{
          res.render('index', { tlist: respostaTask, ulist: respostaUser ,d: data });
        })

        .catch(erroU =>{
          res.render('error', {error: erroU, message: "Erro na obtenção da lista de Users"})
        })

    })
    .catch(erroT => {
      res.render('error', {error: erroT, message: "Erro na obtenção da lista de tasks"})
    })

router.route("/tasks/edit/:id")
.get((req,res) =>{
  var data = new Date().toISOString().substring(0, 16)
  Task.listTask()
    .then(respostaTask =>{
      Users.list()
        .then(respostaUser =>{
          Task.getTask(req.params.id)
            .then(respostaT =>{
              res.render('index', { tlist: respostaTask, ulist: respostaUser, editP: respostaT ,d: data });
            })
            .catch(erro => {
              res.render('error', {error: erro, message: "Erro na obtenção do registo da task"})
            })
        })

        .catch(erroU =>{
          res.render('error', {error: erroU, message: "Erro na obtenção da lista de Users"})
        })

      })
    .catch(erroT => {
      res.render('error', {error: erroT, message: "Erro na obtenção da lista de tasks"})
    })
})
.post((req,res)=>{
  Task.taskEditUpdate(req.body)
    .then(t =>{
      res.redirect('/')
    })
    .catch(erroU =>{
      res.render('error', {error: erroU, message: "Erro na edição da task"})
    })
})

router.get('/tasks/delete/:id', function(req,res) {
  Task.deleteTask(req.params.id)
  .then(task =>{
    res.redirect('/');
  })
  .catch(erro =>{
    res.render('error', {error: erro, message: "Erro na obtenção do registo do aluno"})
  })
})



//POST METHODS
router.post('/tasks/registo' , (req,res)=>{
  var data = new Date().toISOString().substring(0, 16)
  Task.addTask(req.body)
  .then(task => {
    res.redirect('/')
  })
    .catch(erro =>{
      res.render('error', {error: erro, message: "Erro na armazenação do registo da task"})
    })

})

});

module.exports = router;
