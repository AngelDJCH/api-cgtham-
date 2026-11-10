const express = require('express')
const uploadRoute = express.Router()
const cloudinary = require('../config/cloudinary');
const cloudinaryService = require('../services/cloudinaryConfigService')
const organizacionRepository = require('../repository/organizacionRepository');
const fotoService = require('../services/fotoService');
const auth = require('../midlewares/auth');

/**
 * Helper resiliente para subida a Cloudinary.
 * Usa las credenciales de la organización si están configuradas; si fallan o no existen,
 * utiliza las credenciales maestras del sistema sin mutar el singleton global.
 */
const uploadToCloudinary = async (fileData, folder, orgConfig = null, extraOptions = {}) => {
    if (orgConfig && orgConfig.nombre && orgConfig.clave && orgConfig.clave_secreta) {
        try {
            return await cloudinary.uploader.upload(fileData, {
                cloud_name: orgConfig.nombre,
                api_key: orgConfig.clave,
                api_secret: orgConfig.clave_secreta,
                folder,
                ...extraOptions
            });
        } catch (orgError) {
            console.warn('[Cloudinary] Fallaron credenciales de organización. Usando credenciales del sistema:', orgError.message);
        }
    }

    return await cloudinary.uploader.upload(fileData, {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        folder,
        ...extraOptions
    });
};

uploadRoute.post('/upload', async (req, res) => {
    try {
        const imagen_url = req.body.imagen_url;
        const uploadStram = await uploadToCloudinary(imagen_url, '/cgtham')
        res.status(201).json({
            url: uploadStram.secure_url
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error
        })
    }
})

uploadRoute.post('/upload/logo/', auth, async (req, res) => {
    try {
        const id_organizacion = req.body.id_organizacion
        const cloudConfig = await cloudinaryService.findByIdOrganizacion(id_organizacion)
        const imagen_url = req.body.imagen_url
        const uploadStram = await uploadToCloudinary(imagen_url, '/cgtham/logo', cloudConfig)
        const changeLogo = await organizacionRepository.updateLogoByIdOrganizacion(uploadStram.secure_url, id_organizacion)
        if (!changeLogo) throw new Error('No se pudo cambiar el logo')
        res.status(200).json({
            url: uploadStram.secure_url
        })
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
        const imagen_url = req.body.imagen_url
        const uploadStram = await uploadToCloudinary(imagen_url, '/cgtham/banner', cloudConfig)
        const changeBanner = await organizacionRepository.updateBannerByIdOrganizacion(uploadStram.secure_url, id_organizacion)
        if (!changeBanner) throw new Error('No se pudo cambiar el banner')
        res.status(200).json({
            url: uploadStram.secure_url
        })
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
        const imagen_url = req.body.imagen_url
        const uploadStram = await uploadToCloudinary(imagen_url, '/cgtham/documentos', cloudConfig, {
            resource_type: 'raw'
        })
        res.status(200).json({
            url: uploadStram.secure_url
        })
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
        const imagen_url = req.body.imagen_url
        const cloudConfig = await cloudinaryService.findByIdOrganizacion(id_organizacion)
        
        const uploadStram = await uploadToCloudinary(imagen_url, '/cgtham/fotos/eventos', cloudConfig)

        const foto = await fotoService.create(uploadStram.secure_url, id_evento)
        res.status(200).json(foto.toJSON())
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

module.exports = uploadRoute
