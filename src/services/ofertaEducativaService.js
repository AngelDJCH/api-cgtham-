const ofertaeducativaRepository = require('../repository/ofertaEducativaRepository')
const CustomError = require('../midlewares/customError')

const findAlllByIdEscuela = async (id_escuela) => {
    const ofertas = await ofertaeducativaRepository.findAllByIdEscuela(id_escuela)
    return ofertas
}

const create = async (nombre, descripcion, duracion, perfil, id_escuela) => {
    const existeOferta = await ofertaeducativaRepository.existeOfertaByIdOrganizacion(nombre, id_escuela)
    if(existeOferta){
        throw new CustomError(`La oferta educativa ${nombre} ya existe`, 409)
    }
    const oferta = await ofertaeducativaRepository.create(nombre, descripcion, duracion, perfil, id_escuela)
    return oferta
}

module.exports = {findAlllByIdEscuela, create}