import { grafoDirigido } from "./MatrizAdyacencia.js";
import { MatrizDispersa } from "./MatrizDispersa.js";

class nodoHash {
  constructor(carnet, usuario, password) {
    this.carnet = carnet;
    this.usuario = usuario;
    this.password = password;
    this.grafo = new grafoDirigido();
    this.matriz = new MatrizDispersa();
  }
}

export class TablaHash {
  constructor() {
    this.tabla = new Array(7);
    this.capacidad = 7;
    this.utilizacion = 0;
  }

  insertar(carnet, usuario, password) {
    let indice = this.calculoIndice(carnet);
    const nuevoNodo = new nodoHash(carnet, usuario, password);
    if (indice < this.capacidad) {
      try {
        if (this.tabla[indice] == null) {
          console.log("Entre");
          this.tabla[indice] = nuevoNodo;
          this.utilizacion++;
          this.capacidad_tabla();
        } else {
          let contador = 1;
          indice = this.RecalculoIndice(carnet, contador);
          while (this.tabla[indice] != null) {
            contador++;
            indice = this.RecalculoIndice(carnet, contador);
          }
          this.tabla[indice] = nuevoNodo;
          this.utilizacion++;
          this.capacidad_tabla();
        }
      } catch (err) {
        console.log("Hubo un error en insercion");
      }
    }
  }

  calculoIndice(carnet) {
    let carnet_cadena = carnet.toString();
    let divisor = 0;
    for (let i = 0; i < carnet_cadena.length; i++) {
      divisor = divisor + carnet_cadena.charCodeAt(i);
    }
    let indice_final = divisor % this.capacidad;
    return indice_final;
  }

  capacidad_tabla() {
    let aux_utilizacion = this.capacidad * 0.75;
    if (this.utilizacion > aux_utilizacion) {
      this.capacidad = this.nueva_capacidad();
      this.utilizacion = 0;
      this.ReInsertar();
    }
  }

  nueva_capacidad() {
    //Sustituir por un algoritmo del siguiente numero primo
    let numero = this.capacidad + 1;
    while (!this.isPrime(numero)) {
      numero++;
    }
    return numero;
  }

  ReInsertar() {
    const auxiliar_tabla = this.tabla;
    this.tabla = new Array(this.capacidad);
    auxiliar_tabla.forEach((alumno) => {
      this.insertar(alumno.carnet, alumno.usuario, alumno.password);
    });
  }

  RecalculoIndice(carnet, intento) {
    let nuevo_indice = this.calculoIndice(carnet) + intento * intento;
    let nuevo = this.nuevo_Indice(nuevo_indice);
    return nuevo;
  }

  nuevo_Indice(numero) {
    let nueva_posicion = 0;
    if (numero < this.capacidad) {
      nueva_posicion = numero;
    } else {
      nueva_posicion = numero - this.capacidad;
      nueva_posicion = this.nuevo_Indice(nueva_posicion);
    }
    return nueva_posicion;
  }

  buscar(carnet) {
    let indice = this.calculoIndice(carnet);
    if (this.tabla[indice] !== null && this.tabla[indice].carnet === carnet) {
      console.log(this.tabla[indice]);
      return this.tabla[indice].grafo;
    } else {
      let contador = 1;
      indice = this.RecalculoIndice(carnet, contador);
      while (
        this.tabla[indice] !== null &&
        this.tabla[indice].carnet !== carnet
      ) {
        contador++;
        indice = this.RecalculoIndice(carnet, contador);
      }
      if (this.tabla[indice] !== null && this.tabla[indice].carnet === carnet) {
        console.log(this.tabla[indice]);
        return this.tabla[indice].grafo;
      } else {
        console.log(
          `No se encontró el nodo correspondiente al carnet ${carnet}.`
        );
      }
    }
  } 

  buscarMatriz(carnet) {
    let indice = this.calculoIndice(carnet);
    if (this.tabla[indice] !== null && this.tabla[indice].carnet === carnet) {
      console.log(this.tabla[indice]);
      return this.tabla[indice].matriz;
    } else {
      let contador = 1;
      indice = this.RecalculoIndice(carnet, contador);
      while (
        this.tabla[indice] !== null &&
        this.tabla[indice].carnet !== carnet
      ) {
        contador++;
        indice = this.RecalculoIndice(carnet, contador);
      }
      if (this.tabla[indice] !== null && this.tabla[indice].carnet === carnet) {
        console.log(this.tabla[indice]);
        return this.tabla[indice].matriz;
      } else {
        console.log(
          `No se encontró el nodo correspondiente al carnet ${carnet}.`
        );
      }
    }
  }

  buscarTabla(carnet){
    let indice = this.calculoIndice(carnet)
    if (this.tabla[indice] !== null && this.tabla[indice].carnet === carnet) {
        console.log(this.tabla[indice])
        return this.tabla[indice].nombre
    } else {
        let contador = 1
        indice = this.RecalculoIndice(carnet, contador)
        while (this.tabla[indice] !== null && this.tabla[indice].carnet !== carnet) {
            contador++
            indice = this.RecalculoIndice(carnet, contador)
        }
        if (this.tabla[indice] !== null && this.tabla[indice].carnet === carnet) {
            console.log(this.tabla[indice])
            return this.tabla[indice].nombre
        } else {
            console.log(`No se encontró el nodo correspondiente al carnet ${carnet}.`)
            return false
        }
    }
  }

  buscarLogin(carnet, password) {
    let indice = this.calculoIndice(carnet)
    if (this.tabla[indice] !== null && this.tabla[indice].carnet === carnet && this.tabla[indice].password === password) {
        //console.log(this.tabla[indice])
        return true
    } else {
        let contador = 1
        indice = this.RecalculoIndice(carnet, contador)
        while (this.tabla[indice] !== null && this.tabla[indice].carnet !== carnet) {
            contador++
            indice = this.RecalculoIndice(carnet, contador)
        }
        if (this.tabla[indice] !== null && this.tabla[indice].carnet === carnet && this.tabla[indice].password === password) {
            console.log(this.tabla[indice])
            return true
        } else {
            console.log(`No se encontró el nodo correspondiente al carnet ${carnet}.`)
            return false
        }
    }
  }
  /**
   * Este codigo es un extra para generar una tabla
   */

  isPrime(numero) {
    if (numero <= 1) {
      return false;
    }
    if (numero === 2) {
      return true;
    }
    if (numero % 2 === 0) {
      return false;
    }
    for (let i = 3; i <= Math.sqrt(numero); i += 2) {
      if (numero % i === 0) {
        return false;
      }
    }
    return true;
  }

  recorrer() {
    let alumnos = [];
    this.tabla.forEach((alumno) => {
      if (alumno != null) {
        alumnos.push(alumno);
      }
    });
    return alumnos;
  }
}
/*
const tablaHash = new TablaHash()

const inputElement = document.getElementById("input");
inputElement.addEventListener("change", onChange, false);
function onChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event){
    var obj = JSON.parse(event.target.result);
    for(var i = 0; i < obj.alumnos.length; i++){
        tablaHash.insertar(obj.alumnos[i].carnet, obj.alumnos[i].nombre, obj.alumnos[i].password)
    }
    console.log(tablaHash.tabla)
    tablaHash.genera_tabla()
}

function busqueda(){
    let carnet = document.getElementById("valor").value;
    tablaHash.busquedaUsuario(carnet)
}*/
