//mypages.js
//2023-03-03 by jcr
// HTML templates generating functions

exports.genMainPage = function(pessoas,date){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title> About People</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
                <div class="w3-card-4">
                    <header class="w3-container w3-purple">
                        <h1>Lista de Pessoas</h1>
                    </header>

                    <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Sexo</th>
                            <th>Cidade</th>
                        </tr>            

                `
    for(let i=0; i< pessoas.length;i++){
        pagHTML +=`
        <tr>
            <td>${pessoas[i].id}</td>
            <td>
            <a href="/pessoas/${pessoas[i].id}">${pessoas[i].nome}</a>
            </td>
            <td>${pessoas[i].idade}</td>
            <td>${pessoas[i].sexo}</td>
            <td>${pessoas[i].morada.cidade}</td>
        </tr>
        `
    }

    pagHTML +=`               
                    </table>
                </div>
                    <footer class="w3-container w3-blue">
                        <h5> Generated in EngWeb2023 ${date} </h5>
                    </footer>
                </div>
            </body>
        </html>
    `
    return pagHTML
}

exports.genPersonPage = (p,d) =>{
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title> Person Page</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
                <div class="w3-card-4">
                    <header class="w3-container w3-purple">
                        <h1>${p.nome}</h1>
                    </header>

                <div class="container">
                    <p>Preencher com os outros campos...</p>
                </div>

                    <footer class="w3-container w3-blue">
                        <h5> Generated in EngWeb2023 ${d} </h5>
                    </footer>
                </div>
            </body>
        </html>
                `
return pagHTML
}

exports.genSexoPage = (m,f,o,d) =>{

    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title> Person Page</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
                <div class="w3-card-4">
                    <header class="w3-container w3-purple">
                        <h1>Número de Pessoas</h1>
                    </header>

                    <div class="container">
                        <table class="w3-table-all">
                            <tr>
                                <th> Masculino </th>
                                <th> Feminino </th>
                                <th> Outro </th>
                            </tr>
                            <tr>
                                <td> <a href="/pessoas/sexo/masculino"> ${m} </a></td>
                                <td> <a href="/pessoas/sexo/feminino"> ${f} </a></td>
                                <td> <a href="/pessoas/sexo/outro"> ${o} </a></td>
                            </tr>
                        </table>
                    </div>

                    <footer class="w3-container w3-blue">
                        <h5> Generated in EngWeb2023 ${d} </h5>
                    </footer>
                </div>
            </body>
        </html>
                `
    return pagHTML
}
exports.genDesportoPage = (desportos,d) =>{
        var pagHTML = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8"/>
                <title> Person Page</title>
                <link rel="stylesheet" type="text/css" href="w3.css"/>
            </head>
            <body>
                    <div class="w3-card-4">
                        <header class="w3-container w3-purple">
                            <h1>Número de Pessoas</h1>
                        </header>
    
                        <div class="container">
                            <table class="w3-table-all">
                                <tr>
                                `
for(let key in desportos){
        pagHTML +=`
            <th>${key}</th>
        `
    }                     
pagHTML += `
                                </tr>
                                <tr>`
for(let key in desportos){
    pagHTML +=
    `    
    <td> <a href="/pessoas/desportos/${key}"> ${desportos[key]} </a></td>
    `
    }    
pagHTML += `                    </tr>
                            </table>
                        </div>
                        <footer class="w3-container w3-blue">
                            <h5> Generated in EngWeb2023 ${d} </h5>
                        </footer>
                    </div>
                </body>
            </html>
`
        return pagHTML
}

exports.genWorkPage = function(lista)
{
	var dist = {}
	
	for (let i = 0 ; i<lista.length ; i++)
	{
		let pessoa = lista[i]
		let profissao = pessoa.profissao
		if (dist[profissao] == undefined)
		{
			dist[profissao] = 0
		}
		dist[profissao]++
	}

	pagHTML = `
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8"/>
			<title>TPC3 - Top 10 Profissões</title>
			<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
		</head>
		<body>
			<div class="w3-card">
				<header class="w3-container w3-deep-purple w3-xlarge">
					<h1>Top 10 Profissões</h1>
				</header>	
				<table class="w3-table-all w3-hoverable">
					<tr>
						<th>Profissão</th>
						<th>Número de Pessoas</th>
					</tr>`

	Object.keys(dist).forEach( (key) => {
		pagHTML += `
						<tr>
							<td>${key}</td>
							<td>
								<a href="http://localhost:12345/pessoas/profissoes/${key}">
									${dist[key]}
								</a>
							</td>
						</tr>
		`
	})

	pagHTML += `
				</table>
				<a href="http://localhost:12345">
					<p class="w3-centered">Voltar ao Índice</p>
				</a>
				<footer class="w3-container w3-deep-purple">
					<h5>Generated by the server</h5>
				</footer>
			</div>
		</body>
	</html>
	`

	return pagHTML
}