const direccionRepository = require("../repository/direccionRepository")

const create = async (calle, numero, colonia, codigo_postal, ciudad, estado, pais) => {
    const direccion = await direccionRepository.create(calle, numero, colonia, codigo_postal, ciudad, estado, pais)
    return direccion;
}

const findById = async (id) => {
    const direccion = await direccionRepository.findById(id);
}

const updateById = async (id, calle, numero, colonia, codigo_postal, ciudad, estado, pais) => {
    const direccion = await direccionRepository.updateById(id, calle, numero, colonia, codigo_postal, ciudad, estado, pais)
    return direccion;
}

module.exports = { create, findById, updateById }