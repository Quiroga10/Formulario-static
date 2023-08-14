document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario");
    const guardarBoton = document.getElementById("guardar");
    const datosGuardadosLista = document.getElementById("datosGuardados");
    const buscarBoton = document.getElementById("buscar");
    const buscadorInput = document.getElementById("buscador");

    //cargar los datos
    cargarDatosGuardados();
    guardarBoton.addEventListener("click", function () {
        const nombre = formulario.nombre.value;
        const email = formulario.email.value;
        const edad = formulario.edad.value;
        const cargo = formulario.cargo.value;
        const nuevoItem = document.createElement("li");
        nuevoItem.textContent = `Nombre: ${nombre}, Email: ${email}, Edad: ${edad}, Cargo: ${cargo}`;
        datosGuardadosLista.appendChild(nuevoItem);

        // Restablecer el formulario después de guardar los datos
        formulario.reset();

        // Guardar datos en almacenamiento local
        const datos = JSON.parse(localStorage.getItem("datosGuardados")) || [];
        datos.push({ nombre, email, edad, cargo });
        localStorage.setItem("datosGuardados", JSON.stringify(datos));

        cargarDatosGuardados(); // Actualizar la lista de datos guardados
    });

    // Restaurar los datos guardados en la lista
    function cargarDatosGuardados() {
        datosGuardadosLista.innerHTML = ""; // Limpiar la lista
        const datos = JSON.parse(localStorage.getItem("datosGuardados")) || [];

        for (const dato of datos) {
            const nuevoItem = document.createElement("li");
            nuevoItem.textContent = `Nombre: ${dato.nombre}, Email: ${dato.email}, Edad: ${dato.edad}, Cargo: ${dato.cargo}`;
            datosGuardadosLista.appendChild(nuevoItem);
        }
    }

    buscadorInput.addEventListener("input", function () {
        const criterioBusqueda = buscadorInput.value.toLowerCase();
        const items = datosGuardadosLista.getElementsByTagName("li");

        for (const item of items) {
            const itemText = item.textContent.toLowerCase();
            if (criterioBusqueda === "" || itemText.includes(criterioBusqueda)) {
            item.style.display = "block";
            } else {
            item.style.display = "none";
            }
        }
    });
});
