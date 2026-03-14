const venta = [
    { nombre: "Empanada", precio: 12 },
    { nombre: "Café", precio: 10 }
];

function cargarVenta() {
    const cont = document.getElementById("venta");
    let total = 0;

    venta.forEach(v => {
        cont.innerHTML += `<p>${v.nombre} - $${v.precio}</p>`;
        total += v.precio;
    });

    cont.innerHTML += `<h3>Total: $${total}</h3>`;
}

function emitir() {
    alert("Recibo Emitido ¡Gracias por su compra!");
}

window.onload = cargarVenta;