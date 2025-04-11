

let botonAceptar = document.getElementById("Aceptar");
let botonCancelar = document.getElementById("Cancelar");
function cerrarVentana(){
    window.close("AggLibro.html","Document")
}
function capturarLibro() {

    let titulo = document.getElementById("titulo").value.trim();
    let fechaPub = document.getElementById("fechaPub").value.trim();
    let cantidad = document.getElementById("cantidad").value.trim();
    let autor = document.getElementById("autor").value.trim();
    let editorial = document.getElementById("editorial").value.trim();
    //Validacion para asegurarse de que el administrador no deje espacios en blanco
    let flag = true;
    if( titulo === ""){
        //El caso en que se le olvide acceder algun campo
        const estadoT = document.getElementById("estadoT");
        estadoT.innerText = "Por favor llene el campo";
        setTimeout(()=>{
            estadoT.textContent = "";
        }, 1500)
        flag = false;
    }
    if(fechaPub === "" || fechaPub.value < 999){
        //El caso en que se le olvide acceder algun campo
        const estadoFP = document.getElementById("estadoFP");
        estadoFP.innerText = "llene este campo";
        setTimeout(()=>{
            estadoFP.textContent = "";
        }, 1500)
        flag = false;
    }
    if(cantidad === ""){
        //El caso en que se le olvide acceder algun campo
        const estadoCt = document.getElementById("estadoCt");
        estadoCt.innerText = "llenar campo"; 
        setTimeout(()=>{
            estadoCt.textContent = "";
        }, 1500)
        flag = false;
    }
    if(autor === ""){
        //El caso en que se le olvide acceder algun campo
        const estadoA = document.getElementById("estadoA");
        estadoA.innerText = "llenar campo";
        setTimeout(()=>{
            estadoA.textContent = "";
        }, 1500)
        flag = false;
    }
    if(editorial === ""){
        //El caso en que se le olvide acceder algun campo
        const estadoE = document.getElementById("estadoE");
        estadoE.innerText = "llenar campo";
        setTimeout(()=>{
            estadoE.textContent = "";
        }, 1500)
        flag = false;
    }

    if (flag == true) {
        const libro = {titulo, fechaPub, cantidad, autor, editorial};
    
    // Guardar el libro en Local Storage
    let libros = JSON.parse(localStorage.getItem("libros")) || [];
    libros.push(libro);
    localStorage.setItem("libros", JSON.stringify(libros));
    window.opener.location.reload();
    window.close();
    }
    

}
