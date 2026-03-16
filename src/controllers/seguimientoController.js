const seguimientoService = require('../services/seguimientoService')

const create = async (req, res) => {
    try {
        const {fecha, id_seguido, id_seguidor} = req.body;
        const seguimiento = await seguimientoService.create(fecha, id_seguido, id_seguidor)
        res.status(201).json(seguimiento.toJSON())
    } catch (error) {
        res.status(400).json(
            {
                messsage: error.messsage
            }
        )
    }
}

const findAllSeguidoresById = async (req, res) => {
    try {
        const id_seguido = req.params.id;
        const seguidores = await seguimientoService.findAllSeguidoresById(id_seguido)
        res.status(200).json(
            seguidores.map(
                seguidor => seguidor.toJSON()
            )
        )
    } catch (error) {
        res.status(404).json(
            {
                messsage: error.messsage
            }
        )
    }
}

const findAllSeguidosById = async (req, res) => {
    try {
        const id_seguidor = req.params.id;
        const seguidos = await seguimientoService.findAllSeguidosById(id_seguidor)
        res.status(200).json(
            seguidos.map(
                seguido => seguido.toJSON()
            )
        )
    } catch (error) {
        res.status(404).json(
            {
                messsage: error.messsage
            }
        )
    }
}


const deleteSeguidorOrSeguido = async (req, res) => {
    try {
        const {id_seguido, id_seguidor} = req.body;
        const eliminado =  await seguimientoService.deleteSeguidorOrSeguido(id_seguido, id_seguidor)
        res.status(204).json(
            {
                message : "Seguimiento eliminado correctamente"
            }
        )
    } catch (error) {
        res.status(400).json(
            {
                messsage: error.messsage
            }
        )
    }
}


module.exports = {create, findAllSeguidoresById, findAllSeguidosById, deleteSeguidorOrSeguido}