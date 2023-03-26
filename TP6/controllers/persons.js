var Person = require('../models/persons')

module.exports.list = () => {
    return Person.find()
        .sort({_id:1})
        .then(dados => {
            return dados
        })
        .catch(erro =>{
            return erro
        })
}

module.exports.getPerson = id => {
    return Person.findOne({_id:id})
        .then(dados => {
            return dados
        })
        .catch(erro =>{
            return erro
        })
}

module.exports.addPerson = e => {
    return Person.create(e)
        .then(dados => {
            return dados
        })
        .catch(erro =>{
            return erro
        })
}

module.exports.updatePerson = e => {
    return Person.updateOne({_id:e._id},e)
        .then(dados => {
            return dados
        })
        .catch(erro =>{
            return erro
        })
}

module.exports.deletePerson = id => {
    return Person.deleteOne({_id:id})
        .then(dados => {
            return dados
        })
        .catch(erro =>{
            return erro
        })
}