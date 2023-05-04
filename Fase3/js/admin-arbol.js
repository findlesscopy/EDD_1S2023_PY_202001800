import { Alumno } from "./Alumnos.js";
//Impotacion de arbol AVL
import { AVL } from "./AVL.js";

let arbol_avl = new AVL()

function graficarAVL(){
    const object = JSON.parse(localStorage.getItem("alumnos"));

    const alumnos = object.map((alumno) => {
        return new Alumno(alumno.nombre, alumno.carnet, alumno.password, alumno.Carpeta_Raiz);
        });
    for (let i = 0; i < alumnos.length; i++) {
        arbol_avl.insertar(alumnos[i]);
    }
}

function mostrarArbol(){
    graficarAVL();
    d3.select("#graficaArbol").graphviz()
        .width(1000)
        .height(600)
        .zoom(true)
        .fit(true)
        .renderDot(arbol_avl.graficar())
}

window.addEventListener("load", function() {
    mostrarArbol();
  });

