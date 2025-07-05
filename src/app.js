//RecursosBackend-Adoptme-main\RecursosBackend-Adoptme-main\src\app.js
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import config from './config/config.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mockingRouter from './routes/mocking.router.js';
import errorHandler from './middlewares/errorHandler.js';
import { addLogger} from './middlewares/logger.js';
import logger from './middlewares/logger.js';
import loggerRouter from './routes/logger.router.js';
import swaggerUIexpress from 'swagger-ui-express';
import { swaggerSpecs } from './config/swagger.js';

const app = express();
const PORT = config.port|| 8080;
const MONGO_URL = config.mongoUrl || 'mongodb://127.0.0.1:27017/Adoptme?directConnection=true';

//const connection = mongoose.connect(`mongodb://127.0.0.1:27017/Adoptme?directConnection=true`)

const connection = mongoose.connect(MONGO_URL)
.then(() => {
    logger.info('✅ Conexión realizada con éxito a MongoDB');
    app.listen(PORT, () => {
      logger.info(`🚀 Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    logger.fatal('❌ Error al conectar a la base de datos');
    logger.fatal(error);
  });



app.use(express.json());
app.use(cookieParser());

app.use(addLogger);

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocking', mockingRouter);
app.use('/api/logger', loggerRouter);
app.use('/api/docs', swaggerUIexpress.serve, swaggerUIexpress.setup(swaggerSpecs));

app.use(errorHandler);

export default app;
