const fotoRepository = require('../repository/fotoRepository')
const CustomError = require('../midlewares/customError')

const create = async (url_imagen, id_evento) => {
    const foto = await fotoRepository.create(url_imagen, id_evento)
    return foto;
}

const findByIdEvento = async (id_evento) => {
    const fotos = await fotoRepository.findByIdEvento(id_evento)
    return fotos;
}

const deleteById = async (id) => {
    const foto = await fotoRepository.findById(id)
    if (!foto) {
        throw new CustomError('La fotografía no fue encontrada', 404)
    }

    const totalFotos = await fotoRepository.countByIdEvento(foto.id_evento)
    if (totalFotos <= 1) {
        throw new CustomError('El evento debe conservar al menos una fotografía', 400)
    }

    const fotoEliminada = await fotoRepository.deleteById(id)
    return fotoEliminada;
}

module.exports = { create, findByIdEvento, deleteById }
