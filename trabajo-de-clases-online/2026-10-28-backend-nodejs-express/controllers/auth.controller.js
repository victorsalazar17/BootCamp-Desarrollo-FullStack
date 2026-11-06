const User = require('./../models/User')


const registrar = async(peticion, respuesta) => {
    try{
        const nombre = peticion.body.nombre
        const email = peticion.body.email
        const password = peticion.body.password

        let user = new User({
            nombre: nombre,
            email: email,
            password: password
        })

        await user.save()

        return respuesta.status(201).json({
            msg: 'El usuario fue creado correctamente'
        })

    } catch(error){
        return respuesta.status(500).json({
            msg: `Error al registrar usuario ${ error.message } `
        })
    }
}

const login = async(peticion, respuesta) => {
    try{

    } catch(error){
        return respuesta.status(500).json({
            msg: `Error al iniciar sesion ${ error.message } `
        })
    }
}

module.exports = {
    registrar,
    login
}