package estructures

import (
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
	"strconv"
)

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

func (c *Cola) Imprimir() {
	aux := c.primero
	for aux != nil {
		fmt.Println("-Carnet: ", aux.carnet, "-Nombre: ", aux.nombre, "-Contraseña: ", aux.password)
		aux = aux.siguiente
	}
}

func (c *Cola) RetornarEstudiante() (int, string, string, int) {
	aux := c.primero
	if aux == nil {
		//fmt.Println("No hay estudiantes en Cola")
		return -1, "", "", -1
	} else {
		return aux.carnet, aux.nombre, aux.password, c.size
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

func (c *Cola) GenerarGrafo() {
	dot := "digraph Pila{\nrankdir=LR;\nnode[shape=Mrecord];\n"
	nodos := "Nodo[xlabel = Cola label= \""
	temporal := c.primero
	for temporal != nil {
		if temporal.siguiente == nil {
			nodos += strconv.Itoa(temporal.carnet) + "\n  " + temporal.nombre
		} else {
			nodos += strconv.Itoa(temporal.carnet) + "\n  " + temporal.nombre + " | "
		}
		temporal = temporal.siguiente
	}
	nodos += "\"];\n"
	dot += nodos
	dot += "\n}"
	nombre_archivo := "./cola.dot"
	nombre_imagen := "cola.jpg"
	//fmt.Println(dot)
	crearArchivo(nombre_archivo)
	escribirArchivoDot(dot, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)

}

func crearArchivoCola(nombre_archivo string) {
	//Verifica que el archivo existe
	var _, err = os.Stat(nombre_archivo)
	//Crea el archivo si no existe
	if os.IsNotExist(err) {
		var file, err = os.Create(nombre_archivo)
		if err != nil {
			return
		}
		defer file.Close()
	}
	fmt.Println("Archivo creado exitosamente", nombre_archivo)
}

func escribirArchivoDotCola(contenido string, nombre_archivo string) {
	var file, err = os.OpenFile(nombre_archivo, os.O_RDWR, 0644)
	if err != nil {
		return
	}
	defer file.Close()
	// Escribe algo de texto linea por linea
	_, err = file.WriteString(contenido)
	if err != nil {
		return
	}
	// Salva los cambios
	err = file.Sync()
	if err != nil {
		return
	}
	fmt.Println("Archivo actualizado existosamente.")
}

func ejecutarCola(nombre_imagen string, archivo_dot string) {
	path, _ := exec.LookPath("dot")
	cmd, _ := exec.Command(path, "-Tjpg", archivo_dot).Output()
	mode := 0777
	_ = ioutil.WriteFile(nombre_imagen, cmd, os.FileMode(mode))
}
