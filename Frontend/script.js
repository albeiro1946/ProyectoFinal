let productos = [
    {codigo: "Por1001", nombre: "Portátil Lenovo IdeaPad 3", descripcion: "Intel Core i5, 8GB RAM, 256GB SSD, pantalla 15.6\"", precio: 2400000, imagen: "./img/portatil1.webp"},
    {codigo: "Por1002", nombre: "Portátil Dell Inspiron 15", descripcion: "Intel Core i7, 16GB RAM, 512GB SSD, pantalla 15.6\"", precio: 3500000, imagen: "./img/portatil2.webp"},
    {codigo: "Por1003", nombre: "Portátil HP Pavilion x360", descripcion: "Intel Core i5, 8GB RAM, 512GB SSD, pantalla táctil 14\"", precio: 3200000, imagen: "./img/portatil3.webp"},
    {codigo: "Tec2001", nombre: "Teclado Logitech K120", descripcion: "Teclado alámbrico con diseño ergonómico y teclas silenciosas", precio: 55000, imagen: "./img/teclado.webp"},
    {codigo: "Tec2002", nombre: "Teclado Mecánico Redragon Kumara K552", descripcion: "Teclado mecánico compacto, retroiluminación RGB", precio: 185000, imagen: "./img/teclado.webp"},
    {codigo: "Tec2003", nombre: "Teclado Inalámbrico Microsoft Bluetooth Keyboard", descripcion: "Diseño minimalista, conectividad Bluetooth, teclas silenciosas", precio: 210000, imagen: "./img/teclado2.webp"},
    {codigo: "Mou3001", nombre: "Mouse Logitech M185", descripcion: "Mouse inalámbrico, diseño compacto, batería de larga duración", precio: 65000, imagen: "./img/mouse.webp"},
    {codigo: "Mou3002", nombre: "Mouse Razer DeathAdder Essential", descripcion: "Mouse para gaming, sensor óptico de alta precisión, diseño ergonómico", precio: 185000, imagen: "./img/gaming.webp"},
    {codigo: "Mou3003", nombre: "Mouse Inalámbrico Microsoft Modern Mobile Mouse", descripcion: "Diseño delgado, conectividad Bluetooth, compatible con múltiples sistemas", precio: 130000, imagen: "./img/mouse3.webp"}

];


let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Cargar los productos según el criterio de búsqueda
function cargar() {
    const criterio = document.getElementById('criterio').value.toLowerCase().trim();
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    const filtrados = productos.filter(p => 
        p.nombre.toLowerCase().includes(criterio) || 
        p.codigo.toLowerCase().includes(criterio)
    );

    if (filtrados.length === 0) {
        resultado.innerHTML = '<p>No se encontraron productos.</p>';
    } else {
        filtrados.forEach(p => {
            resultado.innerHTML += `
                <div class="producto">
                    <img src="${p.imagen}" alt="${p.nombre}" class="producto-imagen">
                    <p><strong>Código:</strong> ${p.codigo}</p>
                    <p><strong>Nombre:</strong> ${p.nombre}</p>
                    <p><strong>Descripción:</strong> ${p.descripcion}</p>
                    <p><strong>Precio:</strong> $${p.precio}</p>
                    <button onclick="agregarAlCarrito('${p.codigo}')">Agregar al carrito</button>
                </div>
            `;
        });
        
    }
}

// Limpiar el campo de búsqueda y recargar todos los productos
function limpiar() {
    document.getElementById('criterio').value = '';
    cargar();
}

// Agregar un producto al carrito
function agregarAlCarrito(codigo) {
    const producto = productos.find(p => p.codigo === codigo);
    if (producto) {
        carrito.push(producto);
        actualizarCarrito();
        mostrarMensaje(`Producto "${producto.nombre}" agregado al carrito.`);
    }
}

// Eliminar un producto del carrito
function eliminarDelCarrito(codigo) {
    carrito = carrito.filter(p => p.codigo !== codigo);
    actualizarCarrito();
    mostrarMensaje(`Producto eliminado del carrito.`);
}

// Actualizar la vista del carrito
function actualizarCarrito() {
    const carritoDiv = document.getElementById('carrito');
    carritoDiv.innerHTML = '<h2>Carrito de Compras</h2>';

    if (carrito.length === 0) {
        carritoDiv.innerHTML += '<p>El carrito está vacío.</p>';
    } else {
        carrito.forEach(p => {
            carritoDiv.innerHTML += `
                <div class="producto">
                    <p><strong>Código:</strong> ${p.codigo}</p>
                    <p><strong>Nombre:</strong> ${p.nombre}</p>
                    <p><strong>Precio:</strong> $${p.precio}</p>
                    <button onclick="eliminarDelCarrito('${p.codigo}')">Eliminar</button>
                </div>
            `;
        });

        const total = carrito.reduce((sum, p) => sum + p.precio, 0);
        carritoDiv.innerHTML += `<h3>Total: $${total}</h3>`;
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Mostrar un mensaje en pantalla
function mostrarMensaje(mensaje) {
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = 'mensaje';
    mensajeDiv.textContent = mensaje;
    document.body.appendChild(mensajeDiv);

    setTimeout(() => {
        mensajeDiv.remove();
    }, 3000);
}

// Cargar los productos al inicio
window.onload = () => {
    cargar();
    actualizarCarrito();
};
