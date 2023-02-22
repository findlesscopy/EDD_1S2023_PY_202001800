package estructures

import (
	"fmt"
	"os"
	"strconv"
)

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

func (l *ListaDoblementeEnlazada) Imprimir() {
	aux := l.primero
	for aux != nil {
		fmt.Println("-Carnet: ", aux.carnet, "-Nombre: ", aux.nombre, "-Contraseña: ", aux.password)
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
	tempPassword := node1.password

	node1.carnet = node2.carnet
	node1.nombre = node2.nombre
	node1.password = node2.password

	node2.carnet = tempCarnet
	node2.nombre = tempNombre
	node2.password = tempPassword
}

func (l *ListaDoblementeEnlazada) Login(carnet int, password string) bool {
	aux := l.primero
	for aux != nil {
		if aux.carnet == carnet && aux.password == password {
			return true
		}
		aux = aux.siguiente
	}
	return false
}

func (l *ListaDoblementeEnlazada) BuscarUsuario(carnet int) (int, string) {
	aux := l.primero
	for aux != nil {
		if aux.carnet == carnet {
			return aux.carnet, aux.nombre
		}
		aux = aux.siguiente
	}
	return -1, ""
}

func (l *ListaDoblementeEnlazada) GenerarJSON() {
	aux := l.primero
	json := "{"
	json += "\n \"alumnos\": [\n"
	for aux != nil {
		json += "{\n"
		json += "\"nombre\":\"" + aux.nombre + "\",\n"
		json += "\"carnet\":" + strconv.Itoa(aux.carnet) + ",\n"
		json += "\"password\":\"" + aux.password + "\",\n"
		json += "\"Carpeta_Raiz\":\"/\"\n"
		json += "}\n"
		if aux.siguiente != nil {
			json += ",\n"
		}
		aux = aux.siguiente
	}
	json += "]\n"
	json += "}"
	file, err := os.Create("./usuarios.json")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer file.Close()
	file.WriteString(json)
	file.Sync()
}
