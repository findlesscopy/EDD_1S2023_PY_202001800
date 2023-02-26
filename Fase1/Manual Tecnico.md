# **Proyecto: Fase 1**
### Universidad de San Carlos de Guatemala
### Facultad de Ingeniería
### Escuela de Ciencias y Sistemas
### Arquitectura de Computadores y Ensambladores 1
### Sección B
<br></br><br>

## **Manual Técnico**
<br></br><br>

| Nombre | Carnet | 
| --- | --- |
| José Manuel Ibarra Pirir | 202001800 |
----
## **Estructuras de Datos**
### **1. Lista Doblemente Enlazada**
```
type NodoDoble struct {
	carnet    int
	nombre    string
	password  string
	siguiente *NodoDoble
	anterior  *NodoDoble
}

type ListaDoblementeEnlazada struct {
	primero *NodoDoble
	ultimo  *NodoDoble
	size    int
}
```
### **Método de Insersión**
```
func (l *ListaDoblementeEnlazada) Insertar(carnet int, nombre string, password string) {
	nuevo := &NodoDoble{carnet: carnet, nombre: nombre, password: password}
	if l.primero == nil {
		l.primero = nuevo
		l.ultimo = nuevo
	} else {
		l.ultimo.siguiente = nuevo
		nuevo.anterior = l.ultimo
		l.ultimo = nuevo
	}
	l.size++
}
```
### **2. Pila**
```
type Nodo struct {
	bitacora  string
	siguiente *Nodo
}

type Pila struct {
	primero *Nodo
	size    int
}
```
### **Método de Insersión**
```
func (p *Pila) Push(hora string) {
	if p.estaVacia() {
		nuevoNodo := &Nodo{hora, nil}
		p.primero = nuevoNodo
		p.size++
	} else {
		nuevoNodo := &Nodo{hora, p.primero}
		p.primero = nuevoNodo
		p.size++
	}
}
```
### **3. Cola**
```
type NodoCola struct {
	carnet    int
	nombre    string
	password  string
	siguiente *NodoCola
}

type Cola struct {
	primero *NodoCola
	ultimo  *NodoCola
	size    int
}
```
### **Método de Insersión**
```
func (c *Cola) Insertar(carnet int, nombre string, password string) {
	nuevoNodo := &NodoCola{carnet: carnet, nombre: nombre, password: password}
	if c.primero == nil {
		c.primero = nuevoNodo
		c.ultimo = nuevoNodo
		c.size++
	} else {
		c.ultimo.siguiente = nuevoNodo
		c.ultimo = nuevoNodo
		c.size++
	}
}
```
### **Método de eliminiación**
```
func (c *Cola) Eliminar() {
	if c.primero == nil {
		fmt.Println("La cola esta vacia")
	} else {
		//fmt.Println("Valor eliminado:", c.primero.carnet, c.primero.nombre, c.primero.apellido, c.primero.password)
		c.primero = c.primero.siguiente
		c.size--
	}
}
```
### **4. Lista de Pilas**
```
type NodoPila struct {
	carnet   int
	bitacora string
	abajo    *NodoPila
}

type NodoCabecera struct {
	carnet    int
	nombre    string
	siguiente *NodoCabecera
	abajo     *NodoPila
}

type ListaDePilas struct {
	primero *NodoCabecera
	cima    *NodoPila
	size    int
}
```
### **Método de Insersión en orden**
```
func (l *ListaDePilas) InsertarCabecera(carnet int, nombre string) {
	temporal := &NodoCabecera{carnet: carnet, nombre: nombre}

	if l.BuscarEncabezado(carnet) {
		fmt.Println("El carnet ya existe")
	} else {
		if l.primero == nil || carnet < l.primero.carnet {
			temporal.siguiente = l.primero
			l.primero = temporal
		} else {
			aux := l.primero
			for aux.siguiente != nil && carnet > aux.siguiente.carnet {
				aux = aux.siguiente
			}
			temporal.siguiente = aux.siguiente
			aux.siguiente = temporal
		}
		l.size++
	}

}
```
### **Método de Insersión en las Pilas**
```
func (l *ListaDePilas) PushPila(carnet int, bitacora string) {
	temporal := l.primero
	for temporal != nil {
		if temporal.carnet == carnet {
			nuevaPila := &NodoPila{bitacora: bitacora, abajo: l.cima}
			l.cima = nuevaPila
			inicioPila := temporal.abajo
			temporal.abajo = nuevaPila
			nuevaPila.abajo = inicioPila
			break
		}
		temporal = temporal.siguiente
	}
	if temporal == nil {
		fmt.Println("No se encontró la categoría dada")
	}
}
```