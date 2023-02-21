package estructures

import (
	"fmt"
)

type NodoCola struct {
	carnet    int
	nombre    string
	apellido  string
	password  string
	siguiente *NodoCola
}

type Cola struct {
	primero *NodoCola
	ultimo  *NodoCola
	size    int
}

func (c *Cola) Insertar(carnet int, nombre string, apellido string, password string) {
	nuevoNodo := &NodoCola{carnet: carnet, nombre: nombre, apellido: apellido, password: password}
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

func (c *Cola) Imprimir() {
	aux := c.primero
	for aux != nil {
		fmt.Println("-Carnet: ", aux.carnet, "-Nombre: ", aux.nombre, "-Apellido: ", aux.apellido, "-Contraseña: ", aux.password)
		aux = aux.siguiente
	}
}

func (c *Cola) RetornarEstudiante() (int, string, string, string, int) {
	aux := c.primero
	if aux == nil {
		//fmt.Println("No hay estudiantes en Cola")
		return -1, "", "", "", -1
	} else {
		return aux.carnet, aux.nombre, aux.apellido, aux.password, c.size
	}
}

func (c *Cola) Eliminar() {
	if c.primero == nil {
		fmt.Println("La cola esta vacia")
	} else {
		//fmt.Println("Valor eliminado:", c.primero.carnet, c.primero.nombre, c.primero.apellido, c.primero.password)
		c.primero = c.primero.siguiente
		c.size--
	}
}
