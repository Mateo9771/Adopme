import express from 'express';
import config from './configs/configs.js'
import mongoose from 'mongoose';

const app = express();
const PORT = config.port;
const URLMongoDB = config.mongoUrl;

// Middleware para parsear JSON
app.use(express.json());

// Ruta de ejemplo
app.get('/', (req, res) => {
    res.send('¡Bienvenido a Adoptme!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

//conectar a MongoDB
mongoose
.connect(URLMongoDB)
.then(() => {
    console.log('Conexión a MongoDB exitosa');
})
.catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
});