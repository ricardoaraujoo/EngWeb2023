var axios = require('axios')

// Tasks List
module.exports.listTask = () =>{
    return axios.get('http://localhost:3000/tasks?_sort=dueDate')
        .then(resposta => {
            return resposta.data
        })
        .catch(error => {
            return error
        })
}


module.exports.addTask = t => {
    return axios.post('http://localhost:3000/tasks' ,t)
    .then(resposta => {
        return resposta.data
    })
    .catch(erro => {
        return erro
    })
}

module.exports.getTask = id => {
    return axios.get('http://localhost:3000/tasks/'+id)
        .then(resposta => {
            return resposta.data
        })
        .catch(error => {
            return error
        })
}

module.exports.deleteTask = id => {
    return axios.delete('http://localhost:3000/tasks/'+id)
        .then(resposta => {
            return resposta.data
        })
        .catch(error => {
            return error
        })
}

module.exports.taskEditUpdate = t => {
    return axios.put('http://localhost:3000/tasks/'+t.id, t)
        .then(resposta => {
            return resposta.data
        })
        .catch(error => {
            return error
        })
}