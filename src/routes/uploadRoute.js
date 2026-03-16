const express = require('express')
const uploadRoute = express.Router()
const cloudinary = require('../config/cloudinary')

uploadRoute.post('/upload', async (req, res) => {
    try {
        const imagen_url = req.body.imagen_url;
        const uploadStram = await cloudinary.uploader.upload(imagen_url, {
            folder: '/cgtham',
        })
        console.log(uploadStram)
        res.status(201).json({
            url : uploadStram.secure_url
        })
    } catch (error) {
        res.status(400).json(
            {
                message: error
            }
        )
    }
})

module.exports = uploadRoute