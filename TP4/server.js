var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
const { parse } = require('querystring')

function collectRequestBodyData(req, callback){
    if(req.headers['content-type']== 'application/x-www-form-urlencoded'){
        let body=''
        req.on('data', chunk =>{
            body += chunk.toString()
        })
        req.on('end', () =>{
            callback(parse(body))
        })
    }else {
        callback(null)
    }
}

var server = http.createServer((req,res)=>{

    var d = new Date().toISOString().substring(0,16)
    console.log(req.method + " "+ req.url + " "+ d)

    if(static.staticResource(req)){
        static.serveStaticResource(req,res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /alunos --------------------------------------------------------------------
                if((req.url == "/users") || (req.url == "/") || (req.url == "/tasks")){
                    axios.get("http://localhost:3000/users?_sort=name")
                        .then(response => {
                            var users = response.data

                            axios.get("http://localhost:3000/tasks?_sort=dueDate")
                                .then(response => {
                                    var tasks = response.data
                                    let maxValue=0
                                    tasks.forEach(t =>{
                                       if(t.id > maxValue) maxValue = ++t.id
                                    })
                                    console.log(maxValue)
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end(templates.mainPage(users,tasks,d,maxValue))
                                })
                                .catch((erro)=>{
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Não foi possível obter a lista de tasks... Erro: " + erro)
                                    res.end()
                                })
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de users... Erro: " + erro)
                            res.end()
                        })
                } 
                
                // GET /alunos/edit/:id --------------------------------------------------------------------
                else if(/\/tasks\/edit\/[0-9]+$/i.test(req.url)){
                    var idTask = req.url.split("/")[3]
                    axios.get("http://localhost:3000/users?_sort=name")
                        .then(response => {
                            var users = response.data

                            axios.get("http://localhost:3000/tasks?_sort=dueDate")
                                .then(response => {
                                    var tasks = response.data
                                    let maxValue=0
                                    tasks.forEach(t =>{
                                       if(t.id >= maxValue) maxValue = t.id
                                    })
                                    maxValue++;
                                    var editP
                                    tasks.forEach(t =>{
                                        if(t.id == idTask) editP = t
                                    })
                                    console.log(editP)
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end(templates.mainPage(users,tasks,d,maxValue,editP))
                                })
                                .catch((erro)=>{
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Não foi possível obter a lista de tasks... Erro: " + erro)
                                    res.end()
                                })
                        .catch(erro => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível editar... Erro: " + erro)
                            res.end()
                        })
                    })
                
                }else if(/\/tasks\/delete\/[0-9]+$/i.test(req.url)){
                    var idTask = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/tasks/' + idTask)
                    .then(resp => {
                            console.log(resp.data);
                            res.writeHead(302, {'Content-Type': 'text/html;charset=utf-8', 'Location': '/tasks'});
                            res.end();
                    })
                    .catch(error => {
                            console.log('Erro: ' + error);
                            res.write(`<p>Não foi possível apagar o registo da tarefa ${idTask}... Erro: ${error}`)
                            res.end()
                    })
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " unsupported on this server.</p>")
                    res.end()
                }
                break
            
            case "POST":
                if(req.url == '/tasks/registo'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/tasks', result)
                                .then(resp => {
                                    console.log(resp.data);
                                    res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end('<p>Registo inserido:' + JSON.stringify(resp.data)  + '</p>')
                                })
                                .catch(error => {
                                    console.log('Erro: ' + error);
                                    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Unable to insert record...</p>")
                                    res.end()
                                });
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                }

                else if(/\/tasks\/edit\/registo\/[0-9]+$/i.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if(result){
                            console.dir(result)
                            axios.put('http://localhost:3000/tasks/' + result.id,result)
                                .then(resp => {
                                    console.log(resp.data);
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    // res.write(studentFormPage(d))
                                    res.end('<p>Registo alterado:' + JSON.stringify(resp.data)  + '</p>')
                                })
                                .catch(error => {
                                    console.log('Erro: ' + error);
                                    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Unable to edit record...</p>")
                                    res.end()
                                });
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write('<p>Unsupported POST request: ' + req.url + '</p>')
                    res.write('<p><a href="/">Return</a></p>')
                    res.end()
                }
                break
            
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
})

server.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})
        


















