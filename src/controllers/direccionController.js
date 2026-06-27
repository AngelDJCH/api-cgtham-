const direccionService = require("../services/direccionService")

const create = async (req, res,next) => {
    try {
        const {calle, numero, colonia, codigo_postal, ciudad, estado, pais} = req.body;
        const direccion = await direccionService.create(calle, numero, colonia, codigo_postal, ciudad, estado, pais);
        res.status(201).json(direccion.toJSON());
    } catch (error) {
        next(error)
    }
}

const findById = async (req, res,next) => {
    try {
        const id = req.params.id
        const direccion = await direccionService.findById(id)
        res.status(200).json(direccion.toJSON())
    } catch (error) {
        next(error)
    }
}

const updateById = async (req, res,next) => {
    try {
        const id =  req.params.id;
        const {calle, numero, colonia, codigo_postal, ciudad, estado, pais} = req.body;
        const direccion = await direccionService.updateById(id, calle, numero, colonia, codigo_postal, ciudad, estado, pais);
        res.status(200).json(direccion.toJSON())
    } catch (error) {
        next(error)
    }
}

const deleteById = async (req, res,next) => {
    try {
        const id =  req.params.id;
        const direccion = await direccionService.deleteById(id)
        res.status(204).json({eliminado : direccion})
    } catch (error) {
        next(error)
    }
}

module.exports = { create, findById, updateById, deleteById}