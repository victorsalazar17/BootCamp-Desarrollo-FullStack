const Tarea = require('./../models/Tarea')

const crearTarea = async(peticion, respuesta) => {
    try{
        const titulo = peticion.body.titulo
        let tarea = await Tarea.findOne({ titulo })

        if(tarea) return respuesta.status(400).json({
            msg: 'Hey, la tarea ya existe!'
        })

        tarea = new Tarea({
            titulo,
            usuario: '6b0064ee908e79a6a925b8e9'
        })

        await tarea.save()

        return respuesta.status(201).json({
            msg: `La tarea ${ titulo } ha sido creada`
        })
    } catch(error) {

        return respuesta.status(500).json({
            msg: `Error al crear tarea: ${ error.message }`
        })
    }
}

module.exports = {
    crearTarea
}