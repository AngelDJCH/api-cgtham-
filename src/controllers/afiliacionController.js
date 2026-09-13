const afiliacionService = require('../services/afiliacionService')

const create = async (req, res, next) => {
    try{
        const {id_empresa, id_camara} = req.body
        const afiliacion = await afiliacionService.create(id_empresa, id_camara)
        res.status(201).json(
            afiliacion
        )
    }catch(error){
        next(error)
    }
}

const findByIdEmpresa = async (req, res, next) => {
    try {
        const id_empresa = req.params.id_empresa
        const afiliaciones = await afiliacionService.findByIdEmpresa(id_empresa)
        res.status(200).json(afiliaciones)
    } catch (error) {
        next(error)
    }
}

module.exports = {create,findByIdEmpresa}