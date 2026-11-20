const { Schema, model } = require('mongoose')

const tareaSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    completado: {
        type: Boolean,
        default: false,
    },
    descripcion: {
        type: String,
        default: ''
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model('Tarea', tareaSchema)