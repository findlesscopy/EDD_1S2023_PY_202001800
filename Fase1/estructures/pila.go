package estructures

import (
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
)

type Nodo struct {
	bitacora  string
	siguiente *Nodo
}

type Pila struct {
	primero *Nodo
	size    int
}

func (p *Pila) estaVacia() bool {
	if p.size == 0 {
		return true
	} else {
		return false
	}
}

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

func (p *Pila) Pop() {
	if p.estaVacia() {
		fmt.Println("La pila no tiene elementos")
	} else {
		p.primero = p.primero.siguiente
		p.size--
	}
}

func (p *Pila) Peek() {
	if p.estaVacia() {
		fmt.Println("La pila no tiene elementos")
	} else {
		fmt.Println(p.primero.bitacora)
	}
}

func (p *Pila) Graficar() {
	nombre_archivo := "./pila.dot"
	nombre_imagen := "pila.jpg"
	texto := "digraph pila{\n"
	texto += "rankdir=LR;\n"
	texto += "node[shape = record]"
	aux := p.primero
	texto += "nodo0 [label=\""
	for i := 0; i < p.size; i++ {
		texto = texto + "|" + aux.bitacora + ""
		aux = aux.siguiente
	}
	texto += "\"]; \n}"
	crearArchivo(nombre_archivo)
	escribirArchivoDot(texto, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}

func crearArchivo(nombre_archivo string) {
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

func escribirArchivoDot(contenido string, nombre_archivo string) {
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

func ejecutar(nombre_imagen string, archivo_dot string) {
	path, _ := exec.LookPath("dot")
	cmd, _ := exec.Command(path, "-Tjpeg", archivo_dot).Output()
	mode := 0777
	_ = ioutil.WriteFile(nombre_imagen, cmd, os.FileMode(mode))
}
