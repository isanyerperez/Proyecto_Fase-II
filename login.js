function login() {
    const user = document.getElementById("usuario").value;
    const pass = document.getElementById("clave").value;

    const cuentas = {
        "ClienteUCV": "Central_123",
        "caja_01": "Cajero#123",
        "adminRoot": "cafetinAdmin"
    };

    if (cuentas[user] === pass) {
        if (user === "ClienteUCV") window.location.href = "cliente/catalogo.html";
        if (user === "caja_01") window.location.href = "caja/caja.html";
        if (user === "adminRoot") window.location.href = "administrador/admin.html";
    } else {
        alert("Credenciales incorrectas");
    }
}