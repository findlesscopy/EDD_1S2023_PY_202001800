//Importación de Objetos
import { Alumno } from "./Alumnos.js";
//Impotacion de arbol AVL
import { AVL } from "./AVL.js";

let arbol_avl = new AVL()

function cargaAlumnos(e) {
    var archivo = e.target.files[0];

    if (!archivo) {
        return;
    }

    let lector = new FileReader();
    lector.onload = function(e) {
        let contenido = e.target.result;

        const object = JSON.parse(contenido);

        const alumnos = object.alumnos.map((alumno) => {
            return new Alumno(alumno.nombre, alumno.carnet, alumno.password, alumno.Carpeta_Raiz);
          });
        for (let i = 0; i < alumnos.length; i++) {
            arbol_avl.insertar(alumnos[i]);
        }
        console.log(arbol_avl);
        localStorage.setItem("Arbol", JSON.stringify(arbol_avl));
        localStorage.setItem("alumnos", JSON.stringify(alumnos));
        localStorage.setItem("alumnos_preorden", JSON.stringify(arbol_avl.preorden()));
        localStorage.setItem("alumnos_postorden", JSON.stringify(arbol_avl.postorden()));
        localStorage.setItem("alumnos_inorden", JSON.stringify(arbol_avl.inorden()));
        //arbol_avl.graficar();
        console.log(localStorage.getItem("alumnos"));
        console.log(localStorage.getItem("alumnos_preorden"));
        //console.log(localStorage.getItem("alumnos_postorden"));
        //console.log(localStorage.getItem("alumnos_inorden"));
        
    }
    lector.readAsText(archivo);
}

document.getElementById("carga_alumnos").addEventListener("change", cargaAlumnos, false);

