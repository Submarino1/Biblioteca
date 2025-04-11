//Validacion para confirmar la falla de ingreso de contrasena

function login(){
    let pass = document.getElementById("contrasena").value;
 if (pass == "RDAB"){
        window.location = "Menu.html";
    } else{
                //indicacionn de que la contrasena es erronea
        let estado = document.getElementById("estado");
        estado.innerText = "Contraseña equivocada";
        setTimeout(()=>{
            estado.textContent = "";
        }, 1500)
    }        

}
