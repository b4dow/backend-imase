
const config = require('./../config/config')

const { dbDialect, dbName, dbPassword, dbHost, dbPort, dbUser } = config

const username = encodeURIComponent(dbUser)
const password = encodeURIComponent(dbPassword)

const URI = `${dbDialect}://${username}:${password}@${dbHost}:${dbPort}/${dbName}`


module.exports = {
    development: {
        url: URI,
        dialect: dbDialect,
        dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false, // Permite conexiones si el certificado SSL no es de confianza
            },
          },
    },
    production: {
        url: URI,
        dialect: dbDialect,
    }
}