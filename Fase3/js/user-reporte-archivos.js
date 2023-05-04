import { Matriz } from "./MatrizDispersa.js";

let matriz = new Matriz()

const inputElement = document.getElementById("archivo");
    let fileName = ""
    inputElement.addEventListener("change", (e) => {
        const file = e.target.files[0];
        fileName = file.name
        console.log(fileName)
    });


function cargarArchivo(){
    //console.log(fileName)
    matriz.insertarArchivo(fileName,1)
    reporteMatriz();
}
function reporteMatriz(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = matriz.reporte();
    $("#image").attr("src",url+body)
}

document.getElementById("subirArchivo").addEventListener("click", cargarArchivo, false);

function asignarPermisos(){
    let archivo = document.getElementById("direccion-carpeta").value
    let persona = document.getElementById("nombre-permiso").value
    const selected_option = document.getElementById("opciones");
    const opciones = selected_option.options
    if(opciones[0].selected){
        matriz.colocarPermiso(archivo,persona,"R")
      }else if(opciones[1].selected){
        matriz.colocarPermiso(archivo,persona,"R-W")
      }
    
    reporteMatriz()
}

document.getElementById("asignarPermisos").addEventListener("click", asignarPermisos, false);

