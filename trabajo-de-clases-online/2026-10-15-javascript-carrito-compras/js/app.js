// ========================== PRODUCTOS ===========================
const productos = [
    {
        id: 1,
        nombre: 'Laptop',
        descripcion: 'Laptop para trabajo y estudio',
        precio: 2500000,
        imagen: 'https://placehold.co/600x400?text=Laptop'
    },
    {
        id: 2,
        nombre: 'Mouse',
        descripcion: 'Mouse inalámbrico',
        precio: 80000,
        imagen: 'https://placehold.co/600x400?text=Mouse'
    },
    {
        id: 3,
        nombre: 'Teclado',
        descripcion: 'Teclado mecánico RGB',
        precio: 150000,
        imagen: 'https://placehold.co/600x400?text=Teclado'
    },
]

// ==================== CARRITO =========================
let carrito = []

// ========================= ELEMENTOS DEL HTML ==================
const botonesAgregar = document.querySelectorAll('.btn-agregar')

const btnCarrito = document.getElementById('btnCarrito')
const listaCarrito = document.getElementById('listaCarrito')
const carritoVacio = document.getElementById('carritoVacio')
const resumenCarrito = document.getElementById('resumenCarrito')

const contadorCarrito = document.getElementById('contadorCarrito')
const totalProductos = document.getElementById('totalProductos')
const totalCarrito = document.getElementById('totalCarrito')
const btnVaciarCarrito = document.getElementById('btnVaciarCarrito')
const btnComprar = document.getElementById('btnComprar')

// ======================== FORMATO DE PRECIO ================================
const formatearPrecio = (valor) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
    }).format(valor)
}

// ======================== ACTUALIZAR CARRITO ================================
const actualizarCarrito = () => {
    listaCarrito.innerHTML = ''

    const hayProductos = carrito.length > 0

    // Mostrar u ocultar el mensaje de "vacío" y el resumen
    carritoVacio.style.display = hayProductos ? 'none' : 'block'
    resumenCarrito.style.display = hayProductos ? 'block' : 'none'

    carrito.forEach(producto => {
        const item = document.createElement('div')

    
        item.classList.add('carrito-item', 'row', 'align-items-center')

        item.innerHTML = `
            <div class="col-md-2">
                <img
                    src="${ producto.imagen }"
                    alt="${ producto.nombre }"
                    class="img-fluid rounded"
                >
            </div>

            <div class="col-md-3">
                <h5>${ producto.nombre }</h5>
                <p class="text-muted mb-0">
                    ${ producto.descripcion }
                </p>
            </div>

            <div class="col-md-3 d-flex align-items-center justify-content-center gap-2">
                <button class="btn btn-outline-secondary btn-sm btn-restar" data-id="${ producto.id }">
                    <i class="bi bi-dash"></i>
                </button>

                <span class="cantidad">${ producto.cantidad }</span>

                <button class="btn btn-outline-secondary btn-sm btn-sumar" data-id="${ producto.id }">
                    <i class="bi bi-plus"></i>
                </button>
            </div>

            <div class="col-md-2 text-end">
                <strong>${ formatearPrecio(producto.precio * producto.cantidad) }</strong>
            </div>

            <div class="col-md-2 text-end">
                <button class="btn btn-outline-danger btn-sm btn-eliminar" data-id="${ producto.id }">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `

        listaCarrito.appendChild(item)
    })

    // Totales: reduce suma un valor por cada producto del carrito
    const cantidadTotal = carrito.reduce((suma, producto) => suma + producto.cantidad, 0)
    const precioTotal = carrito.reduce((suma, producto) => suma + producto.precio * producto.cantidad, 0)

    contadorCarrito.textContent = cantidadTotal
    totalProductos.textContent = cantidadTotal
    totalCarrito.textContent = formatearPrecio(precioTotal)
}

// =================== AGREGAR PRODUCTOS AL CARRITO ==================
const agregarAlCarrito = (id) => {
    const producto = productos.find(producto => producto.id === id)
    const productoCarrito = carrito.find(producto => producto.id === id)

    if (productoCarrito) {
        productoCarrito.cantidad++
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        })
    }

    actualizarCarrito()
}

// ============ CAMBIAR CANTIDAD (+1 o -1) Y ELIMINAR ============
const cambiarCantidad = (id, cambio) => {
    const producto = carrito.find(producto => producto.id === id)
    producto.cantidad += cambio

    // Si la cantidad llega a 0, se quita del carrito
    if (producto.cantidad <= 0) {
        eliminarDelCarrito(id)
        return
    }

    actualizarCarrito()
}

const eliminarDelCarrito = (id) => {
    carrito = carrito.filter(producto => producto.id !== id)
    actualizarCarrito()
}

// ======================== EVENTOS ================================

// Botones "Agregar al carrito"
botonesAgregar.forEach(boton => {
    boton.addEventListener('click', () => {
        const id = Number(boton.dataset.id)
        agregarAlCarrito(id)
    })
})

//  Botones +, - y eliminar.
listaCarrito.addEventListener('click', (e) => {
    const boton = e.target.closest('button')
    if (!boton) return

    const id = Number(boton.dataset.id)

    if (boton.classList.contains('btn-sumar')) cambiarCantidad(id, 1)
    if (boton.classList.contains('btn-restar')) cambiarCantidad(id, -1)
    if (boton.classList.contains('btn-eliminar')) eliminarDelCarrito(id)
})

btnVaciarCarrito.addEventListener('click', () => {
    carrito = []
    actualizarCarrito()
})

btnComprar.addEventListener('click', () => {
    if (carrito.length === 0) return

    alert(`¡Gracias por tu compra! Total: ${ totalCarrito.textContent }`)
    carrito = []
    actualizarCarrito()
})

// El botón del navbar lleva a la sección del carrito
btnCarrito.addEventListener('click', () => {
    listaCarrito.closest('section').scrollIntoView({ behavior: 'smooth' })
})

// Estado inicial: carrito vacío (oculta el resumen)
actualizarCarrito()