class Nodo {
    constructor(valor) {
      this.valor = valor;
      this.anterior = null;
      this.siguiente = null;
    }
  }
  
export class ListaDobleCircular {
    constructor() {
      this.cabeza = null;
      this.tamanio = 0;
    }
  
    agregar(valor) {
      const nuevoNodo = new Nodo(valor);
      if (this.cabeza === null) {
        this.cabeza = nuevoNodo;
        nuevoNodo.siguiente = this.cabeza;
        nuevoNodo.anterior = this.cabeza;
      } else {
        let nodoActual = this.cabeza;
        while (nodoActual.siguiente !== this.cabeza) {
          nodoActual = nodoActual.siguiente;
        }
        nodoActual.siguiente = nuevoNodo;
        nuevoNodo.anterior = nodoActual;
        nuevoNodo.siguiente = this.cabeza;
        this.cabeza.anterior = nuevoNodo;
      }
      this.tamanio++;
    }
  
    generarCodigoDot() {
        let dot = 'digraph G { ';
        dot += 'rankdir=LR ';
        dot += 'node [shape=record] ';
      
        let nodoActual = this.cabeza;
      
        // Agregar nodos
        for (let i = 0; i < this.tamanio; i++) {
          dot += `"${nodoActual.valor}" [shape=box] `;
          nodoActual = nodoActual.siguiente;
        }
      
        nodoActual = this.cabeza;
        // Agregar relaciones entre nodos
        for (let i = 0; i < this.tamanio; i++) {
          dot += `"${nodoActual.valor}" -> "${nodoActual.siguiente.valor}" [dir=both] `;
          nodoActual = nodoActual.siguiente;
        }
      
        dot += '}';
        return dot;
      }
  }