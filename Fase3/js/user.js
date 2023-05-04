import { AVL } from "./AVL.js";
import { ListaDobleCircular } from "./ListaDobleCircular.js"

let obj = JSON.parse(localStorage.getItem("Arbol"));
let alumno_logueado = JSON.parse(localStorage.getItem("alumno_logeado"));
const boton_agregar = document.getElementById("addButton");
const boton_mostrar_carpetas = document.getElementById("showButton");

let arbol_avl = new AVL();
let bitacora = new ListaDobleCircular();
console.log(obj);
console.log(alumno_logueado);

try{
    parsearAVL(obj)
  }catch(error){
    console.log("No hay alumnos registrados")
}

function parsearAVL(obj) {
    arbol_avl.insertar(obj.raiz.alumno);
  
    if(obj.raiz.izquierda != null){
      insertarAVL(arbol_avl, obj.raiz.izquierda);
    }
  
    if(obj.raiz.derecha != null){
      insertarAVL(arbol_avl, obj.raiz.derecha);
    }
  
    return arbol_avl;
  }
  
  function insertarAVL(arbol, nodo){
    arbol.insertar(nodo.alumno);
  
    if(nodo.izquierda != null){
      insertarAVL(arbol, nodo.izquierda);
    }
  
    if(nodo.derecha != null){
      insertarAVL(arbol, nodo.derecha);
    }
  
  }

  function modificarUser() {
    let ruta = document.getElementById("direccion-carpeta").value;
    let carpeta = document.getElementById("nombre-archivo").value;
  
    const arbol = arbol_avl.buscar(alumno_logueado);
  
    try {
      arbol.insertarValor(ruta, carpeta);
    } catch (error) {
      alert("Hubo un error al insertar el nodo");
    }
    if(ruta == "/"){
      bitacora.agregar("Se creo la carpeta " + carpeta + " en la ruta " + "raiz" + " a las " + new Date().toLocaleTimeString() + " del " + new Date().toLocaleDateString()); 
    }else{
      bitacora.agregar("Se creo la carpeta " + carpeta + " en la ruta " + ruta + " a las " + new Date().toLocaleTimeString() + " del " + new Date().toLocaleDateString());
    }
    console.log(bitacora.generarCodigoDot());
    localStorage.setItem("bitacora", bitacora.generarCodigoDot());
    document.getElementById("nombre-archivo").value = "";
    localStorage.setItem("Arbol", JSON.stringify(arbol_avl));
    localStorage.setItem("grafica_user", arbol.grafica_arbol());
  }
//console.log(arbol_avl);

function mostrarContenidoCarpeta() {
    let lista = JSON.parse(localStorage.getItem("Arbol"));
    parsearAVL(lista);

    let ruta = document.getElementById("direccion-carpeta").value;
    const arbol = arbol_avl.buscar(alumno_logueado);
    let recorrer = arbol.mostrarCarpetasActuales(ruta)

    document.getElementById("tabla").innerHTML = "";
    for(let i = 0; i < recorrer.length; i++){
        let tabla = document.getElementById("tabla");
        let fila = document.createElement("tr");

        let celdaCarnet = document.createElement("td");
        celdaCarnet.innerText = recorrer[i];

        fila.appendChild(celdaCarnet);

        tabla.appendChild(fila);
        
    }
  
  }


boton_agregar.addEventListener('click', function() {
    modificarUser();

    console.log(JSON.parse(localStorage.getItem("Arbol")))
});

boton_mostrar_carpetas.addEventListener('click', function() {
    mostrarContenidoCarpeta();
});