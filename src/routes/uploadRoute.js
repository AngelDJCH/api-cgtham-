const express = require('express')
const uploadRoute = express.Router()
const cloudinary = require('../config/cloudinary');
const nubeCloud = require('../config/nubeCloud');
const cloudinaryService = require('../services/cloudinaryConfigService')
const organizacionRepository = require('../repository/organizacionRepository');
const { verifyToken } = require('../helpers/jwtToken');
const fotoService = require('../services/fotoService');
const auth = require('../midlewares/auth');

uploadRoute.post('/upload', async (req, res) => {
    try {
        const imagen_url = req.body.imagen_url;
        const uploadStram = await cloudinary.uploader.upload(imagen_url, {
            folder: '/cgtham',
        })
        res.status(201).json({
            url: uploadStram.secure_url
        })
    } catch (error) {
        res.status(400).json(
            {
                message: error
            }
        )
    }
})

uploadRoute.post('/upload/logo/', auth, async (req, res) => {
    try {
        const id_organizacion = req.body.id_organizacion
        const cloudConfig = await cloudinaryService.findByIdOrganizacion(id_organizacion)
        if (cloudConfig) {
            const imagen_url = req.body.imagen_url
            const uploadStram = await nubeCloud(cloudConfig.nombre, cloudConfig.clave, cloudConfig.clave_secreta).uploader.upload(imagen_url, {
                folder: '/cgtham/logo'
            })
            const changeLogo = await organizacionRepository.updateLogoByIdOrganizacion(uploadStram.secure_url, id_organizacion)
            if (!changeLogo) throw new Error('No se pudo cambiar el logo')
            res.status(200).json({
                url: uploadStram.secure_url
            })
        } else {
            res.status(400).json({ message: 'Error al subir la imagen' })
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

uploadRoute.post('/upload/banner/', auth, async (req, res) => {
    try {
        const id_organizacion = req.body.id_organizacion
        const cloudConfig = await cloudinaryService.findByIdOrganizacion(id_organizacion)
        if (cloudConfig) {
            const imagen_url = req.body.imagen_url
            const uploadStram = await nubeCloud(cloudConfig.nombre, cloudConfig.clave, cloudConfig.clave_secreta).uploader.upload(imagen_url, {
                folder: '/cgtham/banner'
            })
            const changeLogo = await organizacionRepository.updateBannerByIdOrganizacion(uploadStram.secure_url, id_organizacion)
            if (!changeLogo) throw new Error('No se pudo cambiar el banner')
            res.status(200).json({
                url: uploadStram.secure_url
            })
        } else {
            res.status(400).json({ message: 'Error al subir la imagen' })
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})


uploadRoute.post('/upload/documento/', auth, async (req, res) => {
    try {
        const id_organizacion = req.body.id_organizacion
        const cloudConfig = await cloudinaryService.findByIdOrganizacion(id_organizacion)
        if (cloudConfig) {
            const imagen_url = req.body.imagen_url
            const uploadStram = await nubeCloud(cloudConfig.nombre, cloudConfig.clave, cloudConfig.clave_secreta).uploader.upload(imagen_url, {
                folder: '/cgtham/documentos',
                resource_type: 'raw'
            })
            res.status(200).json({
                url: uploadStram.secure_url
            })
        } else {
            res.status(400).json({ message: 'Error al subir el documento' })
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})


uploadRoute.post('/upload/foto/', auth, async (req, res) => {
    try {
        const id_evento = req.body.id_evento
        const id_organizacion = req.body.id_organizacion
        const cloudConfig = await cloudinaryService.findByIdOrganizacion(id_organizacion)
        if (cloudConfig) {
            const imagen_url = req.body.imagen_url
            const uploadStram = await nubeCloud(cloudConfig.nombre, cloudConfig.clave, cloudConfig.clave_secreta).uploader.upload(imagen_url, {
                folder: '/cgtham/fotos/eventos'
            })
            const foto = await fotoService.create(uploadStram.secure_url, id_evento)
            res.status(200).json(foto.toJSON())
        } else {
            res.status(400).json({ message: 'Error al subir la imagen' })
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

module.exports = uploadRoute