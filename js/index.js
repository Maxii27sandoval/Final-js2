
// Declaracion de variables

const contenedorProductos = document.getElementById('contenedorProductos');

const carritoContenedor = document.getElementById('carritoContenedor');

const botonVaciar = document.getElementById('vaciarCarrito');
const comprar = document.getElementById('comprar');

const contadorCarrito = document.getElementById('contadorCarrito');

const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal');

const modalContenedor = document.getElementById('modalContenedorCarrito');

const botonCarrito = window.document.querySelector('.botonCarrito');

const cerrarCarrito = window.document.querySelector('.carritoCerrar')

let carrito = []



// eventos del boton carrito

botonCarrito.addEventListener("click", () => {
    modalContenedor.classList.add('modalActivo');
});

cerrarCarrito.addEventListener("click", () => {
    modalContenedor.classList.remove('modalActivo');
});

// traer productos cargados en JSON

fetch("./data.json")
.then(resp => resp.json())
.then(productos => {
    
    // vaciar carrito

    botonVaciar.addEventListener('click', () => {
        carrito.length = 0;
        actualizarCarrito();
    });

    comprar.addEventListener('click', () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Realizaste tu compra con exito',
            showConfirmButton: false,
            timer: 2000
        })
        carrito.length = 0;
        actualizarCarrito();
    });
    
    // diseño de productos en carrito

    productos.forEach((producto) => {
        let div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <div class="tituloProducto">
                <h2 class="nombreProducto">${producto.nombre}</h2>
            </div>
            <div class="imgContenedor">
                <img src="${producto.img}">
            </div>
            <div class="infoProducto">
                <button id="agregar${producto.id}" class="botonAgregar">
                    <p class="precio">$ ${producto.precio}</p>
                    <p class="agregarAlCarrito">AGREGAR AL CARRITO</p>
                </button>
                <div class="descripcionProducto">
                    <p class="textoDescriptivo">${producto.descripcion}</p>
                </div>
            </div>
            `

        contenedorProductos.appendChild(div);
            
        const boton = document.getElementById(`agregar${producto.id}`);
            
        boton.addEventListener('click', () => {
            agregarAlCarrito(producto.id)
            
            // alerta de producto agregado
            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 1500,
            })
                Toast.fire({
                icon: 'success',
                title: 'Producto agregado al carrito'
                })
        });
    });
            
    /*funcion para agregar al carrito*/
            
    const agregarAlCarrito = (prodId) => {
        const existe = carrito.some (prod => prod.id === prodId);

        /*si el producto ya está en el carrito, lo suma*/
        if (existe) {
            const prod = carrito.map (prod => {
                if (prod.id === prodId) {
                    prod.cantidad++;
                }
            });
            
        } else {
            /*si el producto no está en el carrito, lo agrega*/
            const item = productos.find((prod) => prod.id === prodId);
            carrito.push(item);
        }

        actualizarCarrito();
    }
            
    /*funcion para eliminar productos del carrito*/
            
    eliminarDelCarrito = (prodId) => {
        const item = carrito.find((prod) => prod.id === prodId)
        const indice = carrito.indexOf(item);
        carrito.splice(indice, 1);
        actualizarCarrito();
    }
            
    /*funcion para actualizar carrito*/
            
    const actualizarCarrito = () => {
        carritoContenedor.innerHTML = "";
            
        carrito.forEach((prod) => {
            const div = document.createElement('div');
            div.className = ('productoEnCarrito');
            div.innerHTML = `
                <div class="fila">
                    <div class="imagenCarritoContenedor">
                        <img class="imagenCarrito" src="${prod.img}">
                    </div>
                    <div class ="infoProductoCarrito">
                        <p class="nombreProductoCarrito">${prod.nombre}</p>
                        <div class="cantidadCarrito">
                            <p>Cantidad:</p>
                            <p class="cantidadNumero">
                                <span id="cantidad">${prod.cantidad}</span>
                            </p>
                        </div>
                        <div class="precioCarrito">
                            <p>Precio:</p>
                            <p ><span>${prod.precio}</span></p>
                        </div>
                        <button onclick="eliminarDelCarrito(${prod.id})" class="botonEliminar">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>
                `
            carritoContenedor.appendChild(div);
            
            localStorage.setItem("carrito", JSON.stringify(carrito))
        });
        
        contadorCarrito.innerText = carrito.length;
            
        precioTotal.innerHTML = "$ " + carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);
    }

    // guardar carrito en local storage

    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        actualizarCarrito();
    }

}).catch(error => console.log(error));