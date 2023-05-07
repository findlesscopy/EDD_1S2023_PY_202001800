import { TablaHash } from "./TablaHash.js";
import { MatrizDispersa } from "./MatrizDispersa.js";
import { Bloque } from "./BlockChain.js";
import { encriptacion } from "./Encriptacion.js";
import { Alumno } from "./Alumnos.js";

let tabla_hash = new TablaHash();
let matriz = new MatrizDispersa();
let alumno_logueado = 0;
let lista_permisos = [];
const bloque = new Bloque();
let bloque_actual;

class Permiso {
  constructor(propietario, destinatario, archivo, permisos) {
    this.propietario = propietario;
    this.destinatario = destinatario;
    this.archivo = archivo;
    this.permisos = permisos;
  }
}

/* -------------------------------------

        Navegación entre Vistas 

----------------------------------------*/
// Obtener todos los elementos "a" de la lista de navegación
const navItems = document.querySelectorAll("#nav-ul a");

// Obtener todos los elementos "div" que deseas mostrar u ocultar
const contentDivs = document.querySelectorAll("div[id^='vista_admin']");

// Obtener todos los elementos "a" de la lista de navegación
const navItemsuser = document.querySelectorAll("#nav-ul-user a");

// Obtener todos los elementos "div" que deseas mostrar u ocultar
const contentDivsuser = document.querySelectorAll("div[id^='vista_usuarios']");

// Iterar sobre todos los elementos "a" y agregar un evento de clic a cada uno
navItems.forEach((item, index) => {
  item.addEventListener("click", (event) => {
    // Prevenir el comportamiento predeterminado del enlace
    event.preventDefault();

    // Ocultar todos los elementos "div"
    contentDivs.forEach((div) => {
      div.style.display = "none";
    });

    // Mostrar solo el elemento "div" correspondiente al elemento seleccionado

    contentDivs[index].style.display = "block";

    // Eliminar la clase "active" de todos los elementos de la lista de navegación
    navItems.forEach((item) => {
      item.classList.remove("active");
    });

    // Agregar la clase "active" al elemento seleccionado
    item.classList.add("active");
  });
});
/* -------------------------------------

        Navegación entre Vistas 

----------------------------------------*/

// Iterar sobre todos los elementos "a" y agregar un evento de clic a cada uno
navItemsuser.forEach((item2, index) => {
  item2.addEventListener("click", (event) => {
    // Prevenir el comportamiento predeterminado del enlace
    event.preventDefault();

    // Ocultar todos los elementos "div"
    contentDivsuser.forEach((div2) => {
      div2.style.display = "none";
    });

    // Mostrar solo el elemento "div" correspondiente al elemento seleccionado
    contentDivsuser[index].style.display = "block";

    // Eliminar la clase "active" de todos los elementos de la lista de navegación
    navItemsuser.forEach((item2) => {
      item2.classList.remove("active");
    });

    // Agregar la clase "active" al elemento seleccionado
    item2.classList.add("active");
  });
});
/* -------------------------------------

            Lógica de Login 

----------------------------------------*/
function mostrarLogin() {
  alumno_logueado = 0;
  document.getElementById("vista_admin_home").style.display = "none";
  document.getElementById("vista_admin_carga").style.display = "none";
  document.getElementById("vista_admin_usuarios").style.display = "none";
  document.getElementById("vista_admin_permisos").style.display = "none";
  document.getElementById("vista_admin_reporte_mensajes").style.display =
    "none";
  document.getElementById("vista_admin_reporte_grafica").style.display = "none";
  document.getElementById("navbar_admin").style.display = "none";

  document.getElementById("vista_usuarios_home").style.display = "none";
  document.getElementById("vista_usuarios_compartidos").style.display = "none";
  document.getElementById("vista_usuarios_chat").style.display = "none";
  document.getElementById("vista_usuarios_reporte").style.display = "none";
  document.getElementById("navbar_user").style.display = "none";

  document.getElementById("login").style.display = "block";
}

const boton_mostrar_login = document.getElementById("boton_logout_admin");
boton_mostrar_login.addEventListener("click", mostrarLogin);

const boton_mostrar_login_user = document.getElementById("boton_logout_user");
boton_mostrar_login_user.addEventListener("click", mostrarLogin);

import { Login } from "./login.js";

const emailInput = document.getElementById("login_email");
const passwordInput = document.getElementById("login_password");
const loginButton = document.getElementById("btn_login");

loginButton.addEventListener("click", function (event) {
  event.preventDefault(); // evitar que el formulario se envíe
  const login = new Login(emailInput.value, passwordInput.value);
  if (login.login() == "admin") {
    document.getElementById("vista_admin_home").style.display = "block";
    document.getElementById("navbar_admin").style.display = "block";

    document.getElementById("login").style.display = "none";
  } else if (tabla_hash.buscarLogin(parseInt(emailInput.value), passwordInput.value)) {
    
    alumno_logueado = parseInt(emailInput.value);
    document.getElementById("vista_usuarios_home").style.display = "block";
    document.getElementById("navbar_user").style.display = "block";

    document.getElementById("login").style.display = "none";
  } else {
    alert("Usuario o contraseña no válidos");
  }
});

/* -------------------------------------

            Carga de alumnos 

----------------------------------------*/

function cargaAlumnos(e) {
  var archivo = e.target.files[0];

  if (!archivo) {
    return;
  }

  let lector = new FileReader();
  lector.onload = function (e) {
    let contenido = e.target.result;

    const object = JSON.parse(contenido);
    const alumnos = object.alumnos.map((alumno) => {
      return new Alumno(alumno.carnet, alumno.nombre, alumno.password);
    });

    for(let i = 0; i < alumnos.length; i++){
      tabla_hash.insertar(alumnos[i].nombre, alumnos[i].carnet, alumnos[i].password);
    }
    //console.log(tabla_hash.tabla)
  };
  lector.readAsText(archivo);
}

document
  .getElementById("btn_carga_masiva")
  .addEventListener("change", cargaAlumnos, false);

function crearTablaAlumnos() {
  let lista = tabla_hash.tabla;
  document.getElementById("tabla").innerHTML = "";
  lista.forEach(async (element) => {
    let tabla = document.getElementById("tabla");
    let fila = document.createElement("tr");

    let celdaCarnet = document.createElement("td");
    celdaCarnet.innerText = element.carnet;

    let celdaNombre = document.createElement("td");
    celdaNombre.innerText = element.usuario;

    let celdaPassword = document.createElement("td");
    celdaPassword.innerText = await encriptacion(element.password);

    fila.appendChild(celdaCarnet);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaPassword);

    tabla.appendChild(fila);
  });
}

const btnMostrar = document.querySelector("#btn-mostrar-alumnos");

btnMostrar.addEventListener("click", function () {
  crearTablaAlumnos();
});

function AddCarpetas() {
  const grafo = tabla_hash.buscar(alumno_logueado);
  const carpeta = document.getElementById("direccion-carpeta-home").value;
  const ruta = document.getElementById("nombre-archivo-home").value;

  grafo.insertarValores(carpeta, ruta);
  //console.log(tabla_hash.tabla)
  console.log(grafo.grafica());
}

const btnAddCapeta = document.querySelector("#btn_anadir_carpeta");

btnAddCapeta.addEventListener("click", function () {
  AddCarpetas();
});

function EliminarCarpetas() {
  const grafo = tabla_hash.buscar(alumno_logueado);
  const carpeta = document.getElementById("direccion-carpeta-home").value;
  const ruta = document.getElementById("nombre-archivo-home").value;
  grafo.eliminarValores(carpeta, ruta);

  console.log(grafo.grafica());
}

const btnDeleteCapeta = document.querySelector("#btn_eliminar_carpeta");

btnDeleteCapeta.addEventListener("click", function () {
  EliminarCarpetas();
});

function graficarCarpetas() {
  let url = "https://quickchart.io/graphviz?graph=";
  let body = tabla_hash.buscar(alumno_logueado).grafica();

  $("#image_usuario_carpeta").attr("src", url + body);
  console.log(url + body);
}

const btnMostrarReporteCarpetas = document.querySelector(
  "#btn_mostrar_reporte_carpetas"
);

btnMostrarReporteCarpetas.addEventListener("click", function () {
  graficarCarpetas();
});

let fileName = "";
const inputElement = document.getElementById("archivo");
inputElement.addEventListener("change", (e) => {
  const file = e.target.files[0];
  fileName = file.name;
  console.log(fileName);
});

function cargarArchivo() {
  const grafo = tabla_hash.buscar(alumno_logueado);
  const carpeta = document.getElementById("direccion-carpeta-home").value;

  grafo.insertarValores(carpeta, fileName);
  console.log(grafo.grafica());
  matriz.insertarArchivo(fileName, 1);

  console.log(matriz);
  console.log(grafo);
}

const btnSubirArchivo = document.querySelector("#btn_subir_archivo");

btnSubirArchivo.addEventListener("click", function () {
  cargarArchivo();
});

function otorgarPermisos() {
  let archivo = document.getElementById("direccion-carpeta").value;
  let persona = document.getElementById("nombre-archivo").value;

  let select = document.getElementById("opciones");

  let selected_option = select.options[select.selectedIndex];

  if (selected_option.value == 0) {
    matriz.colocarPermiso(archivo, persona, "R");
    lista_permisos.push(new Permiso(alumno_logueado, persona, archivo, "R"));
    console.log("R");
  } else if (selected_option.value == 1) {
    matriz.colocarPermiso(archivo, persona, "R-W");
    lista_permisos.push(new Permiso(alumno_logueado, persona, archivo, "R-W"));
    console.log("R-W");
  }
  console.log(matriz.reporte());
}

const btnOtorgarPermisos = document.querySelector("#asignarPermisos");

btnOtorgarPermisos.addEventListener("click", function () {
  otorgarPermisos();
});

function mostrarTablaPermisos() {
  let lista = lista_permisos;
  document.getElementById("tabla-permisos").innerHTML = "";
  lista.forEach((element) => {
    let tabla = document.getElementById("tabla-permisos");
    let fila = document.createElement("tr");

    let celdaCarnet = document.createElement("td");
    celdaCarnet.innerText = element.propietario;

    let celdaNombre = document.createElement("td");
    celdaNombre.innerText = element.destinatario;

    let celdaPassword = document.createElement("td");
    celdaPassword.innerText = element.archivo;

    let celdaPermiso = document.createElement("td");
    celdaPermiso.innerText = element.permisos;

    fila.appendChild(celdaCarnet);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaPassword);
    fila.appendChild(celdaPermiso);

    tabla.appendChild(fila);
  });
}

const btnMostrarTablaPermisos = document.querySelector("#btn-mostrar-permisos");

btnMostrarTablaPermisos.addEventListener("click", function () {
  mostrarTablaPermisos();
});

function MostrarCarpetas() {
  const ruta = document.getElementById("direccion-carpeta-home").value;
  const grafo = tabla_hash.buscar(alumno_logueado);
  let recorrer = grafo.buscar(ruta);
  document.getElementById("tabla_de_carpetas").innerHTML = "";
  for (let i = 0; i < recorrer.length; i++) {
    let tabla = document.getElementById("tabla_de_carpetas");
    let fila = document.createElement("tr");

    let celdaCarnet = document.createElement("td");
    celdaCarnet.innerText = recorrer[i];

    fila.appendChild(celdaCarnet);
    tabla.appendChild(fila);
  }
  console.log(grafo.buscar("/Hola/CAR"));
}

const btnMostrarCarpetas = document.querySelector("#btn_mostrar_carpetas");

btnMostrarCarpetas.addEventListener("click", function () {
  MostrarCarpetas();
});

function MostrarCompartidosConmigo() {
  let lista = lista_permisos;
  document.getElementById("tabla_de_compartidos").innerHTML = "";
  lista.forEach((element) => {
    if (element.destinatario == alumno_logueado) {
      let tabla = document.getElementById("tabla_de_compartidos");
      let fila = document.createElement("tr");

      let celdaCarnet = document.createElement("td");
      celdaCarnet.innerText = element.propietario;

      let celdaPassword = document.createElement("td");
      celdaPassword.innerText = element.archivo;

      let celdaPermiso = document.createElement("td");
      celdaPermiso.innerText = element.permisos;

      fila.appendChild(celdaCarnet);
      fila.appendChild(celdaPassword);
      fila.appendChild(celdaPermiso);

      tabla.appendChild(fila);
    }
  });
}

const btnMostrarCarpetasCompartidas = document.querySelector(
  "#btn_refrescar_datos_compartir"
);

btnMostrarCarpetasCompartidas.addEventListener("click", function () {
  MostrarCompartidosConmigo();
});

/*----------------------------- 
MENSAJERIA Y ENCRIPTACION 
-----------------------------*/

function fechaActual() {
  let cadena = "";
  const fechaActual = new Date();
  cadena +=
    fechaActual.getDate() < 10
      ? "0" + fechaActual.getDate() + "-"
      : fechaActual.getDate() + "-";
  cadena +=
    fechaActual.getMonth() < 10
      ? "0" + (fechaActual.getMonth() + 1) + "-"
      : fechaActual.getMonth() + "-";
  cadena += fechaActual.getFullYear() + "::";
  cadena +=
    fechaActual.getHours() < 10
      ? "0" + fechaActual.getHours() + ":"
      : fechaActual.getHours() + ":";
  cadena +=
    fechaActual.getMinutes() < 10
      ? "0" + fechaActual.getMinutes() + ":"
      : fechaActual.getMinutes() + ":";
  cadena +=
    fechaActual.getSeconds() < 10
      ? "0" + fechaActual.getSeconds()
      : fechaActual.getSeconds();
  return cadena;
}

const btnEnviarMensaje = document.getElementById("btn_enviar_mensaje");
btnEnviarMensaje.addEventListener("click", enviarMensaje);

function enviarMensaje() {
  let emisor_mensaje = alumno_logueado;
  let receptor_mensaje = document.getElementById("destinatario").value;
  let mensaje_final = document.getElementById("mensaje").value;
  bloque.insertarBloque(
    fechaActual(),
    emisor_mensaje,
    receptor_mensaje,
    mensaje_final
  );
  console.log("Mensaje Enviado");
  console.log(bloque);
}

async function mostrar_Mensaje_descriptado() {
  let datos = await bloque.recorrer(alumno_logueado);
  console.log("Datos: ", datos);
  let mensajes = JSON.parse(datos);
  console.log("Mensajes: ", mensajes);

  document.getElementById("tabla_mensajes").innerHTML = "";
  for (let i = 0; i < mensajes.length; i++) {
    const mensaje = mensajes[i];
    let tabla = document.getElementById("tabla_mensajes");
    let fila = document.createElement("tr");

    let celdaEmisor = document.createElement("td");
    celdaEmisor.innerText = mensaje.emisor;

    let celdaMensaje = document.createElement("td");
    celdaMensaje.innerText = mensaje.mensaje;

    fila.appendChild(celdaEmisor);

    fila.appendChild(celdaMensaje);

    tabla.appendChild(fila);
    console.log("Mensaje:", mensaje.mensaje);
    console.log("Emisor:", mensaje.emisor);
  }
  
}

const btnRecibirMensaje = document.getElementById("btn_recibir_mensaje");
btnRecibirMensaje.addEventListener("click", mostrar_Mensaje_descriptado);

async function mostrarReporteGrafico(){
  let url = "https://quickchart.io/graphviz?graph=";
  let body = await bloque.graficar();

  $("#image_admin_grafico").attr("src", url + body);
  console.log(url + body);
}

const btnMostrarGrafico = document.getElementById("btn_mostrar_reporte_grafico");
btnMostrarGrafico.addEventListener("click", mostrarReporteGrafico);

function ReporteBloques(){
  bloque_actual = bloque.inicio
  if(bloque_actual != null){
      let cadena = "Index: " + bloque_actual.valor['index']
      cadena += "\nTimeStamp: " + bloque_actual.valor['timestamp']
      cadena += "\nEmisor: " + bloque_actual.valor['transmitter']
      cadena += "\nReceptor: " + bloque_actual.valor['receiver']
      cadena += "\nMensaje: " + bloque_actual.valor['message']
      cadena += "\nPreviousHash: " + bloque_actual.valor['previoushash']
      cadena += "\nHash: " + bloque_actual.valor['hash']
      document.getElementById("reporte-bloques").value = cadena
  }
}

const btnMostrarReporteBloques = document.getElementById("btn_mostrar_bloques");
btnMostrarReporteBloques.addEventListener("click", ReporteBloques);

function reporte_siguente(){
  if(bloque_actual.siguiente != null){
      bloque_actual = bloque_actual.siguiente
      let cadena = "Index: " + bloque_actual.valor['index']
      cadena += "\nTimeStamp: " + bloque_actual.valor['timestamp']
      cadena += "\nEmisor: " + bloque_actual.valor['transmitter']
      cadena += "\nReceptor: " + bloque_actual.valor['receiver']
      cadena += "\nMensaje: " + bloque_actual.valor['message']
      cadena += "\nPreviousHash: " + bloque_actual.valor['previoushash']
      cadena += "\nHash: " + bloque_actual.valor['hash']
      document.getElementById("reporte-bloques").value = cadena
  }
}

const btnMostrarSiguienteBloques = document.getElementById("siguiente-bloque");
btnMostrarSiguienteBloques.addEventListener("click", reporte_siguente);

function reporte_anterior(){
  if(bloque_actual.anterior != null){
      bloque_actual = bloque_actual.anterior
      let cadena = "Index: " + bloque_actual.valor['index']
      cadena += "\nTimeStamp: " + bloque_actual.valor['timestamp']
      cadena += "\nEmisor: " + bloque_actual.valor['transmitter']
      cadena += "\nReceptor: " + bloque_actual.valor['receiver']
      cadena += "\nMensaje: " + bloque_actual.valor['message']
      cadena += "\nPreviousHash: " + bloque_actual.valor['previoushash']
      cadena += "\nHash: " + bloque_actual.valor['hash']
      document.getElementById("reporte-bloques").value = cadena
      mostrar_Mensaje_descriptado()
  }
}

const btnMostrarAnteriorBloques = document.getElementById("anterior-bloque");
btnMostrarAnteriorBloques.addEventListener("click", reporte_anterior);

