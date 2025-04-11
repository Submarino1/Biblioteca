function addCliente(){ 
let left = (screen.width - 600)/2;
let top = (screen.height - 700)/2;
window.open("AddCliente.html","Document", `width=600, height=900, top=${top}, left=${left}`)
}

function capturarCliente() {
    let nombre = document.getElementById("nombre").value.trim();
    let direccion = document.getElementById("direccion").value.trim();
    let telefono = document.getElementById("telefono").value.trim();
    let email = document.getElementById("email").value.trim();

    //validacion para el ingreso del nuevo cliente
    let flag = true;
    if(nombre === ""){
        //El caso en que se le olvide acceder algun campo
        const estadoN = document.getElementById("estadoN");
        estadoN.innerText = "Por favor llene el campo";
        setTimeout(()=>{
            estadoN.textContent = "";
        }, 1500)
        flag = false;
    }
    if(direccion === ""){
        //El caso en que se le olvide acceder algun campo
        const estadoD = document.getElementById("estadoD");
        estadoD.innerText = "Por favor llene este campo correctamente";
        setTimeout(()=>{
            estadoD.textContent = "";
        }, 1500)
        flag = false;
        }
    if(telefono === ""){
        //El caso en que se le olvide acceder algun campo
        const estadoT = document.getElementById("estadoT");
        estadoT.innerText = "llenar campo";
        setTimeout(()=>{
            estadoT.textContent = "";
        }, 1500)   
        flag = false;
        }else if(!/^\d+$/.test(telefono)){
        //El caso en que use otros caracteres que no sean numericos
        estadoT.innerText = "Por favor solo usa numeros";
        setTimeout(()=>{
            estadoT.textContent = "";
        }, 1500)   
        flag = false;
    }else if(telefono.toString().length === 11){
                //El caso en que use otros caracteres que no sean numericos
                estadoT.innerText = "Numero telefonico invalido";
                setTimeout(()=>{
                    estadoT.textContent = "";
                }, 1500)   
                flag = false;
    }
    if(email === ""){
        //El caso en que se le olvide acceder algun campo
        const estadoE = document.getElementById("estadoE");
        estadoE.innerText = "Email mal accesado";
        setTimeout(()=>{
            estadoE.textContent = "";
        }, 1500)
        flag = false;
    }
//localStorage.removeItem('clientes');// Borrar el Local Storage para pruebas

//Confirmacion de datos accedidos correctamente.
if(flag == true) {
    const cliente = {nombre, direccion, telefono, email, penalizado:false, libro:""}; 

    // Guardar el libro en Local Storage
    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    clientes.push(cliente);
    localStorage.setItem("clientes", JSON.stringify(clientes));


    window.opener.location.reload();
    window.close();
}

}

                                /*baja clientes*/
function eliminarCliente(){
    let left = (screen.width - 600)/2;
    let top = (screen.height - 700)/2;
    window.open("visualizacionClientes.html","Document", `width=600, height=900, top=${top}, left=${left}`)
    
}

function actualizarDesplegable() {
    desplegable.innerHTML = ""; // Limpiar el contenido actual
    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    // Verificar si hay clientes en Local Storage
    if (clientes.length === 0) {
        const opcion = document.createElement("option");
        opcion.textContent = "No hay clientes disponibles";
        opcion.disabled = true;
        opcion.selected = true;
        desplegable.appendChild(opcion);
        return;
    }
    clientes.forEach(cliente => {
        if (!cliente.penalizado || !cliente.penalizado.estado) {
            const opcion = document.createElement("option");
            opcion.value = cliente.nombre;
            opcion.textContent = cliente.nombre;
            desplegable.appendChild(opcion);
        }
    });

}

function eliminarClienteSeleccionado() {
    const desplegable = document.getElementById("desplegable");
    const clienteSeleccionado = desplegable.value;

    if (!clienteSeleccionado) {
        alert("Por favor, seleccione un cliente para eliminar.");
        return;
    }

    // Obtener los clientes desde Local Storage
    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    // Filtrar el cliente seleccionado
    clientes = clientes.filter(cliente => cliente.nombre !== clienteSeleccionado);

    // Guardar los clientes actualizados en Local Storage
    localStorage.setItem("clientes", JSON.stringify(clientes));

    // Actualizar el desplegable
    actualizarDesplegable();
    window.opener.location.reload();

    alert(`El cliente "${clienteSeleccionado}" ha sido eliminado.`);
}
/*Prestamo*/
function inicializarPrestamo() {
    const params = new URLSearchParams(window.location.search);
    const tituloLibro = params.get("libro");

    const operacionCliente = document.getElementById("operacionCliente");
    operacionCliente.textContent = `Prestamo de libro: ${tituloLibro}`;

    actualizarDesplegable();
}

function asignarPrestamo() {
    const params = new URLSearchParams(window.location.search);
    const tituloLibro = params.get("libro");

    const desplegable = document.getElementById("desplegable");
    const clienteSeleccionado = desplegable.value;

    if (!clienteSeleccionado) {
        alert("Por favor, seleccione un cliente.");
        return;
    }

    // Obtener los clientes desde Local Storage
    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    // Buscar el cliente seleccionado
    const cliente = clientes.find(cliente => cliente.nombre === clienteSeleccionado);

    // Verificar si el cliente ya tiene el libro asignado
    if (cliente.libro === tituloLibro) {
        alert(`El cliente "${clienteSeleccionado}" ya tiene prestado el libro "${tituloLibro}".`);
        return;
    }

    // Verificar si el cliente está penalizado
    if (cliente.penalizado && cliente.penalizado.estado) {
        alert(`El cliente "${clienteSeleccionado}" ya está penalizado por el libro "${cliente.penalizado.libro}".`);
        return;
    }

    // Asignar el libro al cliente seleccionado
    clientes = clientes.map(cliente => {
        if (cliente.nombre === clienteSeleccionado) {
            cliente.libro = tituloLibro;
        }
        return cliente;
    });

    // Guardar los clientes actualizados en Local Storage
    localStorage.setItem("clientes", JSON.stringify(clientes));

    alert(`El libro "${tituloLibro}" ha sido asignado a "${clienteSeleccionado}".`);
    window.close();
}
        /*Penalizacion*/
function penalizacionCliente(){
    let left = (screen.width - 600) / 2;
    let top = (screen.height - 700) / 2;
    window.open("penalizacionCliente.html","Document", `width=600, height=900, top=${top}, left=${left}`)
}
function asignarPenalizacion() {
    const desplegable = document.getElementById("desplegable");
    const clienteSeleccionado = desplegable.value;

    if (!clienteSeleccionado) {
        alert("Por favor, seleccione un cliente.");
        return;
    }

    // Obtener los clientes desde Local Storage
    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    // Buscar el cliente seleccionado
    const cliente = clientes.find(cliente => cliente.nombre === clienteSeleccionado);

    if (!cliente) {
        alert("Cliente no encontrado.");
        return;
    }

    // Asignar penalización al cliente
    cliente.penalizado = { estado: true, monto: 75 };

    // Guardar los clientes actualizados en Local Storage
    localStorage.setItem("clientes", JSON.stringify(clientes));

    // Mostrar el monto de penalización
    const estadoCliente = document.getElementById("estadoCliente");
    estadoCliente.textContent = `El cliente "${clienteSeleccionado}" ha sido penalizado con un monto de $75 por su primer día de falta.`;

    alert(`El cliente "${clienteSeleccionado}" ha sido penalizado.`);
}
function actualizarDesplegableAlta() {
    const desplegableAlta = document.getElementById("desplegableAlta");
    desplegableAlta.innerHTML = ""; // Limpiar el contenido actual

    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    if (clientes.length === 0) {
        const opcion = document.createElement("option");
        opcion.textContent = "No hay clientes disponibles";
        opcion.disabled = true;
        opcion.selected = true;
        desplegableAlta.appendChild(opcion);
        return;
    }

    // Filtrar solo los clientes penalizados
    clientes.forEach(cliente => {
        if (cliente.penalizado && cliente.penalizado.estado) {
            const opcion = document.createElement("option");
            opcion.value = cliente.nombre;
            opcion.textContent = cliente.nombre;
            desplegableAlta.appendChild(opcion);
        }
    });

}
function quitarPenalizacion() {
    const desplegableAlta = document.getElementById("desplegableAlta");
    const clienteSeleccionado = desplegableAlta.value;

    if (!clienteSeleccionado) {
        alert("Por favor, seleccione un cliente.");
        return;
    }

    // Obtener los clientes desde Local Storage
    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    // Buscar el cliente seleccionado y quitar la penalización
    clientes = clientes.map(cliente => {
        if (cliente.nombre === clienteSeleccionado) {
            cliente.penalizado = { estado: false, monto: 0 };
        }
        return cliente;
    });

    // Guardar los clientes actualizados en Local Storage
    localStorage.setItem("clientes", JSON.stringify(clientes));

    // Actualizar el desplegable
    actualizarDesplegableAlta();

    alert(`La penalización del cliente "${clienteSeleccionado}" ha sido eliminada.`);
}

        /*Devolucion*/
function devolucionLibro() {
    let left = (screen.width - 600) / 2;
    let top = (screen.height - 700) / 2;
    window.open("devolucionLibro.html", "devolucionLibro", `width=600, height=900, top=${top}, left=${left}`);
}
function actualizarDesplegableDevolucion() {
    const desplegableDevolucion = document.getElementById("desplegableDevolucion");
    desplegableDevolucion.innerHTML = ""; // Limpiar el contenido actual

    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    if (clientes.length === 0) {
        const opcion = document.createElement("option");
        opcion.textContent = "No hay clientes disponibles";
        opcion.disabled = true;
        opcion.selected = true;
        desplegableDevolucion.appendChild(opcion);
        return;
    }

    // Filtrar clientes que tienen un libro asignado
    clientes.forEach(cliente => {
        if (cliente.libro && cliente.libro !== "") {
            const opcion = document.createElement("option");
            opcion.value = cliente.nombre;
            opcion.textContent = `${cliente.nombre} - Libro: ${cliente.libro}`;
            desplegableDevolucion.appendChild(opcion);
        }
    });
}
function procesarDevolucion() {
    const desplegableDevolucion = document.getElementById("desplegableDevolucion");
    const clienteSeleccionado = desplegableDevolucion.value;

    if (!clienteSeleccionado) {
        alert("Por favor, seleccione un cliente.");
        return;
    }

    // Obtener los clientes desde Local Storage
    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    // Buscar el cliente seleccionado y devolver el libro
    clientes = clientes.map(cliente => {
        if (cliente.nombre === clienteSeleccionado) {
            alert(`El libro"${cliente.libro}" ha sido devuelto por el cliente "${clienteSeleccionado}".`);
            cliente.libro = ""; // Eliminar el libro asignado
        }
        return cliente;
    });

    // Guardar los clientes actualizados en Local Storage
    localStorage.setItem("clientes", JSON.stringify(clientes));

    // Actualizar el desplegable
    actualizarDesplegableDevolucion();

    
}