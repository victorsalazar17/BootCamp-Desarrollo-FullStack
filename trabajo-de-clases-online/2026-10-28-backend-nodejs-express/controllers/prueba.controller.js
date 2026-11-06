const controladorDePrueba = async (peticion, respuesta) => {
    try{
        respuesta.send('Respuesta enviada desde el controlador controladorDePrueba')
    } catch(error) {
        
    }
}

module.exports = controladorDePrueba