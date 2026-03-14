function obtenerProductos() {
    const predeterminados = [
        { 
            nombre: "Empanada de queso", 
            precio: 12,
            foto: "https://comedera.com/wp-content/uploads/sites/9/2022/05/Empanada-de-queso-shutterstock_1493634068.jpg"
        },
        { 
            nombre: "Café grande", 
            precio: 10,
            foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRDM3681f55UIvSEpLV07zSHLE02CyM82YEQ&s"
        },
        { 
            nombre: "Jugo natural", 
            precio: 15,
            foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS26fgdytfcmPq43MZMgU6aj7ubGbCu6JrHw&s"
        }
    ];

    let menuAdmin = JSON.parse(sessionStorage.getItem("menu")) || [];

    return [...predeterminados, ...menuAdmin];
}

function cargarCatalogo() {
    const productos = obtenerProductos();
    const cont = document.getElementById("productos");

    productos.forEach((p, index) => {
        cont.innerHTML += `
            <div class="producto">
                <img src="${p.foto || '../imagenes/default.png'}" 
                     alt="${p.nombre}" 
                     style="width:100%; border-radius:10px; margin-bottom:10px;">
                <h3>${p.nombre}</h3>
                <p>Precio: $${p.precio}</p>
                <button onclick="agregar(${index})">Añadir al carrito</button>
            </div>
        `;
    });
}

function agregar(index) {
    const productos = obtenerProductos();
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.push(productos[index]);
    sessionStorage.setItem("carrito", JSON.stringify(carrito));

    alert("Producto añadido al carrito");
}


function mostrarCarrito() {
    const carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    const lista = document.getElementById("lista");
    let total = 0;

    carrito.forEach(p => {
        lista.innerHTML += `<p>${p.nombre} - $${p.precio}</p>`;
        total += p.precio;
    });

    document.getElementById("total").innerText = "Total: $" + total;
}

function comprar() {
    const carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    let historial = JSON.parse(sessionStorage.getItem("historial")) || [];

    const compra = {
        fecha: new Date().toLocaleString(),
        productos: carrito,
        total: carrito.reduce((sum, p) => sum + p.precio, 0)
    };

    historial.push(compra);

    sessionStorage.setItem("historial", JSON.stringify(historial));
    sessionStorage.removeItem("carrito");

    alert("Compra realizada con éxito");
    window.location.href = "historial.html";
}

function mostrarHistorial() {
    const historial = JSON.parse(sessionStorage.getItem("historial")) || [];
    const cont = document.getElementById("historial");

    if (historial.length === 0) {
        cont.innerHTML = "<p>No tienes compras registradas.</p>";
        return;
    }

    historial.forEach((compra, index) => {
        let productosHTML = "";

        compra.productos.forEach(p => {
            productosHTML += `<li>${p.nombre} - $${p.precio}</li>`;
        });

        cont.innerHTML += `
            <div class="producto">
                <h3>Compra #${index + 1}</h3>
                <p><strong>Fecha:</strong> ${compra.fecha}</p>
                <p><strong>Total:</strong> $${compra.total}</p>
                <ul>${productosHTML}</ul>
            </div>
        `;
    });
}

if (window.location.pathname.includes("catalogo.html")) cargarCatalogo();
if (window.location.pathname.includes("carrito.html")) mostrarCarrito();
if (window.location.pathname.includes("historial.html")) mostrarHistorial();