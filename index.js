const app = require('./app')

const PORT = process.env.PORT_API_LISTENING || 3001;

app.listen(PORT, () => {
    console.log("Aplicacion corriendo en el puerto: " + PORT)
})