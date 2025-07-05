import dotenv from 'dotenv';

dotenv.config({ path: './config/.env' });

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/Adoptme?directConnection=true',
    environment: process.env.ENVIRONMENT || 'development'
}