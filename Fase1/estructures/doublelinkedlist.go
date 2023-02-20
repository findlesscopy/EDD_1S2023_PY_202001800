package estructures

import "fmt"

type NodoDoble struct {
	carnet    int
	nombre    string
	apellido  string
	password  string
	siguiente *NodoDoble
	anterior  *NodoDoble
}

type ListaDoblementeEnlazada struct {
	primero *NodoDoble
	ultimo  *NodoDoble
	size    int
}

func (l *ListaDoblementeEnlazada) Insertar(carnet int, nombre string, apellido string, password string) {
	nuevo := &NodoDoble{carnet: carnet, nombre: nombre, apellido: apellido, password: password}
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

func (l *ListaDoblementeEnlazada) Imprimir() {
	aux := l.primero
	for aux != nil {
		fmt.Println("Carnet: ", aux.carnet, "Nombre: ", aux.nombre, "Apellido: ", aux.apellido, "Contraseña: ", aux.password)
		aux = aux.siguiente
	}
}

func (l *ListaDoblementeEnlazada) OrdenarPorCarnet() {
	if l.size < 2 {
		return
	}
	current := l.primero
	for current != nil {
		min := current
		next := current.siguiente
		for next != nil {
			if next.carnet < min.carnet {
				min = next
			}
			next = next.siguiente
		}
		if min != current {
			l.swap(current, min)
		}
		current = current.siguiente
	}
}

func (l *ListaDoblementeEnlazada) swap(node1, node2 *NodoDoble) {
	tempCarnet := node1.carnet
	tempNombre := node1.nombre
	tempApellido := node1.apellido
	tempPassword := node1.password

	node1.carnet = node2.carnet
	node1.nombre = node2.nombre
	node1.apellido = node2.apellido
	node1.password = node2.password

	node2.carnet = tempCarnet
	node2.nombre = tempNombre
	node2.apellido = tempApellido
	node2.password = tempPassword
}
