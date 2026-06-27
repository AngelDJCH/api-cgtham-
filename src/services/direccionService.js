const direccionRepository = require("../repository/direccionRepository")

const create = async (calle, numero, colonia, codigo_postal, ciudad, estado, pais) => {
    const direccion = await direccionRepository.create(calle, numero, colonia, codigo_postal, ciudad, estado, pais)
    return direccion;
}

const findById = async (id) => {
    const direccion = await direccionRepository.findById(id);
    return direccion;
}

const updateById = async (id, calle, numero, colonia, codigo_postal, ciudad, estado, pais) => {
    const direccion = await direccionRepository.updateById(id, calle, numero, colonia, codigo_postal, ciudad, estado, pais)
    return direccion;
}

const deleteById = async (id) => {
    const result = await direccionRepository.deleteById(id)
    return result
}

module.exports = { create, findById, updateById, deleteById }