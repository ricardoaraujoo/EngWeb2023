import json

def ordCidade(c):
    return c['nome']

f=open("mapa.json")
mapa=json.load(f)
cidades = mapa['cidades']
lig = mapa['ligações']

cidades.sort(key=ordCidade)

nomes = {}
for cidade in cidades:
    nomes[cidade['id']] = cidade['nome']

ligacoes = {}
for cidade in cidades:
    ligacoes[cidade['id']] = []


for l in lig:
    ligacoes[l['origem']].append(l)
    ligacoes[l['origem']].sort(key=lambda li : li['distância'])


pagHTML="""
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

for c in cidades:
    pagHTML+= f"""
    <li>
        <a href="#{c['id']}">{c['nome']}</a>
    </li>
    """

pagHTML+="""
                    </ul>
                </td>
                <!-- conteudo -->
                <td>
"""

for c in cidades:
    pagHTML+= f"""
                    <a name="{c['id']}"></a>
                    <h3>{c['nome']}</h3>
                    <p><b>População: </b>{c['população']}</p>
                    <p><b>Descrição: </b>{c['descrição']}</p>
                    <p><b>Distrito: </b>{c['distrito']}</p>
                    <ul>"""

    for l in ligacoes[c['id']]:
        pagHTML+=f"""<li> <a href="#{l['destino']}"> {nomes[l['destino']]}</a>: {l['distância']}Km</li> """
    
                    
    pagHTML+=f"""</ul>
                    <address>[<a href="#indice">[Voltar ao índice]</a>]<address/>
                    <center>
                        <hr width="100%"/>
                    </center>
    """

pagHTML += """
                </td>
            </tr>
        </table>
    </body>
</html>
"""

print(pagHTML)

f.close()