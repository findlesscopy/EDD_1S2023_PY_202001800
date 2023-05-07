class nodoMatrizAdyacencia{
    constructor(valor){
        this.siguiente = null
        this.abajo = null
        this.valor = valor
    }
}

export class grafoDirigido{
    constructor(){
        this.principal = null
    }

    insertarF(texto){
        const nuevoNodo = new nodoMatrizAdyacencia(texto)
        if(this.principal === null){
            this.principal = nuevoNodo
        }else{
            let aux = this.principal
            while(aux.abajo){
                if(aux.valor === nuevoNodo.valor){
                    return
                }
                aux = aux.abajo
            }
            aux.abajo = nuevoNodo
        }
    }

    insertarC(padre, hijo){
        const nuevoNodo = new nodoMatrizAdyacencia(hijo)
        if(this.principal !== null && this.principal.valor === padre){
            let aux = this.principal
            while(aux.siguiente){
                aux = aux.siguiente
            }
            aux.siguiente = nuevoNodo
        }else{
            this.insertarF(padre)
            let aux = this.principal
            while(aux){
                if(aux.valor === padre){
                    break;
                }
                aux = aux.abajo
            }
            if(aux !== null){
                while(aux.siguiente){
                    aux = aux.siguiente
                }
                aux.siguiente = nuevoNodo
            }
        }
    }

    insertarValores(padre, hijos){
        let cadena = hijos.split(',')
        for(let i = 0; i < cadena.length; i++){
            this.insertarC(padre,cadena[i])
        }
    }

    eliminarValores(padre, hijos){
        let cadena = hijos.split(',')
        for(let i = 0; i < cadena.length; i++){
            this.eliminarC(padre,cadena[i])
        }
    }

    eliminarC(padre, hijo){
        if(this.principal !== null && this.principal.valor === padre){
            let aux = this.principal
            let aux2 = this.principal
            while(aux.siguiente){
                if(aux.siguiente.valor === hijo){
                    aux.siguiente = aux.siguiente.siguiente
                    return
                }
                aux = aux.siguiente
            }
        }else{
            this.eliminarF(padre)
            let aux = this.principal
            while(aux){
                if(aux.valor === padre){
                    break;
                }
                aux = aux.abajo
            }
            if(aux !== null){
                let aux2 = aux
                while(aux2.siguiente){
                    if(aux2.siguiente.valor === hijo){
                        aux2.siguiente = aux2.siguiente.siguiente
                        return
                    }
                    aux2 = aux2.siguiente
                }
            }
        }
    }

    eliminarF(valor){
        if(this.principal !== null && this.principal.valor === valor){
            this.principal = this.principal.abajo
        }else{
            let aux = this.principal
            while(aux){
                if(aux.abajo.valor === valor){
                    aux.abajo = aux.abajo.abajo
                    return
                }
                aux = aux.abajo
            }
        }
    }

    buscar(valor){
        let arreglo = []
        if(valor === "/"){
            let aux = this.principal
            while(aux){
                arreglo.push(aux.valor)
                aux = aux.siguiente
            }
            return arreglo
        }else{
            let aux = this.principal
            while(aux){
                if(aux.valor === valor){
                    aux = aux.siguiente
                    while(aux){
                        arreglo.push(aux.valor)
                        aux = aux.siguiente
                    }
                    return arreglo
                }
                aux = aux.abajo
            }
        }
    }

    




    //Reporte modificado para trabajar con carpetas
    grafica(){
        let cadena = "graph grafoDirigido{ rankdir=LR; node [shape=box]; \"/\"; node [shape = ellipse] ; layout=neato; "
        let auxPadre = this.principal
        let auxHijo = this.principal
        let peso = 0
        while(auxPadre){
            auxHijo = auxPadre.siguiente
            let profundidad = auxPadre.valor.split('/')
            let padre = ""
            if(profundidad.length == 2 && profundidad[1] == ""){ peso = 1}
            else if(profundidad.length == 2 && profundidad[1] != ""){ peso = 2 }
            else { peso = profundidad.length }
            if(auxPadre.valor != "/"){ padre = profundidad[profundidad.length-1] }
            else { padre = "/" }
            while(auxHijo){
                cadena += "\"" + padre + "\"" + " -- " + "\"" + auxHijo.valor + "\"" + " [label=\"" + peso + "\"] "
                auxHijo = auxHijo.siguiente
            }
            auxPadre = auxPadre.abajo
        }
        cadena += "}"
        return cadena
    }
}

