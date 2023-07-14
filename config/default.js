const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


// const config = {
//   db: {
//       username: process.env.DB_USER || 'admin',
//       password: process.env.DB_PASS || '123',
//       database: process.env.DB_NAME || 'user-info',
//       host: process.env.DB_HOST || 'localhost',
//       port: process.env.DB_PORT || 27017,
//       MONGO_URI:env.MONGO_URI,
//       JWT_SECRET: env.JWT_SECRET,
//       JWT_ACCESS_EXPIRATION: env.JWT_ACCESS_EXPIRATION,
//       JWT_REFRESH_EXPIRATION: env.JWT_REFRESH_EXPIRATION,
//       EMAIL_USERNAME:env.EMAIL_USERNAME,
//       EMAIL_PASSWORD:env.EMAIL_PASSWORD,
//       EMAIL_FROM:env.EMAIL_FROM
//   },

//   server: {
//       port: process.env.PORT || "3001",
//       logLevel: process.env.LOG_LEVEL || "info",
//       jwtSecret: process.env.JWT_SECRET || "a5722b6f-5c5d-4033-af9d-63fba843e7ae-MySecret",
//       environment: process.env.NODE_ENV,
//       tokenExpireTime: 86400,
//   },

// }

// module.exports = config