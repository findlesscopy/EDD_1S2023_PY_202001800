let lista = JSON.parse(localStorage.getItem("alumnos"));

function mostrarAlumnosPreOrden() {
    let lista = JSON.parse(localStorage.getItem("alumnos_preorden"));
    document.getElementById("tabla").innerHTML = "";
    lista.forEach(element => {
      let tabla = document.getElementById("tabla");
      let fila = document.createElement("tr");
  
      let celdaCarnet = document.createElement("td");
      celdaCarnet.innerText = element.carnet;
  
      let celdaNombre = document.createElement("td");
      celdaNombre.innerText = element.nombre;
  
      let celdaPassword = document.createElement("td");
      celdaPassword.innerText = element.password;
  
      fila.appendChild(celdaCarnet);
      fila.appendChild(celdaNombre);
      fila.appendChild(celdaPassword);
  
      tabla.appendChild(fila);
    });
  }

  
function mostrarAlumnosPostOrden() {
  let lista = JSON.parse(localStorage.getItem("alumnos_postorden"));
  document.getElementById("tabla").innerHTML = "";
  lista.forEach(element => {
    let tabla = document.getElementById("tabla");
    let fila = document.createElement("tr");

    let celdaCarnet = document.createElement("td");
    celdaCarnet.innerText = element.carnet;

    let celdaNombre = document.createElement("td");
    celdaNombre.innerText = element.nombre;

    let celdaPassword = document.createElement("td");
    celdaPassword.innerText = element.password;

    fila.appendChild(celdaCarnet);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaPassword);

    tabla.appendChild(fila);
  });
}


function mostrarAlumnosInOrden() {
  let lista = JSON.parse(localStorage.getItem("alumnos_inorden"));
  document.getElementById("tabla").innerHTML = "";
  lista.forEach(element => {
    let tabla = document.getElementById("tabla");
    let fila = document.createElement("tr");

    let celdaCarnet = document.createElement("td");
    celdaCarnet.innerText = element.carnet;

    let celdaNombre = document.createElement("td");
    celdaNombre.innerText = element.nombre;

    let celdaPassword = document.createElement("td");
    celdaPassword.innerText = element.password;

    fila.appendChild(celdaCarnet);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaPassword);

    tabla.appendChild(fila);
  });
}

  function mostrar(){
    const selected_option = document.getElementById("opciones");
    const opciones = selected_option.options
    if(opciones[0].selected){
      mostrarAlumnosInOrden()
    }else if(opciones[1].selected){
      mostrarAlumnosPostOrden();
    }else if(opciones[2].selected){
      mostrarAlumnosPreOrden();
    }
  }

const btnMostrar = document.querySelector('#btn-mostrar');

btnMostrar.addEventListener('click', function() {
    mostrar();
});
