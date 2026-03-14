let menu = JSON.parse(sessionStorage.getItem("menu")) || [];


function agregar(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const foto = document.getElementById("foto").value;

    if (!nombre || !precio) {
        alert("Debes ingresar nombre y precio.");
        return;
    }

    menu.push({ nombre, precio, foto });
    sessionStorage.setItem("menu", JSON.stringify(menu));

    mostrar();
    alert("Producto agregado correctamente.");
}

function mostrar() {
    const cont = document.getElementById("lista");
    cont.innerHTML = "";

    menu.forEach((p, i) => {
        cont.innerHTML += `
            <p>
                ${p.nombre} - $${p.precio}
                <button onclick="eliminar(${i})">Eliminar</button>
            </p>
        `;
    });
}

function eliminar(i) {
    menu.splice(i, 1);
    sessionStorage.setItem("menu", JSON.stringify(menu));
    mostrar();
}

window.onload = mostrar;