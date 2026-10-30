const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URI

const dbConnection = async() => {
    try{
        await mongoose.connect(MONGO_URI)
        console.log('Base de datos conectada')
    } catch {
        console.error('Conectandose a la base de datos', error.message)
    }
}

module.exports = dbConnection