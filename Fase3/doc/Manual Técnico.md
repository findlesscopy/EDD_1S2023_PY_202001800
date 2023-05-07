# **Proyecto: Fase 3**
### Universidad de San Carlos de Guatemala
### Facultad de Ingeniería
### Escuela de Ciencias y Sistemas
### Estructura de Datos
### Sección C
<br></br><br>

## **Manual Técnico**
<br></br><br>

| Nombre | Carnet | 
| --- | --- |
| José Manuel Ibarra Pirir | 202001800 |
----
## **Estructuras de Datos**
### **1. Lista Doblemente enlazada Circular**
```
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
}
```
### **Método de Insersión**
```
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
```
### **2. Arbol N-Ario**
```
class nodoArbol{
    constructor(valor, id){
        this.siguiente = null;
        this.valor = valor;
        this.primero = null;
        this.id = id;
    }
}

export class ArbolNArio{
    constructor(){
        this.raiz = new nodoArbol("/", 0)
        this.nodo_creados = 1;
    }
}
```

### **Método de Insersión**
```
insertarValor(ruta, carpeta_nueva){
        let lista_carpeta = ruta.split('/')
        let existe_carpeta = this.BuscarCarpeta(carpeta_nueva, lista_carpeta)
        switch(existe_carpeta){
            case 1:
                this.insertarHijos("copia"+carpeta_nueva, lista_carpeta)
                break;
            case 2:
                this.insertarHijos(carpeta_nueva, lista_carpeta)
                break;
            case 3:
                alert("La ruta actual no existe")
                break;
            case 4:
                alert("La ruta actual no es valida")
                break;
            case 5:
                this.insertarHijos(carpeta_nueva, lista_carpeta)
                break;
        }
    }
```
### **3. Matriz Dispersa**
```
class nodoMatriz{
    constructor(posX, posY, nombre_archivo){
        this.siguiente = null;
        this.anterior = null;
        this.abajo = null;
        this.arriba = null;
        this.posX = posX;
        this.posY = posY;
        this.posicion = nombre_archivo;
    }
}

export class Matriz{
    constructor(){
        this.principal = new nodoMatriz(-1,-1,"Documentos")
        this.coordenadaY = 0;
        this.coordenadaX = 0;
    }
}
```
### **Método de Insersión**
```
insertarColumna(posicion,texto){
        const nuevoNodo = new nodoMatriz(posicion,-1,texto);
        let piv = this.principal;
        let pivA = this.principal;
        while(piv.siguiente){
            if(nuevoNodo.posX > piv.posX){
                pivA = piv;
                piv = piv.siguiente
            }else{
                nuevoNodo.siguiente = piv;
                nuevoNodo.anterior = pivA;
                pivA.siguiente = nuevoNodo;
                piv.anterior = nuevoNodo;
                return;
            }
        }
        nuevoNodo.anterior = piv;
        piv.siguiente = nuevoNodo;
    }

    insertarFila(posicion,texto){
        const nuevoNodo = new nodoMatriz(-1,posicion,texto);
        let piv = this.principal;
        let pivA = this.principal;
        while(piv.abajo){
            if(nuevoNodo.posY > piv.posY){
                pivA = piv;
                piv = piv.abajo;
            }else{
                nuevoNodo.abajo = piv;
                nuevoNodo.arriba = pivA;
                pivA.abajo = nuevoNodo;
                piv.arriba = nuevoNodo;
                return;
            }
        }
        nuevoNodo.arriba = piv;
        piv.abajo = nuevoNodo;
    }
    
    insertarNodo(x,y,texto){
        const nuevoNodo = new nodoMatriz(x,y,texto);
        let tempX = this.principal;
        let tempY = this.principal;
        //Agregar en Columna
        while(tempX.siguiente){
            if(tempX.posX === nuevoNodo.posX){
                break;
            }
            tempX = tempX.siguiente;
        }
        while(true){
            if(tempX.posY === nuevoNodo.posY){
                break;
            }else if(tempX.abajo !== null && tempX.abajo.posY > nuevoNodo.posY){
                nuevoNodo.abajo = tempX.abajo;
                nuevoNodo.arriba = tempX;
                tempX.abajo = nuevoNodo;
                break;
            }else if(tempX.abajo === null){
                nuevoNodo.arriba = tempX
                nuevoNodo.abajo = tempX.abajo
                tempX.abajo = nuevoNodo;
                break;
            }else{
                tempX = tempX.abajo;
            }
        }
        //Agregar en Fila
        while(tempY.abajo){
            if(tempY.posY === nuevoNodo.posY){
                break;
            }
            tempY = tempY.abajo;
        }
        while(true){
            if(tempY.posX === nuevoNodo.posX){
                break;
            }else if(tempY.siguiente !== null && tempY.siguiente.posX > nuevoNodo.posX){
                nuevoNodo.siguiente = tempY.siguiente;
                nuevoNodo.anterior = tempY;
                tempY.siguiente = nuevoNodo;
            }else if(tempY.siguiente === null){
                nuevoNodo.anterior = tempY;
                nuevoNodo.siguiente = tempY.siguiente;
                tempY.siguiente = nuevoNodo;
            }else{
                tempY = tempY.siguiente;
            }
        }
    }
```
### **4. Arbol AVL**
```
class Nodo{
    constructor(alumno){
        this.alumno=alumno;
        this.izquierda = null;
        this.derecha = null;
        this.altura = 0;
        this.id = correlativo++

        this.ArbolNArio = new ArbolNArio()

    }
}

export class AVL{
    constructor(){
        this.raiz = null;
    }
}
```
### **Método de Insersión en orden**
```
add(alumno, nodo){
        if(nodo == null) return new Nodo(alumno);
        else{
            if(alumno.carnet < nodo.alumno.carnet){
                nodo.izquierda = this.add(alumno, nodo.izquierda)
                if(this.altura(nodo.derecha)-this.altura(nodo.izquierda) == -2){
                    //programar los casos 
                    //rsi
                    if(alumno.carnet < nodo.izquierda.alumno.carnet){
                        nodo = this.rotacionizquierda(nodo);
                    }//rdi}
                    else{
                        nodo = this.Rotaciondobleizquierda(nodo);
                    }
                    
                }
            }else if(alumno.carnet > nodo.alumno.carnet){
                nodo.derecha = this.add(alumno, nodo.derecha);
                if(this.altura(nodo.derecha)-this.altura(nodo.izquierda)== 2){
                    //otros dos casos
                    //rotacion simple derecha
                    if(alumno.carnet > nodo.derecha.alumno.carnet){
                        nodo = this.rotacionderecha(nodo);
                    }else{
                        nodo = this.Rotaciondoblederecha(nodo);
                    }
                    //rotacion doble derecha
                }
            }
            else{
                console.log("No se puede agregar")
            }
        }
        nodo.altura = this.MAXIMO(this.altura(nodo.izquierda),this.altura(nodo.derecha))+1
        return nodo;

```