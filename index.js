// index.js o server.js
const app = require('./app'); 
const pool = require('./src/config/db'); 
const { levantarCGTHAM } = require('./src/seeds/cgthamSeed'); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    
    await levantarCGTHAM(pool);
});