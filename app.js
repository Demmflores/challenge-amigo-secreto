// Array para almacenar los nombres
let amigos = [];

// Función para agregar un nombre a la lista
function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();

    // Validar entrada
    if (nombre === "") {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }

    // Agregar nombre a la lista
    amigos.push(nombre);

    // Actualizar la lista visual
    actualizarLista();
    
    // Limpiar el campo de texto
    input.value = "";
}

// Función para actualizar la lista de amigos en el DOM
function actualizarLista() {
    const listaAmigos = document.getElementById("listaAmigos");

    // Limpiar contenido existente
    listaAmigos.innerHTML = "";

    // Crear nuevos elementos de lista
    amigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = amigo;

        // Opción para eliminar un amigo si es necesario (opcional)
        const eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.onclick = () => eliminarAmigo(index);
        li.appendChild(eliminarBtn);

        listaAmigos.appendChild(li);
    });
}

// Función para eliminar un amigo de la lista
function eliminarAmigo(index) {
    amigos.splice(index, 1);
    actualizarLista();
}

// Función para realizar asignaciones únicas y evitar repeticiones
function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Debe haber al menos 2 amigos en la lista para realizar el sorteo.");
        return;
    }
    const asignaciones = new Map();
    const disponibles = [...amigos];

    for (const amigo of amigos) {
        // Filtrar nombres disponibles (no permitir asignarse a sí mismo)
        const posibles = disponibles.filter((disponible) => disponible !== amigo);
        if (posibles.length === 0) {
            alert("No se pudo completar el sorteo. Intenta agregar más participantes.");
            return;
        }
        const indiceAleatorio = Math.floor(Math.random() * posibles.length);
        const asignado = posibles[indiceAleatorio];      
        asignaciones.set(amigo, asignado);
        disponibles.splice(disponibles.indexOf(asignado), 1);
    }


    mostrarResultados(asignaciones);
}

// Función para mostrar los resultados en el DOM
function mostrarResultados(asignaciones) {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "<h3>Resultados del sorteo:</h3>";

    asignaciones.forEach((asignado, amigo) => {
        const p = document.createElement("p");
        p.textContent = `${amigo} será el amigo secreto de ${asignado}`;
        resultado.appendChild(p);
    });
}
