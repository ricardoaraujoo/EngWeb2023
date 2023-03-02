import json

f=open("mapa.json")
mapa= json.load(f)
cidades = mapa['cidades']
lig = mapa['ligações']

cidades.sort(key=lambda cidade : cidade['nome'])

nomes = {}
for cidade in cidades:
    nomes[cidade['id']] = cidade['nome']

ligacoes = {}
for cidade in cidades:
    ligacoes[cidade['id']] = []


for l in lig:
    ligacoes[l['origem']].append(l)
    ligacoes[l['origem']].sort(key=lambda li : li['distância'])

dicPaginas = {}
for c in cidades:
    dicPaginas[c['nome']] = ""

distrito = {}
for cidade in cidades:
    if cidade['distrito'] in distrito:
       distrito[cidade['distrito']].append(cidade)
    else: 
        distrito[cidade['distrito']] = []
        distrito[cidade['distrito']].append(cidade)


pagIndex="""
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <center>
            <h1>Mapa Virtual</h1>
        </center>
        <table>
            <tr>
                <!-- Índice -->
                <td valign="top" width="15%">
                    <a name="indice"/>
                    <h3>Índice</h3>
                    <ul>
"""

for key in sorted(distrito.keys()):
    pagIndex += f"""
    <li>
        Distrito: {key}
        <ul>
    """
    for valor in distrito[key]:

        pagIndex+= f"""
        <li>
            <a href="http://localhost:7777/{valor['id']}">{valor['nome']}</a>
        </li>
        """

    pagIndex += f"""
        </ul>
    </li>
    """

pagIndex+="""
                    </ul>
                </td>
                <!-- conteudo -->
                <td>
"""

pagIndex += """
                </td>
            </tr>
        </table>
    </body>
</html>
"""




with open("index.html","w") as fileO:
    fileO.write(pagIndex)

for c in cidades:
    pagCidade="""
    <!DOCTYPE html>
    <html>
        <head>
            <title>Mapa Virtual</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <center>
                <h1>Mapa Virtual</h1>
            </center>
            <table>
                <tr>
                    <td>
    """
    pagCidade+= f"""
                    <a name="{c['id']}"></a>
                    <h3>{c['nome']}</h3>
                    <p><b>População: </b>{c['população']}</p>
                    <p><b>Descrição: </b>{c['descrição']}</p>
                    <p><b>Distrito: </b>{c['distrito']}</p>
                    <ul>"""

    for l in ligacoes[c['id']]:
        pagCidade+=f"""<li> <a href="http://localhost:7777/{l['destino']}"> {nomes[l['destino']]}</a>: {l['distância']}Km</li> """
    
    pagCidade+=f"""</ul>
                    <address>[<a href="http://localhost:7777/">[Voltar ao índice]</a>]<address/>
                    <center>
                        <hr width="100%"/>
                    </center>
    """

    pagCidade += """
                </td>
            </tr>
        </table>
    </body>
</html>
"""
    with open(f"{c['id']}.html","w") as fileOb:
        fileOb.write(pagCidade)





f.close()