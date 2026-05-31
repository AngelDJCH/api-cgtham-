const ofertaeducativaService = require('../services/ofertaEducativaService')

const findAllByIdEscuela = async (req, res) => {
    try {
        const id = req.params.id
        const ofertas = await ofertaeducativaService.findAlllByIdEscuela(id)
        res.status(200).json(ofertas)
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

module.exports = {findAllByIdEscuela}