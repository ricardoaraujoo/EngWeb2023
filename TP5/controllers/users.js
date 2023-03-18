var axios = require('axios')

// Tasks List
module.exports.list = () =>{
    return axios.get("http://localhost:3000/users?_sort=name")
        .then(resposta => {
            return resposta.data
        })
        .catch(error => {
            return error
        })
}