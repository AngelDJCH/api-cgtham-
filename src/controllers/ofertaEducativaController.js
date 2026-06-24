const ofertaeducativaService = require('../services/ofertaEducativaService')

const findAllByIdEscuela = async (req, res,next) => {
    try {
        const id = req.params.id
        const ofertas = await ofertaeducativaService.findAlllByIdEscuela(id)
        res.status(200).json(ofertas)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const {nombre, descripcion, duracion, perfil, id_escuela} = req.body
        const oferta = await ofertaeducativaService.create(nombre, descripcion, duracion, perfil, id_escuela)
        res.status(201).json(oferta)
    } catch (error) {
        next(error)
    }
}

module.exports = {findAllByIdEscuela,create}