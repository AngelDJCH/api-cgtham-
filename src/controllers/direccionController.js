const direccionService = require("../services/direccionService")

const create = async (req, res) => {
    try {
        const {calle, numero, colonia, codigo_postal, ciudad, estado, pais} = req.body;
        const direccion = await direccionService.create(calle, numero, colonia, codigo_postal, ciudad, estado, pais);
        res.status(201).json(direccion.toJSON());
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const findById = async (req, res) => {
    try {
        const direccion = await direccionService.findById(req.params.id)
        res.status(200).json(direccion.toJSON())
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

const updateById = async (req, res) => {
    try {
        const id =  req.params.id;
        const {calle, numero, colonia, codigo_postal, ciudad, estado, pais} = req.body;
        const direccion = await direccionService.updateById(id, calle, numero, colonia, codigo_postal, ciudad, estado, pais);
        res.status(200).json(direccion.toJSON())
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

module.exports = { create, findById, updateById }