const ofertaeducativaRepository = require('../repository/ofertaEducativaRepository')

const findAlllByIdEscuela = async (id_escuela) => {
    const ofertas = await ofertaeducativaRepository.findAllByIdEscuela(id_escuela)
    return ofertas
}

module.exports = {findAlllByIdEscuela}