const contenedor = document.getElementById('contenedor')
const btnAnterior = document.getElementById('btnAnterior')
const btnSiguiente = document.getElementById('btnSiguiente')

let pagina = 1


const obtenerPersonajes = async() => {
    try {
        //URL es un endpoint oara comunicarnos
        const respuesta = await fetch(`https://rickandmortyapi.com/api/character/?page=${ pagina }`)
        const data = await respuesta.json()

        console.log(data.results)

        contenedor.innerHTML = ''

        data.results.forEach(personaje => {
            contenedor.innerHTML += `
                <div class="col-md-4 col-lg-3 text-center">
                    <div class="card h-100">
                        <img 
                            src="${ personaje.image }" 
                            alt="${ personaje.name }"
                            class="card-img-top"
                        >
                        <div class="card-body">
                            <h5>${ personaje.name }</h5>
                            <p class="card-text">
                                Estado: ${ personaje.status }
                            </p>
                            <p class="card-text">
                                Especie: ${ personaje.species }
                            </p>
                        </div>
                    </div>
                </div>
            `
        })
    } catch(error) {
        contenedor.innerHTML = `
        <div id="contenedor" class="row g-4">
            <span class="text-danger text-center">
                Ocurrió un error: ${ error } 
            </span>
        </div>
        `
        console.error(error)
    }
}

btnSiguiente.addEventListener('click', () => {
    pagina++
    obtenerPersonajes()
})

btnAnterior.addEventListener('click', () => {
    if(pagina > 1)
    {
        pagina--
        obtenerPersonajes()
    }
    
})

obtenerPersonajes()