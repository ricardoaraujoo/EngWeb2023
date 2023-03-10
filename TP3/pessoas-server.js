var http = require('http')
const axios = require('axios')
var mypages = require('./mypages')
var fs = require('fs')
const XRegExp = require('xregexp');

http.createServer((req,res)=>{
    var d = new Date().toISOString().substring(0,16)
    console.log(req.method + " " + req.url+ "" + d)
    var reg = XRegExp(/\/pessoas\/desportos\/(.+)/u)
    var regDesporto = (XRegExp.exec(req.url,reg))

    if(req.url == '/pessoas'){
        
    axios.get('http://localhost:3000/pessoas')
    .then(function(resp){
        var pessoas = resp.data
        res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
        res.end(mypages.genMainPage(pessoas, d))
    })
    .catch(erro => {
        console.log("Erro: " + erro)
        res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
        res.end('<p> Erro na obtenção de dados: ' + erro + '</p>')

    })
    }else if(req.url == '/pessoasOrdenadas'){
        
        axios.get('http://localhost:3000/pessoas?_sort=nome')
        .then(function(resp){
            var pessoas = resp.data
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
            res.end(mypages.genMainPage(pessoas, d))
        })
        .catch(erro => {
            console.log("Erro: " + erro)
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
            res.end('<p> Erro na obtenção de dados: ' + erro + '</p>')
    
        })   
    }
    else if(req.url.match(/\/pessoas\/p\d+/)){
        axios.get('http://localhost:3000/pessoas/'+ req.url.substring(9))
        .then(function(resp){
            var pessoa = resp.data
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
            res.end(mypages.genPersonPage(pessoa, d))
        })
        .catch(erro => {
            console.log("Erro: " + erro)
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
            res.end('<p> Erro na obtenção de dados: ' + erro + '</p>')
    
        })
    }
    
    else if(req.url.match(/w3\.css$/)){
        fs.readFile("w3.css", function(erro,dados){
        if(erro){
            res.writeHead(404,{'Content-Type': 'text/html; charset=utf-8'})
            res.end('<p> Erro na leitura do ficheiro: ' + erro + '</p>')
        }else{
            res.writeHead(200,{'Content-Type': 'text/css'})
            res.end(dados)
        }
        })
    }else if(req.url == '/pessoas/sexo'){
        
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data
            var m=0
            var f=0
            var o=0
            for(let i=0;i<pessoas.length;i++){
                if(pessoas[i].sexo=="feminino"){f++} 
                else if(pessoas[i].sexo=="masculino"){m++}
                else o++
            }

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
            res.end(mypages.genSexoPage(m,f,o, d))
        })
        .catch(erro => {
            console.log("Erro: " + erro)
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
            res.end('<p> Erro na obtenção de dados: ' + erro + '</p>')
    
        })
    }else if(req.url == '/pessoas/sexo/masculino'){
        
            axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
                var pessoas = resp.data
    
                for(let i=0;i<pessoas.length;i++){
                    if(pessoas[i].sexo=="feminino" || pessoas[i].sexo=="outro" ){
                        pessoas.splice(i,1)
                        i--
                    } 
                }
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genMainPage(pessoas, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p> Erro na obtenção de dados: ' + erro + '</p>')
        
            })
    }else if(req.url == '/pessoas/sexo/feminino'){
        
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data

            for(let i=0;i<pessoas.length;i++){
                if(pessoas[i].sexo == "masculino" || pessoas[i].sexo == "outro"){
                    pessoas.splice(i,1)
                    i--
                } 
            }
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
            res.end(mypages.genMainPage(pessoas, d))
        })
        .catch(erro => {
            console.log("Erro: " + erro)
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
            res.end('<p> Erro na obtenção de dados: ' + erro + '</p>')

    })
    }else if(req.url == '/pessoas/sexo/outro'){
        
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data

            for(let i=0;i<pessoas.length;i++){
                if(pessoas[i].sexo=="feminino" || pessoas[i].sexo=="masculino" ){
                    pessoas.splice(i,1)
                    i--
                } 
            }
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
            res.end(mypages.genMainPage(pessoas, d))
        })
        .catch(erro => {
            console.log("Erro: " + erro)
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
            res.end('<p> Erro na obtenção de dados: ' + erro + '</p>')
    
        })
    }else if(req.url == '/pessoas/desportos'){
     
     axios.get('http://localhost:3000/pessoas')
     .then(function(resp){
         var pessoas = resp.data
         var desportos = {}

         for(let i=0;i<pessoas.length;i++){
            let p = pessoas[i].desportos
            for(let j=0;j<p.length;j++){
                if(p[j] in desportos ){
                    desportos[p[j]] +=1
                }else{

                    desportos[p[j]] = 1
                }
            }
            j=0

         }

         res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
         res.end(mypages.genDesportoPage(desportos, d))
     })
     .catch(erro => {
         console.log("Erro: " + erro)
         res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
         res.end('<p> Erro na obtenção de dados: ' + erro + '</p>')

     })
     //  else if(req.url.match(/\/pessoas\/p\d+/)){
       // axios.get('http://localhost:3000/pessoas/'+ req.url.substring(9))
       //           req.url.match(/\/pessoas\/desportos\/)
    }else if(regDesporto){
     
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data
            var flag = 1
            var reggroup = decodeURI(req.url.substring(19))
            for(let i=0;i<pessoas.length;i++){
                let p = pessoas[i].desportos
                for(let j=0;j<p.length;j++){
                    if(p[j]== reggroup){
                        flag = 0
                    }
                }
                if(flag){
                    pessoas.splice(i,1)
                    i--
                }
                flag=1
            }

            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
            res.end(mypages.genMainPage(pessoas, d))
        })
        .catch(erro => {
            console.log("Erro: " + erro)
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
            res.end('<p> Erro na obtenção de dados: ' + erro + '</p>')
   
        })
       }else if (req.url == "/pessoas/profissoes"){
           axios.get('http://localhost:3000/pessoas')
               .then((resp) => {
                   var pessoas = resp.data
                   
                   res.writeHead(200, {'Content-Type':'text/html; charset="utf-8"'})
                   res.end(my_pages.genWorkPage(pessoas))
               })
               .catch( (error) => {
                   res.writeHead(404, {'Contet-Type': 'text/html; charset="utf-8"'})
                   res.end("<p>ERRO:T Não foi possível aceder à Base de Dados</p>")
               })
       }else if (req.url.match(/pessoas\/profissoes\/.+/)){
           axios.get('http://localhost:3000/pessoas')
               .then( (resp) => {
                   var pessoas = resp.data
                   let profissao = decodeURI(pedido.substring(20))
   
                   var pessoasFiltrado = pessoas.filter( (p) => p.profissao==profissao)
   
                   res.writeHead(200, {'Content-Type':'text/html; charset="utf-8"'})
                   res.end(my_pages.genMainPage(pessoasFiltrado, d))
               })
               .catch( (error) => {
                   res.writeHead(404, {'Contet-Type': 'text/html; charset="utf-8"'})
                   res.end("<p>ERRO: Não foi possível aceder à Base de Dados</p>")
               })
       }        


    else{
        res.writeHead(404,{'Content-Type': 'text/html; charset=utf-8'})
        res.end('<p> Operação não suportada: ' + req.url + '</p>')
    }

}).listen(7777)

console.log('Servidor a escuta na porta 7777')