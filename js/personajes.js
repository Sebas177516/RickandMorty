let personajes = document.getElementById("personajes");
let buscador = document.getElementById("buscar");
let botonBuscar = document.getElementById("btn-Buscar");


async function obtenerTodosLosPersonajes() {
    let pagina = 1;
    let todosLosPersonajes = [];
    let url = `https://rickandmortyapi.com/api/character?page=${pagina}`;

    while (url) {
        const response = await fetch(url);
        const datos = await response.json();

        // Añadir los resultados de la página actual al array
        todosLosPersonajes = todosLosPersonajes.concat(datos.results);

        // Verificar si hay una página siguiente
        url = datos.info.next;
    }

    return todosLosPersonajes;
}

// Función para mostrar los personajes
function mostrarPersonajes(personajesArray, filtro) {
    personajes.innerHTML = ""; // Limpiar resultados anteriores

    let encontrados = personajesArray.filter((elemento) =>
        elemento.id == filtro || elemento.name.toLowerCase().includes(filtro.toLowerCase())
    );

    if (encontrados.length > 0) {
        encontrados.forEach((elemento) => {
            const contenedor = document.createElement('div');
            contenedor.classList.add("personaje");

            contenedor.innerHTML = `
            <img src="${elemento.image}" alt="${elemento.name}">
                <div class="datosP">
                    <h3>${elemento.name}</h3>
                    <p>ID: ${elemento.id}</p>
                    <p>Estatus: ${elemento.status}</p>
                    <p>Species: ${elemento.species}</p>
                    <p>Type: ${elemento.type || "Unknown"}</p>
                    <p>Gender: ${elemento.gender}</p>
                    <p>Origin: ${elemento.origin.name}</p>
                    <p>Location: ${elemento.location.name}</p>
                </div>
            `;

            personajes.append(contenedor);
        });
    } else {
        personajes.innerHTML = `<h4>No se encontró ningún personaje con esos datos.</h4>`;
    }
}

// Obtener personajes y configurar la búsqueda
obtenerTodosLosPersonajes().then((personajesArray) => {
    botonBuscar.addEventListener("click", () => {
        let filtro = buscador.value.trim();
        if (filtro !== "") {
            mostrarPersonajes(personajesArray, filtro);
        }
        else
        {
            personajes.innerHTML = `<h4>No se encontró ningún personaje con esos datos.</h4>`;
        }
    });

    buscador.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            botonBuscar.click(); // Ejecuta la función del botón "Buscar"
        }
    });
});