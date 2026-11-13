const User = require('./../models/User')


const registrar = async(peticion, respuesta) => {
    try{
        // const nombre = peticion.body.nombre
        // const email = peticion.body.email
        // const password = peticion.body.password

        const { nombre, email, password } = peticion.body

        let user = await User.findOne({ email: email })

        if(user) return respuesta.status(400).json({
                msg: 'El usuario ya esta registrado en la base de datos'
            })

        user = new User({
            nombre,
            email,
            password
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

        const { email, password } = peticion.body
        
        // Busca si el usuario existe
        const user = await User.findOne({ email: email })

        // Return si el usuario no existe
        if(!user) return respuesta.status(404).json({
            msg: 'El Usuario NO existe en la base de datos'
        })

        // Validacion de contraseña
        if(password !== user.password){
            return respuesta.status(400).json({
                msg:'La contraseña es incorrecta'
        })} 
        
        return respuesta.status(200).json({
            msg:'Inicio de sesion exitoso'
        })
        

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