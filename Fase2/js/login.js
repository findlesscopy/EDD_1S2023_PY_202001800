import { AVL } from "./AVL.js";
import { Alumno } from "./Alumnos.js";


let arbol_avl = new AVL();

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("btn");

let obj = JSON.parse(localStorage.getItem("Arbol"));

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


// Agregar event listener al botón de login
loginButton.addEventListener("click", function(event) {
  event.preventDefault(); // evitar que el formulario se envíe
  
  // Obtener valores del input
  const email = emailInput.value;
  const password = passwordInput.value;

  
  // Validar que los campos no estén vacíos
  
  // Validar que el usuario exista
  let alumno = arbol_avl.login(email, password);
  if(email === "admin" && password === "admin"){
    window.location.href = "admin.html";
  }else if(alumno != null){
    localStorage.setItem("alumno_logeado", email);
    window.location.href = "user.html";
  }else{
    alert("Usuario o contraseña no válidos");
  }

  console.log(alumno)
});