const { validationResult } = require('express-validator')

module.exports = (peticion, respuesta, siguiente) => {
    const errores = validationResult(peticion)

    if(!errores.isEmpty()) {

        return respuesta.status(400).json({
            msg: errores.array()
        })
    }

    siguiente()
}