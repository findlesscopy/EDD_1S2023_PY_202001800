// Obtener todos los elementos "a" de la lista de navegación
const navItems = document.querySelectorAll("#nav-ul a");

// Obtener todos los elementos "div" que deseas mostrar u ocultar
const contentDivs = document.querySelectorAll("div[id^='vista_admin']");

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

function mostrarLogin() {
  document.getElementById("vista_admin_home").style.display = "none";
  document.getElementById("vista_admin_carga").style.display = "none";
  document.getElementById("vista_admin_usuarios").style.display = "none";
  document.getElementById("vista_admin_permisos").style.display = "none";
  document.getElementById("vista_admin_reporte_mensajes").style.display =
    "none";
  document.getElementById("vista_admin_reporte_grafica").style.display = "none";
  document.getElementById("navbar_admin").style.display = "none";

  document.getElementById("login").style.display = "block";
}

const boton_mostrar_login = document.getElementById("boton_logout_admin");
boton_mostrar_login.addEventListener("click", mostrarLogin);

import { Login } from "./login.js";

const emailInput = document.getElementById("login_email");
const passwordInput = document.getElementById("login_password");
const loginButton = document.getElementById("btn_login");



loginButton.addEventListener("click", function (event) {
  event.preventDefault(); // evitar que el formulario se envíe
  const login = new Login(emailInput.value, passwordInput.value);
  if (login.login() == "admin") {
    document.getElementById("vista_admin_home").style.display = "block";
    document.getElementById("vista_admin_carga").style.display = "none";
    document.getElementById("vista_admin_usuarios").style.display = "none";
    document.getElementById("vista_admin_permisos").style.display = "none";
    document.getElementById("vista_admin_reporte_mensajes").style.display =
      "none";
    document.getElementById("vista_admin_reporte_grafica").style.display =
      "none";
    document.getElementById("navbar_admin").style.display = "block";

    document.getElementById("login").style.display = "none";
  } else {
    alert("Usuario o contraseña no válidos");
  }
});
