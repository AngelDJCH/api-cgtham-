const cloudinary = require('cloudinary').v2
require('dotenv').config()

cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true
    }
)

const nubeCloud = (name, api_k, api_s, isSecure = true) => {
    return cloudinary.config(
        {
            cloud_name: name,
            api_key: api_k,
            api_secret: api_s,
            secure: isSecure
        }
    )
}

module.exports = cloudinary