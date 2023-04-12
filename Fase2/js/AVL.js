import { Alumno } from "./Alumnos.js";
import { ArbolNArio } from "./nArio.js";
//ÁRBOL AVL
let correlativo = 1
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
    //maximo
    MAXIMO(valor1,valor2){
        if(valor1>valor2) return valor1;
        return valor2;
    }
    //altura del arbol
    altura(nodo){
        if(nodo == null) return -1;
        return nodo.altura;
    }
    //insertar
    insertar(alumno){
        this.raiz = this.add(alumno,this.raiz)

    }
    //insertar recursivo
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
    }


    //rotacion simple izquierda
    rotacionizquierda(nodo){
        var aux = nodo.izquierda;
        nodo.izquierda = aux.derecha;
        aux.derecha = nodo;
        //calculo de nueva altura
        nodo.altura = this.MAXIMO(this.altura(nodo.derecha),this.altura(nodo.izquierda))+1;
        aux.altura = this.MAXIMO(this.altura(nodo.izquierda), nodo.altura)+1;
        return aux;
    }
    //rotacion simple derecha
    rotacionderecha(nodo){
        var aux = nodo.derecha;
        nodo.derecha = aux.izquierda;
        aux.izquierda = nodo;
        //calcular de nuevo altura
        nodo.altura = this.MAXIMO(this.altura(nodo.derecha),this.altura(nodo.izquierda))+1;
        aux.altura = this.MAXIMO(this.altura(nodo.derecha),nodo.altura)+1;
        return aux;
    }
    //rotacion dobles derecha
    Rotaciondoblederecha(nodo){
        nodo.derecha = this.rotacionizquierda(nodo.derecha);
        return this.rotacionderecha(nodo);
    }

    //rotaciones dobles
    Rotaciondobleizquierda(nodo){
        nodo.izquierda = this.rotacionderecha(nodo.izquierda);
        return this.rotacionizquierda(nodo);
    }

    login(carnet, password){
        return this.login_recursivo(this.raiz, carnet, password)
    }
    login_recursivo(nodo, carnet, password){
        if(nodo == null) return null;
        if(nodo.alumno.carnet == carnet && nodo.alumno.password == password){
            return nodo.alumno;
        }else if(nodo.alumno.carnet > carnet){
            return this.login_recursivo(nodo.izquierda, carnet, password)
        }else{
            return this.login_recursivo(nodo.derecha, carnet, password)
        }
    }
    
    buscar(carnet){
        return this.buscar_recursivo(this.raiz, carnet)
    }
    buscar_recursivo(nodo, carnet){
        if(nodo == null) return null;
        if(nodo.alumno.carnet == carnet){
            return nodo.ArbolNArio;
        }else if(nodo.alumno.carnet > carnet){
            return this.buscar_recursivo(nodo.izquierda, carnet)
        }else{
            return this.buscar_recursivo(nodo.derecha, carnet)
        }
    }

    //recorridos
    preorden(){
        let a = []
        this.pre_orden(this.raiz, a);
        return a
    }
    pre_orden(nodo, a){
        if(nodo!=null){
            let alumno_uni = new Alumno(nodo.alumno.nombre, nodo.alumno.carnet, nodo.alumno.password, nodo.alumno.Carpeta_Raiz);
            a.push(alumno_uni)
            this.pre_orden(nodo.izquierda, a);
            this.pre_orden(nodo.derecha, a);
        }
    }

    //postorden
    postorden(){
        let b = []
        this.post_orden(this.raiz, b);
        return b
    }
    post_orden(nodo, b){
        if(nodo!=null){
            this.post_orden(nodo.izquierda, b);
            this.post_orden(nodo.derecha, b);
            let alumno_uni = new Alumno(nodo.alumno.nombre, nodo.alumno.carnet, nodo.alumno.password, nodo.alumno.Carpeta_Raiz);
            b.push(alumno_uni)
        }
    }

    //inorden
    inorden(){
        let c = []
        this.in_orden(this.raiz, c);
        return c
    }
    in_orden(nodo, c){
        if(nodo!=null){
            this.in_orden(nodo.izquierda, c);
            let alumno_uni = new Alumno(nodo.alumno.nombre, nodo.alumno.carnet, nodo.alumno.password, nodo.alumno.Carpeta_Raiz);
            c.push(alumno_uni)
            this.in_orden(nodo.derecha, c);    
        }
    }
    
    graficar(){
        let codigodot = ""
        codigodot += `digraph G{label = "Arbol AVL" fontname="Arial Black" fontsize="25pt";\nnode [shape = box, style=filled, fillcolor=seashell2];\n ${this.getCodigoInterno(this.raiz)}\n}` 
        return codigodot;
    }
    getCodigoInterno(nodo){
        let codigodot = ""
        
        if(nodo.izquierda== null && nodo.derecha == null){
            codigodot= `nodo${nodo.id}[ label = "${nodo.alumno.carnet}\n${nodo.alumno.nombre}\n${nodo.altura}"];\n`
        }else{
            codigodot += `nodo${nodo.id}[ label = "${nodo.alumno.carnet}\n${nodo.alumno.nombre}\n${nodo.altura}"];\n`
        }
        if(nodo.izquierda!=null){
            codigodot+= this.getCodigoInterno(nodo.izquierda) +"nodo"+nodo.id+":C0->nodo"+nodo.izquierda.id+"\n";
        }
        if(nodo.derecha!=null){
            codigodot+= this.getCodigoInterno(nodo.derecha)+"nodo"+nodo.id+":C1->nodo"+nodo.derecha.id+"\n";                    
        }
        return codigodot;
    }
}