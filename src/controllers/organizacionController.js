const organizacionService = require('../services/organizacionService')

const create = async (req, res) => {
    try {
        const { nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner, id_contacto, id_direccion } = req.body;
        // const logoUrl = ''
        // const bannerUrl = ''

        // try {
        //     const logoCarpeta = await cloudinary.uploader.upload(logo, {
        //         folder: '/cgtham/logos',
        //     })
        //     const bannerCarpeta = await cloudinary.uploader.upload(banner, {
        //         folder: '/cgtham/banners',
        //     })
        //     logoUrl = logoCarpeta.secure_url
        //     bannerUrl = bannerCarpeta.secure_url
        // } catch (error) {
        //     res.status(400).json(
        //         {
        //             message: error
        //         }
        //     )
        // }
        // const organizacion = await organizacionService.create(nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logoUrl, bannerUrl, id_contacto, id_direccion);


        const organizacion = await organizacionService.create(nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner, id_contacto, id_direccion);
        res.status(201).json(organizacion.toJSON())
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const findById = async (req, res) => {
    try {
        const id = req.params.id;
        const organizacion = await organizacionService.findById(id)
        res.status(200).json(organizacion.toJSON())
    } catch (error) {
        res.status(404).json(
            {
                message: error.message
            }
        )
    }
}

const findAll = async (req, res) => {
    try {
        const organizaciones = await organizacionService.findAll();
        res.status(200).json(
            organizaciones.map(
                organizacion => organizacion.toJSON()
            )
        )
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

const updateById = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner } = req.body;
        const organizacion = await organizacionService.updateById(id, nombre_comercial, descripcion, tipo, sector, tamaño, giro, rfc, logo, banner)
        res.status(200).json(organizacion.toJSON())
    } catch (error) {
        res.status(404).json(
            {
                message: error.message
            }
        )
    }
}

const deleteById = async (req, res) => {
    try {
        const id = req.params.id;
        const organizacion = await organizacionService.deleteById(id)
        res.status(204).json({
            message: 'Elimninado exitosamente'
        })
    } catch (error) {
        res.status(404).json(
            {
                message: error.message
            }
        )
    }
}

const countOrganizaciones = async (req, res) => {
    try {
        const count_organizaciones = await organizacionService.countOrganizaciones()
        res.status(200).json({
            organizaciones: count_organizaciones
        })
    } catch (error) {
        res.status(400).json(
            {
                message: error.message
            }
        )
    }
}

module.exports = { create, findById, findAll, updateById, deleteById, countOrganizaciones }