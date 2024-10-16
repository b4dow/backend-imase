require('dotenv').config();

const config = {
 env: process.env.NODE_ENV || 'dev',
 port: process.env.PORT || 3000,
 dbUser: process.env.DB_USERNAME,
 dbPassword: process.env.DB_PASSWORD,
 dbHost: process.env.DB_HOST,
 dbName: process.env.DB_NAME,
 dbPort: process.env.DB_PORT,
 dbDialect: process.env.DB_DIALECT,
 //  cloudinary
 cloudName: process.env.CLOUDINARY_CLOUD_NAME,
 cloudApiKey: process.env.CLOUDINARY_API_KEY,
 cloudApiSecret: process.env.CLOUDINARY_API_SECRET,

 // CORS
 frontendUrl: process.env.FRONTEND_URL
};

module.exports = config;
