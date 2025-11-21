const dotenv = require('dotenv');
dotenv.config();


module.exports = {
port: process.env.PORT || 4000,
mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/relieflink',
jwtSecret: process.env.JWT_SECRET || 'change_me',
jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d'
};