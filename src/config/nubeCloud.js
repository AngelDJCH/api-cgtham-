const cloudinary = require('cloudinary').v2;

const nubeCloud = (name, api_k, api_s) => {
    cloudinary.config({
        cloud_name: name,
        api_key: api_k,
        api_secret: api_s,
        secure: true
    });
    
    return cloudinary;
};

module.exports = nubeCloud;