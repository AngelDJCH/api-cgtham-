const swaggerAutogen = require('swagger-autogen')()


const doc = {
    info: {
        title: 'CGTHAM API',
        description: 'Documentación de la API para la gestión de datos de la comisión de gestión de talento humano de las altas montañas'
    },
    host: "api-cgtham.onrender.com:3301" || 'localhost:3001',
    schemes: ['http'],
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['./app.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js')
})