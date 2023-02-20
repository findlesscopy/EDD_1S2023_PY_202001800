package estructures

import (
	"bufio"
	"fmt"
	"os"
	"strings"
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
}

func (c *Cola) Insertar(carnet int, nombre string, apellido string, password string) {
	nuevoNodo := &NodoCola{carnet: carnet, nombre: nombre, apellido: apellido, password: password}
	if c.primero == nil {
		c.primero = nuevoNodo
		c.ultimo = nuevoNodo
	} else {
		c.ultimo.siguiente = nuevoNodo
		c.ultimo = nuevoNodo
	}
}

func (c *Cola) Imprimir() {
	lista := ListaDoblementeEnlazada{}
	aux := c.primero
	for aux != nil {
		fmt.Println("Carnet: ", aux.carnet, "Nombre: ", aux.nombre, "Apellido: ", aux.apellido, "Contraseña: ", aux.password)
		fmt.Println("Desea agregar a la lista? 1.Si 2.No")
		reader := bufio.NewReader(os.Stdin)
		input, _ := reader.ReadString('\n')
		estado := strings.TrimRight(input, "\r\n")
		if estado == "1" {
			lista.Insertar(aux.carnet, aux.nombre, aux.apellido, aux.password)
			aux = aux.siguiente
		} else {
			fmt.Println("No se agrego a la lista")
			if c.primero == nil {
				fmt.Println("La cola esta vacia")
			} else {
				fmt.Println("Valor eliminado:", c.primero.carnet, c.primero.nombre, c.primero.apellido, c.primero.password)
				c.primero = c.primero.siguiente
			}
			aux = aux.siguiente
		}

	}
}
