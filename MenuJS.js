function formularioLibroNuevo(){
        // Verificar si ya hay libros en Local Storage
        if (!localStorage.getItem("libros")) {
            localStorage.setItem("libros", JSON.stringify([])); // Inicializar con un arreglo vacío
        }
    let left = (screen.width - 600)/2;
    let top = (screen.height - 700)/2;
        window.open("AggLibro.html","Document", `width=600, height=700, top=${top}, left=${left}`)
    
}
function opcionesClientes(){
    let left = (screen.width - 600)/2;
    let top = (screen.height - 700)/2;
        window.open("opcionesClientes.html","Document", `width=600, height=700, top=${top}, left=${left}`)
    
}

function cerrarVentana(){
    window.close("AddCliente.html","Document")
}

function nuevoLibro(libro, tablaAgg){
    const tablaFila = tablaAgg.insertRow();

    tablaFila.innerHTML = 
    `
    <tr>
        <td> ${libro.titulo} </td>
        <td> ${libro.autor} </td>
        <td> ${libro.fechaPub} </td>
        <td> ${libro.editorial} </td>
        <td> ${libro.cantidad} </td>
    
    </tr>
    `;
    //celda para las imagenes
    const imgCell = tablaFila.insertCell(5);
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("imgDivOpciones");
    //crear imagenes y agg al div

//Prestamo
    const imgPrestar = document.createElement("img");
    imgPrestar.src = 'image.png';
    imgPrestar.style.paddingRight = "4px";
    imgPrestar.onclick = function() {
        prestamoLibro(libro.titulo); // Llamar a la función de préstamo
    }

//Eliminar
    const imgBorrar = document.createElement("img");
    imgBorrar.src = 'Rectangle 19.png';
    imgBorrar.style.paddingRight = "4px";
    
    imgBorrar.onclick = function(titulo) {
        borrarLibro(libro.titulo);
    }

//Editar
    const imgEditar = document.createElement("img");
    imgEditar.src = 'Rectangle 20.png';
    imgEditar.onclick = function() {
        editarLibro(libro.titulo)
    };

     // Agregar las imágenes al div
    imgDiv.appendChild(imgPrestar);
    imgDiv.appendChild(imgBorrar);
    imgDiv.appendChild(imgEditar);

    // Agregar el div a la celda
    imgCell.appendChild(imgDiv);
    
}


// Borrar un libro del Local Storage
function borrarLibro(titulo) {
    let libros = JSON.parse(localStorage.getItem("libros")) || []; // Obtener los libros del Local Storage
    libros = libros.filter(libro => libro.titulo !== titulo);   // Filtrar el libro que se desea eliminar 
    localStorage.setItem("libros", JSON.stringify(libros)); // Guardar el nuevo arreglo en el Local Storage
    location.reload(); // Recargar la página para actualizar la tabla
}

function cargarLibrosDesdeLocalStorage() {
    const tablaAgg = document.getElementById("tablaAgg");
    tablaAgg.innerHTML = ""; // Limpiar la tabla antes de recargar

    const libros = JSON.parse(localStorage.getItem("libros")) || [];
    libros.forEach(libro => {
        nuevoLibro(libro, tablaAgg);
    });
}
window.onload = function () {
    cargarLibrosDesdeLocalStorage(); // Cargar los libros al iniciar la página
};


                                //Editar un libro
function editarLibro(titulo) {
    // Obtener los datos del libro desde Local Storage
    const libros = JSON.parse(localStorage.getItem("libros")) || [];
    const libroParaEditar = libros.find(libro => libro.titulo === titulo);

        // Guardar el libro a editar en una variable global en la ventana principal
        window.libroParaEditar = libroParaEditar;

        let left = (screen.width - 600) / 2;
        let top = (screen.height - 700) / 2;
        window.open("EditarLibro.html", "EditarLibro", `width=600, height=700, top=${top}, left=${left}`);
}

        /*Prestamo*/
function prestamoLibro(titulo) {
    let left = (screen.width - 600) / 2;
    let top = (screen.height - 700) / 2;
    window.open(`prestamoLibro.html?libro=${encodeURIComponent(titulo)}`,"prestamoLibro", `width=600, height=900, top=${top}, left=${left}`);
}   
    /*Busqueda*/
function filtrarLibros() {
    const barraBusc = document.getElementById("barraBusc").value.toLowerCase();
    const tablaAgg = document.getElementById("tablaAgg");
    tablaAgg.innerHTML = ""; // Limpiar la tabla antes de recargar
    
    const libros = JSON.parse(localStorage.getItem("libros")) || [];
    
    // Filtrar y ordenar los libros
    const librosFiltrados = libros
        .filter(libro => libro.titulo.toLowerCase().includes(barraBusc))
        .sort((a, b) => {
            // Priorizar los libros que comiencen con la palabra buscada
            if (a.titulo.toLowerCase().startsWith(barraBusc) && !b.titulo.toLowerCase().startsWith(barraBusc)) {
                return -1;
            }
            if (!a.titulo.toLowerCase().startsWith(barraBusc) && b.titulo.toLowerCase().startsWith(barraBusc)) {
                return 1;
            }
            return a.titulo.localeCompare(b.titulo); // Orden alfabético
        });
    
    // Mostrar los libros filtrados en la tabla
    librosFiltrados.forEach(libro => {
    nuevoLibro(libro, tablaAgg);
    });
}