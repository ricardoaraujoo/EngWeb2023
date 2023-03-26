import json
import requests
url = 'http://localhost:7777/persons'

with open("persons.js",'r') as f:
    data = json.load(f)
    pessoas = data['pessoas']

for person in pessoas:

    response = requests.post(url, json=person)

    print(response.status_code)
    print(response.json())