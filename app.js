require('dotenv').config({ override: true })
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const cors = require('cors')
const app = express()
const cookie_parser = require('cookie-parser')
const {rateLimit } = require('express-rate-limit')

// MIDLEWARES
app.use(express.json({limit:'1gb'}))
app.use(express.urlencoded({limit:'100mb', extended:true}))
//app.use(cors({ origin: '*', credentials: true})) https://cheery-donut-20af10.netlify.app
// http://localhost:3000
app.use(cors({origin : process.env.URL_FRONTEND || 'http://localhost:3000', credentials: true})) //Acepta cualquier origien // https://api-cgtham.onrender.com
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(cookie_parser())

/*ROUTES*/
const direccionRoutes = require('./src/routes/direccionRoute')
const contactosRoutes = require('./src/routes/contactoRoute')
const organizacionRoutes = require('./src/routes/organizacionRoute')
const empresaRoutes = require('./src/routes/empresaRoute')
const escuelaRoutes = require('./src/routes/escuelaRoute')
const camaraRoutes = require('./src/routes/camaraRoute')
const cuentaRoutes = require('./src/routes/cuentaRoute')
const mensajeRoutes = require('./src/routes/mensajeRoute')
const ofertaLaboralRoutes = require('./src/routes/ofertaLaboralRoute')
const convenioRoutes = require('./src/routes/convenioRoute')
const eventoRoutes = require('./src/routes/eventoRoute')
const empresaCamaraRoutes = require('./src/routes/empresaCamaraRoute')
const convenioOrganizacionRoutes = require('./src/routes/convenioOrganizacionRoute')
const inscripcionEventoRoutes = require('./src/routes/inscripcionEventoRoute')
const comentarioRoutes = require('./src/routes/comentarioRoute')
const historicoOfertaRoutes = require('./src/routes/historicoOfertaRoute')
const historicoEventoRoutes = require('./src/routes/historicoEventoRoute')
const uploadRoute = require('./src/routes/uploadRoute')
const cloudinaryConfigRoutes = require('./src/routes/cloudinaryConfigRoute')
const fotoRoutes = require('./src/routes/fotoRoute')
const cursoRoutes = require('./src/routes/cursoRoute')
const visitaRoute = require('./src/routes/visitaRoute')
const ofertaeducativaRoutes = require('./src/routes/ofertaEducativaRoute')
const ofertaEducativaRoutes = require('./src/routes/ofertaEducativaRoute')
const chatRoutes = require('./src/routes/chatRoute')
const isncripcionCursoRoutes = require('./src/routes/inscripcionCursoRoute')
const afiliacionRoutes = require('./src/routes/afiliacionRoute')

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, 
//     max: 500, 
//     standardHeaders: true, 
//     legacyHeaders: false,
    
//     handler: (req, res, next, options) => {
//         const segundosRestantes = Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000);

//         res.status(429).json({
//             error: 'Too Many Requests',
//             message: 'Demasiadas peticiones desde esta dirección IP. Por favor, inténtalo más tarde.',
//             retryAfterSeconds: segundosRestantes,
//             documentation: 'https://api.example.com/docs/rate-limits'
//         });
//     }
// });

// app.use(limiter);

//ROUTES IN USE
app.use('/api/v1/direcciones', direccionRoutes)
app.use('/api/v1/contactos', contactosRoutes)
// app.use('/api/v1/usuarios', usuarioRoutes)
app.use('/api/v1/organizaciones', organizacionRoutes)
app.use('/api/v1/empresas', empresaRoutes)
app.use('/api/v1/escuelas', escuelaRoutes)
app.use('/api/v1/camaras', camaraRoutes)
app.use('/api/v1/cuentas', cuentaRoutes)
app.use('/api/v1/mensajes', mensajeRoutes)
// app.use('/api/v1/seguimientos', seguimientoRoutes)
app.use('/api/v1/ofertaslaborales', ofertaLaboralRoutes)
app.use('/api/v1/convenios', convenioRoutes)
app.use('/api/v1/eventos', eventoRoutes)
app.use('/api/v1/empresasCamaras', empresaCamaraRoutes)
app.use('/api/v1/conveniosOrganizaciones', convenioOrganizacionRoutes)
app.use('/api/v1/inscripcionesEvento', inscripcionEventoRoutes)
// app.use('/api/v1/postulaciones', postulacionRoutes)
app.use('/api/v1/comentarios', comentarioRoutes )
app.use('/api/v1/historicosofertaslaborales', historicoOfertaRoutes)
app.use('/api/v1/historicoseventos', historicoEventoRoutes)
app.use('/api/v1/uploadCloudinary', uploadRoute)
app.use('/api/v1/cloudinaryConfigs', cloudinaryConfigRoutes)
app.use('/api/v1/fotos', fotoRoutes)
app.use('/api/v1/cursos', cursoRoutes)
app.use('/api/v1/visitas', visitaRoute)
app.use('/api/v1/ofertaseducativas', ofertaEducativaRoutes)
app.use('/api/v1/chat', chatRoutes)
app.use('/api/v1/inscripcionCurso', isncripcionCursoRoutes)
app.use('/api/v1/afiliaciones', afiliacionRoutes)


app.use((err, req, res, next) => {
    const status = err.statusCode || 500;

    if (status === 500) {
        console.log('Error inesperado:', err);
    }

    res.status(status).json({
        message: err.message || 'Ocurrió un error interno en el servidor'
    });
});

module.exports = app