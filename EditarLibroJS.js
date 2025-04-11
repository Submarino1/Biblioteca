function cargarDatosLibro() {
    // Obtener los datos del libro desde la ventana principal
    if (window.opener && window.opener.libroParaEditar) {
        const libro = window.opener.libroParaEditar;
        // placeholders
        document.getElementById("titulo").placeholder = libro.titulo;
        document.getElementById("fechaPub").placeholder = libro.fechaPub;
        document.getElementById("cantidad").placeholder = libro.cantidad;
        document.getElementById("autor").placeholder = libro.autor;
        document.getElementById("editorial").placeholder = libro.editorial;
        // Llenar los campos del formulario con los datos del libro

    } else {
        console.error("No se pudo cargar el libro para editar.");
    }
}

// Llamar a la función al cargar la ventana
window.onload = cargarDatosLibro;

function guardarCambios() {
    // Obtener los valores del formulario
    const titulo = document.getElementById("titulo").value.trim();
    const fechaPub = document.getElementById("fechaPub").value.trim();
    const cantidad = document.getElementById("cantidad").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const editorial = document.getElementById("editorial").value.trim();

    if (!titulo || !fechaPub || !cantidad || !autor || !editorial) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Crear el objeto libro actualizado
    const libroActualizado = { titulo, fechaPub, cantidad, autor, editorial };

    // Actualizar el libro en Local Storage
    if (window.opener) {
        const libros = JSON.parse(localStorage.getItem("libros")) || [];
        const librosActualizados = libros.map(libro =>
            libro.titulo === window.opener.libroParaEditar.titulo ? libroActualizado : libro
        );
        localStorage.setItem("libros", JSON.stringify(librosActualizados));

        // Recargar la tabla en la ventana principal
        window.opener.location.reload();
    }

    // Cerrar la ventana actual
    window.close();
}