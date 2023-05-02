var Exame = require('../models/exame')

// Exame list
module.exports.list = () => {
    return Exame
            .find({},'id nome dataEMD resultado')
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getExame = id => {
    return Exame.findOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getModalidade = () => {
    return Exame.distinct('modalidade')
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getModalidadeX = x => {
    return Exame.find({modalidade:x})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getOK = () => {
    return Exame.find({resultado:true})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getF = () => {
    return Exame.find({género:'F'})
            .sort('primeiro')
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getClube = X => {
    return Exame.find({clube:X})
            .sort('primeiro')
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}