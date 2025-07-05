import dotenv from 'dotenv';

dotenv.config({ path: './config/.env' });

export default {
    port: process.env.PORT,
    mongoUrl: process.env.URL_MONGO,
    environment: process.env.ENVIRONMENT || 'development'
}